# Can a shadcn registry serve Slices generated per request from a Rename Map?

## Answer

Yes. The shadcn CLI fetches every registry item with a plain `GET` and accepts whatever JSON comes back, as long as it passes the item schema. It doesn't care whether the JSON was generated on the fly, so a TanStack Start route on Cloudflare can render a Slice from query parameters. The docs approve query parameters (`params`, versioning, dynamic search) and request-time route handlers. Query strings survive both direct-URL `shadcn add https://…?r=…` and namespaced `@butter/slice` addresses, and URL `registryDependencies` the server writes keep their query string. Everything was checked against the source and in a local test.

The hard limits are not in generation. They are in what `shadcn add` does to the user's repo:

- It never merges. A file whose content differs is either skipped (non-interactive API), prompted for (CLI), or fully overwritten (`--overwrite`).
- Under an agent with no TTY, the CLI's overwrite prompt makes the process exit with code 0 partway through.
- `target` paths without `~/` are silently moved under `src/` when the project has a `src/` directory.
- Files are never deleted or renamed.
- Only `registry:file`/`registry:item` files are written byte-for-byte. Other file types go through JS/TS transforms, which strip leading comments.

A realistic Rename Map is about 0.4–7 KB encoded. That is well under the Cloudflare Workers 16 KB URL limit, but Butter should still prefer a short id or Manifest hash in the URL.

## Sources and versions

- **shadcn CLI:** `shadcn@4.22.1`, the npm `latest` tag, published 2026-10-18T18:12:18Z. Checked on 2026-10-24 with `npm view shadcn`.
  - It depends on `@shadcn/registry@0.2.0` (published 2026-10-16), which now holds all fetch/resolve/install logic. The CLI's own changelog says this move happened in 4.21.5 ([#12192](https://github.com/shadcn-ui/ui/pull/12192)).
- **Source read at the `shadcn@4.22.1` release commit:** [`daaf156`](https://github.com/shadcn-ui/ui/tree/daaf156ee00ed91cc7e6bdd937c1b4973152d141). There are no changes under `packages/` between that commit and `main` @ `ffd2257` (2026-10-24). All source links below are permalinks to `daaf156`.
- **Docs:** read from the docs source in the same commit (`apps/v4/content/docs/registry/*.mdx`), which is what is published at ui.shadcn.com/docs/registry. Where the docs and the source disagree, this note says so and follows the source.
- **Empirical check (2026-10-24):** `shadcn@4.22.1` on Node v24.22.1 (undici 7.30.1), run against a local Node HTTP server serving generated items. Where this note says "Tested", that is the source.
- **External limits:** [Cloudflare Workers limits](https://developers.cloudflare.com/workers/platform/limits/), [Cloudflare cache keys](https://developers.cloudflare.com/cache/how-to/cache-keys/), [Workers Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/), [Node fetch/undici](https://nodejs.org/api/globals.html#fetch), and [undici docs](https://undici.nodejs.org/#/docs/api/Fetch). All read 2026-10-24.

## 1. Per-request generation

**How items are fetched**
- **GET with fixed headers.** Every item fetch is a `GET` with `Accept: application/vnd.shadcn.v1+json, application/json;q=0.9` and `User-Agent: shadcn` ([fetcher.ts L45-57](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/fetcher.ts#L45-L57)).
- **No POST.** There is no option for POST or a request body.
- **Validation is by schema only.** The response is validated with `registryItemSchema` ([resolver.ts L103-120](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/resolver.ts#L103-L120)), and nothing checks how it was produced.
- **Docs sanction request-time routes.** The docs describe "Option B: Dynamic route handlers" that build items at request time ([getting-started.mdx L294](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/apps/v4/content/docs/registry/getting-started.mdx#L294); [ui.shadcn.com/docs/registry/getting-started](https://ui.shadcn.com/docs/registry/getting-started)). Their example loads from a local `registry.json` with `loadRegistryItem`, which reads from disk ([api-reference.mdx L281-314](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/apps/v4/content/docs/registry/api-reference.mdx#L281-L314)). Generating from parameters is not described as such, but nothing forbids it.
- **Docs sanction query parameters.** The docs show query params for versioning (`@versioned/button` → `…/button?version=v2`, [namespace.mdx L642-659](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/apps/v4/content/docs/registry/namespace.mdx#L642-L659)). For "dynamic registries" they also show server-side search with `q/type/limit/offset` ([dynamic-search.mdx](https://ui.shadcn.com/docs/registry/dynamic-search), added in 4.16.1 [#11352](https://github.com/shadcn-ui/ui/pull/11352)).

**Direct URL with a query string**
- **Kept as-is.** `resolveRegistryUrl` runs `new URL(x).toString()`, which keeps the query. The only rewrite is the v0 `/chat/b/` → `/json` special case ([builder.ts L151-164](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/builder.ts#L151-L164)).
- **Tested.** `shadcn add "http://localhost:4567/r/sessions.json?r=<base64url>&v=1"` reached the server with the query string unchanged.
- **Quote it.** Agents must quote the URL in the shell, because of `&`.
- **No headers.** Direct URLs cannot carry configured headers (see below).

**Namespaced registries (`@butter/<slice>`)**
- **Config shape.** The config is either a string containing `{name}`, or an object `{ url, params?, headers? }`. The URL must contain `{name}` ([schema.ts L6-19](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/schema.ts#L6-L19)).
- **URL building.** `{name}` and an optional `{style}` are substituted, then `${VAR}` is expanded. `params` are appended with `URLSearchParams`, using `&` if the template already has a `?`. A param whose value expands to empty is dropped ([builder.ts L58-124](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/builder.ts#L58-L124)).
- **Header expansion.** Headers are env-expanded. A header whose variables all expand to empty is omitted ([builder.ts L84-145](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/builder.ts#L84-L145)).
- **Env var syntax is `${NAME}` only.** The regex is `/\${(\w+)}/g` ([env.ts L3-8](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/env.ts#L3-L8)). The docs recommend `${VAR:-default}` ([namespace.mdx L700](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/apps/v4/content/docs/registry/namespace.mdx#L700)), but the source does not support it, so this is a docs/source disagreement.
- **Unset variables are a hard error.** Any `${VAR}` referenced in a registry config must be set, or the CLI throws `MISSING_ENV_VARS` ([validator.ts L40-50](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/validator.ts#L40-L50)).
- **Where variables come from.** `process.env`, plus `.env.local`, `.env.development.local`, `.env.development` and `.env` in `--cwd`. These never override what is already set ([env-loader.ts](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/env-loader.ts)).
- **This is the per-invocation channel.** For a namespaced address, set an env var on the command, e.g. `BUTTER_RENAMES=… npx shadcn add @butter/sessions`.
  - **Tested** with `params: { r: "${BUTTER_RENAMES}" }` and `headers: { "X-Butter-Manifest": "${BUTTER_MANIFEST_HASH}" }`. Both arrived at the server.
- **Item names can't carry a query string cleanly.** The parser takes everything after `@ns/` as the item name ([parser.ts](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/parser.ts)), so `@butter/sessions?r=…` would land inside `{name}`. With a `{name}.json` template it produces `sessions?r=….json`. Unverified as a supported pattern; don't rely on it.

**Where the registry config can live**
- **`components.json` → `registries`.** This schema is `.strict()`, so Butter cannot add its own keys there ([schema.ts L33-66](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/schema.ts#L33-L66)).
- **`package.json` → `registries`.** Supported since 4.16.0/4.18.0 ([#11304](https://github.com/shadcn-ui/ui/pull/11304), [#11502](https://github.com/shadcn-ui/ui/pull/11502)). It is resolved in memory and never written to `components.json`. `components.json` wins per key ([registries.ts L44-57](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/shadcn/src/utils/registries.ts#L44-L57); [api.ts L208-243](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/api.ts#L208-L243)). **Tested**: `@butter` declared only in `package.json`, with no `components.json`, worked.
- **The public directory (`registries.json`).** Namespaces not found above are looked up there and written into `components.json` if that file exists ([registries.ts L59-130](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/shadcn/src/utils/registries.ts#L59-L130); [registry-index.mdx L8](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/apps/v4/content/docs/registry/registry-index.mdx#L8)). This contradicts the claim "The CLI never automatically adds registries" ([namespace.mdx L435](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/apps/v4/content/docs/registry/namespace.mdx#L435)). Directory entries are only `{name, url}`, so they cannot carry `params` or `headers` ([schema.ts L342-349](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/schema.ts#L342-L349)).

**Headers are scoped to exact URLs**
- **Keyed by URL.** Headers live in a per-run map keyed by the exact resolved URL ([context.ts L43-49](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/context.ts#L43-L49)).
- **URL dependencies get none.** A dependency written as a full URL gets no headers. Only namespaced dependencies are re-resolved through the config and get headers ([resolver.ts L428-486](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/resolver.ts#L428-L486)). **Tested**: the URL dependency `core.json?…` arrived without `X-Butter-Manifest`.
- **Cross-origin redirects drop them.** Redirects are followed manually, up to 5. On a cross-origin hop, every header except `accept` and `user-agent` is removed ([proxy.ts L90-126](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/proxy.ts#L90-L126)).
- **Auth.** Auth is just headers or params: Bearer, API key, Basic, or query keys ([authentication.mdx](https://ui.shadcn.com/docs/registry/authentication)). 401/403/404/410 are mapped to typed errors, and the server's RFC 7807 `detail` or `message` is shown to the user ([fetcher.ts L59-104](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/fetcher.ts#L59-L104)).

## 2. File types, targets, transforms

**Types and schema**
- **Item types:** `registry:lib | block | component | ui | hook | page | file | theme | style | item | base | font`, plus the internal `example` and `internal` ([schema.ts L100-117](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/schema.ts#L100-L117)). The docs mention `registry:ai` ([namespace.mdx L855](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/apps/v4/content/docs/registry/namespace.mdx#L855)), but it is not in the enum and would fail validation.
- **`target` rules:** `target` is required for `registry:file` and `registry:page` files and optional for all others ([schema.ts L119-133](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/schema.ts#L119-L133)).
- **No extension restrictions.** None were found in the source. Path safety rejects any `..` anywhere in the path (so even `a..b.sql` fails), control characters, and absolute paths outside the project root, so nothing can be written outside `--cwd` ([is-safe-target.ts L37-97](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/is-safe-target.ts#L37-L97); [add-components.ts L455-474](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/add-components.ts#L455-L474)).

**How `target` resolves** ([resolve-file-path.ts L46-72](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/resolve-file-path.ts#L46-L72))
- **`~/x` is relative to the project root, exactly.**
- **`@ui/ @components/ @lib/ @hooks/`** resolve to the directories in `components.json`. Any other `@foo/x` becomes `foo/x`.
- **Anything else** has the first `"src/"` substring removed. It is then joined to `src/` if a `src` directory exists ([get-project-info.ts L69](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/get-project-info.ts#L69)), otherwise to the root.
  - **Tested**: `target: "migrations/0001_auth.sql"` was written to `src/migrations/0001_auth.sql`. `~/migrations/…` was written to `migrations/…`.
- **`--path` flattens.** A directory `--path` puts every file there by its basename ([resolve-file-path.ts L19-44](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/resolve-file-path.ts#L19-L44)).

**Transforms**
- **`registry:file`/`registry:item` files are not transformed.** `.env` files aren't either. All other file types go through the import/RSC/cssVars/tw-prefix/icons/menu/asChild/RTL/font/cleanup pipeline ([update-files.ts L165-198](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/updaters/update-files.ts#L165-L198); since 3.8.0 [#8798](https://github.com/shadcn-ui/ui/pull/8798)).
- **The pipeline drops leading comments.** It returns text "from the first token", so leading comments, blank lines and shebangs are lost. That would remove `// @vitest-environment`, license headers, and leading `/* */` in `.sql` files ([source-text.ts L9-21](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/transformers/source-text.ts#L9-L21); the behavior is pinned by tests in [index.test.ts L25-48](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/transformers/index.test.ts#L25-L48)). Avoid `registry:lib`/`registry:hook` for Butter files.
- **`.ts` files are renamed in JS projects.** With `tsx: false` in `components.json`, `*.ts`/`*.tsx` targets are renamed to `.js`/`.jsx` for every file type, including `registry:file`. Universal files aren't transpiled, though, so they keep their TypeScript content ([update-files.ts L133-137](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/updaters/update-files.ts#L133-L137)). This doesn't apply without a `components.json`, where the default is `tsx: true` ([get-config.ts](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/get-config.ts)).
- **Post-write import rewrite.** After writing, every created or updated `.ts/.tsx/.js/.jsx` file, universal ones included, has its import specifiers rewritten. This touches only specifiers that start with the project alias prefix (e.g. `@/`) or `#` and resolve to a known file ([update-files.ts L297-300, L380-523](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/updaters/update-files.ts#L380-L523); [resolve-import.ts](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/resolve-import.ts)). Relative imports and bare packages are left alone. `.sql` is never touched. **Tested**: a `.test.ts` file with `// @vitest-environment node` and `import … from "@/lib/x"` was written unchanged, and so was `.sql` with leading `/* */` and `--` comments.

**Universal items**
- **Definition.** A universal item is type `registry:item`/`registry:file` whose files are all `registry:file`/`registry:item` with a `target` ([utils.ts L35-59](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/utils.ts#L35-L59)).
- **They skip `components.json`.** When the first argument is a universal item, `shadcn add` goes straight to install without needing a `components.json` ([add.ts L128-141](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/shadcn/src/commands/add.ts#L128-L141)). Without that file, the user gets a prompt to create it.

**Other fields**
- **`envVars`.** Keys are appended to an existing `.env.local` or `.env`, or a new `.env.local` is created. Existing keys are never overwritten ([update-env-vars.ts L41-60](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/updaters/update-env-vars.ts#L41-L60); [registry-item-json.mdx L419](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/apps/v4/content/docs/registry/registry-item-json.mdx#L419)). **Tested.**
- **`docs`.** Docs from all items are joined and printed to stdout after install ([resolver.ts L339-344](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/resolver.ts#L339-L344); [add-components.ts L143-145](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/add-components.ts#L143-L145)). This is a channel for Setup Task hints, but it is only text.
- **`meta`.** `meta` is a free `record<string, any>` ([schema.ts L192](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/schema.ts#L192)). It is kept by `view` but not used by `add`.
- **`cssVars` / `css` / `tailwind`.** These are only needed for UI and are merged into the user's CSS. They're not relevant to Butter.
- **`registry:base` / `registry:style` / `registry:theme`** are for design systems. They trigger CSS-var overwrites and an extra confirmation ([add.ts L142-164](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/shadcn/src/commands/add.ts#L142-L164)). Butter should not use them.

## 3. Dependencies

**npm `dependencies` / `devDependencies`**
- **Merging.** These are arrays of `name` or `name@version`, concatenated across the whole tree ([resolver.ts L364-367](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/resolver.ts#L364-L367)).
- **Deduping and install.** Entries are deduped by package name, and the first one with a version wins. A bare name already declared in `package.json` is skipped. A versioned request is always installed, even if it overwrites the user's existing range ([update-dependencies.ts L167-216](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/updaters/update-dependencies.ts#L167-L216)).
- **Package manager.** Installation goes through the detected package manager. On npm with React 19 there is an interactive prompt to pick `--force` or `--legacy-peer-deps` ([update-dependencies.ts L55-81](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/updaters/update-dependencies.ts#L55-L81)).

**`registryDependencies`**
- **Accepted forms.** Bare shadcn names, `@ns/item`, GitHub `owner/repo/item#ref`, full URLs, and local `./x.json` ([registry-item-json.mdx L162-180](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/apps/v4/content/docs/registry/registry-item-json.mdx#L162-L180)).
- **Dynamic items can depend on dynamic items with the same parameters, in two ways.**
  - **(a) Full URLs.** The server copies its own query string into each dependency URL. **Tested**: `core.json?r=…` was fetched with the same `r`. Headers are not forwarded (see §1).
  - **(b) Namespaced dependencies (`@butter/core`).** These are re-resolved through the same registry config, so `params` and `headers` are re-applied ([resolver.ts L455-486](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/resolver.ts#L455-L486)).
  - **Relative URLs are not supported.** There is no base-URL resolution.

**Deduping, ordering, cycles**
- **Visited set.** A visited set keyed by the dependency string prevents fetching the same address twice and breaks cycles ([resolver.ts L384-397](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/resolver.ts#L384-L397)). **Tested**: `sessions ↔ core` installed fine.
- **Same item, different addresses.** Spelling the same item two ways (e.g. `@butter/sessions` at the top level, and a URL inside a dependency) makes it a different key, so it is included twice. **Tested**: the files were written twice (once "Updated", then "Skipped" as identical) and `docs` were printed twice. Butter should always use one addressing form.
- **Order.** A topological sort (Kahn's algorithm) puts dependencies first. Items in a cycle are appended at the end rather than causing an error ([resolver.ts L679-798](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/resolver.ts#L679-L798)).
- **Same-target files.** Files are deduped by resolved target with "last wins", but only when the config has `ui/lib/components/hooks` paths. Without a `components.json`, files are only concatenated, and the duplicates are absorbed by the identical-content skip ([utils.ts L61-107](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/utils.ts#L61-L107)).
- **Config fields.** `cssVars`, `css`, `tailwind` and `envVars` are deep-merged ([resolver.ts L324-349](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/resolver.ts#L324-L349)).

## 4. URL and parameter size

**Limits**
- **CLI:** no length limit and no encoding applied to a direct URL. **Tested**: a 20 KB query string was sent as-is.
- **Node HTTP server:** the default `http.maxHeaderSize` is 16384 bytes. That limit covers the request line plus headers, and our test server answered `431`, which the CLI reported as "Failed to fetch from registry (431)".
- **Cloudflare Workers:** "URL size 16 KB" and "Request header size 128 KB (total)" ([Workers limits](https://developers.cloudflare.com/workers/platform/limits/)).
- **Node fetch (client side):** it's built on undici ([Node docs](https://nodejs.org/api/globals.html#fetch)). No request-URL limit is documented (unverified).

**A realistic Rename Map**

Twelve renamed concepts, measured with a script:

| Shape | JSON | base64url | Percent-encoded |
| --- | --- | --- | --- |
| `{concept: "newName"}` | 269 B | 359 B | 415 B |
| Each concept with singular/plural/table/label/labelPlural | 1.5 KB | 1.9 KB | 2.3 KB |
| Plus 8 explicit column renames per concept | 5.0 KB | 6.6 KB | 7.1 KB |

All of these fit under 16 KB, but the Manifest will grow (Strategies, Slice list, Invariant versions).

**Other risks of putting the map in the URL**
- **It leaks into logs.** The full URL is echoed in CLI error messages (tested), so it shows up in agent transcripts and CI logs.
- **It needs shell quoting.**

**Alternatives**
- **Short id.** Store the Manifest server-side when the Configurator writes it and pass a short id. This needs server state.
- **Content hash.** Pass `?m=<sha256 of the canonical Manifest>` and have the server ask for the full Manifest on a cache miss. This doesn't fit the CLI, which can't upload anything.
- **Header via env var.** `headers: {"X-Butter-Rename-Map": "${BUTTER_RENAME_MAP}"}` in `package.json`/`components.json` stays under the 128 KB header budget. But headers don't reach URL dependencies, and CDN cache keys don't include custom headers by default ([Cloudflare cache keys](https://developers.cloudflare.com/cache/how-to/cache-keys/)).
- **Canonical query param (simplest).** Put the deterministic, sorted, base64url Rename Map in the query, and have the server normalize it before rendering.

## 5. Caching

**In the CLI**
- **In-memory only.** There is one process-local `Map` from URL plus header hash to a promise ([fetcher.ts L20-131](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/fetcher.ts#L20-L131)). It lives only as long as the CLI process. `add` clears only the per-URL header context in its `finally` ([add.ts L340-342](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/shadcn/src/commands/add.ts#L340-L342)).
- **Nothing on disk.**
- **No HTTP caching.** The fetch passes no `cache` option or cache interceptor; undici's HTTP cache is opt-in via `interceptors.cache` ([undici docs](https://undici.nodejs.org/#/docs/api/Fetch)).
- **`getRegistryItems` bypasses the cache.** It defaults to `useCache: false` ([api.ts L186-195](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/api.ts#L186-L195)). `add` calls it for the first item before the main resolve ([add.ts L129-131](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/shadcn/src/commands/add.ts#L129-L131)).
- **Tested.** One `add` sent 2 GETs for the top-level item and 1 per dependency, even though the responses had `Cache-Control: public, max-age=3600`. Expect at least 2 requests per item per run, and make rendering deterministic and idempotent.

**On Cloudflare**
- **Query strings key the cache by default.** The default Cloudflare cache key includes the URI with its query string ([cache keys](https://developers.cloudflare.com/cache/how-to/cache-keys/)), so a canonicalized query gives good CDN hit rates.
- **Worker responses aren't cached automatically.** Butter has to use the Workers Cache API on a custom domain, or Workers caching ([Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/)).
- **Cache key components.** Every input to rendering should be in the cache key: the Rename Map, the registry and Invariant version, and the stack choices.

## 6. Re-adding over existing files (Reconcile)

**What happens to each existing file** ([update-files.ts L200-256](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/updaters/update-files.ts#L200-L256))
- **Identical content is skipped.** The comparison ignores CRLF and leading/trailing whitespace ([compare.ts L1-15](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/compare.ts#L1-L15)). **Tested.**
- **Differing content without `--overwrite`:** the CLI asks "The file X already exists. Would you like to overwrite?" (default No).
  - **`--yes` does not answer this prompt.** It only skips the style/theme confirmation ([add.ts L142-164](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/shadcn/src/commands/add.ts#L142-L164)), and the CLI always runs with `interactive: true` ([add-components.ts L52-58](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/add-components.ts#L52-L58)).
  - **The prompt names the wrong file.** It shows the source `path` basename, not the target.
  - **No `--no-overwrite` flag.** One is requested in open issue [#10119](https://github.com/shadcn-ui/ui/issues/10119) (community, 2026-03-19).
- **Non-interactive behavior.** Tested with stdin set to `/dev/null`: the CLI printed the prompt and **exited 0 immediately**. Later files were not processed and no summary was printed.
  - **Why.** `prompts@2.4.2` has no EOF handling ([prompt.js](https://github.com/terkelg/prompts/blob/master/lib/elements/prompt.js)), so the process exits once its event loop is empty.
  - **If stdin stays open,** the process would hang instead (inferred, not tested).
- **`--overwrite`** replaces the file wholesale, discarding user edits. **Tested.**
- **No merge, no three-way diff, no deletion or rename.** A Rename Map change that changes target paths leaves the old files behind.

**Non-interactive API**
- **`addRegistryItems`.** The programmatic API in `@shadcn/registry`, added in 4.15.0 [#11276](https://github.com/shadcn-ui/ui/pull/11276), runs with `interactive: false`. It skips differing files unless `overwrite: true`, and installs universal items only ([add.ts L73-98](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/add.ts#L73-L98); [README L129-131](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/README.md#L129-L131)).
- **Tested.** It skipped a locally modified file and returned normally.
- **The output hides skips.** The message "Skipped N files: (files might be identical…)" lumps identical files together with skipped modified ones, so callers can't tell them apart from the output.
- **Status.** The README says "Before 1.0, minor versions may include breaking changes."

**Preview flags**
- **What exists.** `add --dry-run`, `--diff [path]` and `--view [path]` (since 4.0.0, [#9804](https://github.com/shadcn-ui/ui/pull/9804)) compute create/overwrite/skip per file without writing ([dry-run.ts](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/shadcn/src/utils/dry-run.ts)).
- **They need a `components.json`.** They skip the universal fast path, so without one the CLI prompts to create it. Tested: it exits 0 with no output.
- **`shadcn diff` is deprecated** in favor of "Use `add [component] --diff`" ([diff.ts L42-44](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/shadcn/src/commands/diff.ts#L42-L44)). It only diffs against the shadcn index.

**Other files**
- **`.env` files and `envVars`** append missing keys only ([update-files.ts L266-281](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/updaters/update-files.ts#L266-L281)).
- **CSS variables** are merged, and user-defined vars are not overwritten ([2.4.0 #6721](https://github.com/shadcn-ui/ui/pull/6721)). This doesn't matter for Butter.

## 7. Other load-bearing facts

- **Unknown fields.** The item schemas are non-strict Zod objects, so unknown top-level fields are silently stripped (tested with `view`), not rejected. Use `meta` for Butter data. Invalid types or a missing `target` on `registry:file` fail with `PARSE_ERROR`.
- **`shadcn build` vs dynamic serving.** `build` flattens a source `registry.json` into static `public/r/*.json`. The CLI rejects any served catalog that still contains `include` ([api.ts L154-170](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/api.ts#L154-L170)). Neither applies to items rendered per request.
- **Validating rendered items in CI.** Validate with `registryItemSchema` from `shadcn/schema` or `@shadcn/registry/schema`, which uses Zod 4 since 4.22.0 ([#12298](https://github.com/shadcn-ui/ui/pull/12298)).
- **Catalog endpoint.** `search`, `list` and the MCP server fetch `@ns/registry`, i.e. `{name}` = `registry`. The response must be a valid `registry.json`, and server-side search params plus `pagination` are optional ([mcp.mdx L12](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/apps/v4/content/docs/registry/mcp.mdx#L12); [api.ts L102-152](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/registry/src/registry/api.ts#L102-L152)). The registry `params` are applied to the catalog request too.
- **MCP server.** Its tools are list, search, view, examples, `get_add_command_for_items` and an audit checklist ([mcp/index.ts](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/shadcn/src/mcp/index.ts)). It does not install anything; it hands the agent an `add` command.
- **`shadcn view <url|@ns/item>`** prints the validated item JSON. It works without a `components.json` ([view.ts L70](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/shadcn/src/commands/view.ts#L70)), which makes it a safe preview of a rendered Slice.
- **Registry directory.** Listing in the public directory requires an open-source, public, flat registry whose catalog has no file `content` ([registry-index.mdx L28-33](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/apps/v4/content/docs/registry/registry-index.mdx#L28-L33)). It is optional: namespaces declared in `package.json` or `components.json` work without it.
- **No `package.json` in `--cwd`.** `add` goes into interactive project creation ([preflight-add.ts](https://github.com/shadcn-ui/ui/blob/daaf156ee00ed91cc7e6bdd937c1b4973152d141/packages/shadcn/src/preflights/preflight-add.ts)). Run it at the package root.

## Implications for Butter

1. **Serve Slices as universal items.**
   - Use `type: "registry:item"`, with every file `registry:file` and its `target` starting with `~/`.
   - This gives byte-for-byte TypeScript, SQL and Invariant test files.
   - It needs no `components.json`, Tailwind or framework detection.
   - It avoids the `src/` rewrite and the `tsx:false` rename.
   - Never use `registry:lib`/`registry:hook`, because their transforms drop leading comments.
2. **Targets depend on the Schema Owner.**
   - Migration paths differ by Schema Owner (Prisma migration folders, Drizzle output, plain SQL), so the server must render targets from the Manifest's stack choices.
   - Migration file names should be stable across Reconciles. A timestamp generated at render time would create a new file every run.
3. **Passing the Rename Map.**
   - A canonical, base64url-encoded Rename Map in the URL works today and fits within the 16 KB limit for any realistic map.
   - Prefer a short, deterministic key in the URL: `?m=<manifest-hash>` or a Configurator id, plus a registry version.
     - Large maps never hit limits.
     - CDN keys stay small.
     - Rename Maps stay out of logs.
     - This assumes the website can resolve the hash, so the Configurator or the agent must publish the Manifest first.
   - If no server state is wanted, put the canonical map in `params` via `${BUTTER_RENAMES}` in `package.json` `registries`, with the agent setting the env var per run.
   - Use namespaced `registryDependencies` (`@butter/core`) so parameters and headers propagate consistently.
4. **Reconcile cannot rely on `shadcn add` for updates.**
   - The CLI without `--overwrite` exits silently (code 0) at the first modified file when no TTY is attached. Agents may read that as success.
   - `--overwrite` destroys user edits.
   - Neither mode deletes or renames files. A Rename Map change that renames files leaves orphans.
   - Recommended:
     - First install: CLI `shadcn add … --yes` is fine on a clean tree.
     - Reconcile: use `@shadcn/registry`'s `addRegistryItems` from a small Butter script, or `shadcn view` (render-only) plus Butter's own write logic. Then use `git diff` to pick files to overwrite; for user-owned code, treat differences as Setup Tasks with Acceptance Checks.
   - Invariant tests are never edited by agents, so they can safely be overwritten on every Reconcile. Other Slice code cannot.
5. **SQL and Invariant test files survive intact as `registry:file`.** Verified for `.sql` with leading `/* */` and `--` comments, and for `.test.ts` with `// @vitest-environment`. The only change risk is the post-write rewrite of `@/…` or `#…` imports in `.ts` files. Ship relative imports in Slices.
6. **Versioned npm specs are reinstalled on every Reconcile.** For example, `effect@4.x` overrides the user's range. Use bare names for packages the user may pin.
7. **Advisories.** New Invariant test files can ship as an extra Slice item. Files that already exist hit the overwrite rules above.

### Open risks and unknowns

- **CLI under agents:** the exact behavior when stdin is an open pipe (hang vs exit) is inferred, not tested. Exit code 0 on an abandoned prompt was observed on macOS only.
- **`@shadcn/registry` stability:** it is pre-1.0 and its `internal/*` paths are explicitly unstable. Butter should pin it.
- **CDN behavior:** Cloudflare cache behavior for a TanStack Start Worker under Alchemy wasn't tested. Whether Butter's deploy uses a custom domain (required for the Cache API) is unknown.
- **Bodies, partial writes and timeouts (unverified):**
  - There is no documented maximum response size on the CLI side. Cloudflare enforces no response body limit.
  - Writes are not atomic: a failure midway (e.g. a network error on a dependency) leaves the files written so far.
  - No timeout was found in the fetch path, so a slow render could hang the agent.
- **Duplicates:** mixing address forms (URL vs namespace) for the same Slice duplicates work and output. Pick one.
- **`--diff`/`--dry-run`:** both need a `components.json`, so they can't preview universal Slices in projects without shadcn UI.
- **Docs vs source disagreements:**
  - `${VAR:-default}` is documented but unsupported.
  - "never auto-adds registries" is false.
  - `registry:ai` is not a valid type.
