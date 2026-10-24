# Reylo maturity, and PGlite as its typecheck database

Research for slovakian/butter#18. Sources were accessed on 2026-10-24 unless a source says otherwise.

## Question

"How mature is Reylo, and can PGlite back its typecheck?" This covers Reylo's current maturity, maintenance status and API. It covers what its stated requirements mean in practice: TypeScript 7.1 `contentMappers`, a live dev database at typecheck time, and a runtime loader or bundler plugin. It also asks whether PGlite can serve as the dev database for typechecking in CI.

## Answer

- **Identity.** Reylo is [colinhacks/reylo](https://github.com/colinhacks/reylo), by Colin McDonnell, the author of Zod. It is MIT-licensed and published on npm as `reylo`, plus one engine package per database: `@reylosql/postgres`, `@reylosql/mysql` and `@reylosql/sqlite`. Nothing else of note shares the name.
- **Maturity: very young, pre-1.0 and moving fast.** The repo went public on 2026-10-21. The first real npm release (0.0.1) came out on 2026-10-22, and **0.5.0 followed on 2026-10-23: seven releases in about 42 hours**. 0.5.0 already contains breaking changes. The project has one human contributor (534 of 535 commits) and about 1.1k stars. npm counted 808 downloads for the week of 2026-10-16 to 10-22, almost all on 10-22. No dependents are visible. Activity is very high (about 360 commits from 2026-10-20 to 10-23), so the maintenance risk is about API churn and bus factor, not abandonment.
- **API.** You write a plain `.sql` file and `import` it. The default export has `.run(client, params)`, plus `.runSync`, `.try`, `.with`, `.sql`, `.raw` and `.source`. Parameters are `:name` (with `::type` casts and `::nullable(type)`), or Postgres's own `$1` keyed `{ 1: … }`. Types come from the dev database preparing (Parse/Describe) each statement, plus Reylo's own inference of nullability and cardinality. Reylo brings no driver of its own: it accepts `pg`, postgres.js, `Bun.sql`, **PGlite**, Neon, pg-promise and Drizzle databases, including their transactions. It refuses a Prisma client.
- **TS 7.1 `contentMappers` is beta, and stable is planned for 2026-11-24.** TS 7.1.0-beta shipped on 2026-10-20, and npm `latest` is still 7.0.2. Content mappers need `tsc --runExternalCode` and, in VS Code, a trusted workspace. The protocol is promised to stay backward-compatible across 7.x after 7.1 stable. **Butter's own `vp check` type check runs on oxlint-tsgolint. Its pinned typescript-go commit (2026-07-08) predates content mappers (merged 2026-08-19), so `vp check` cannot type a `.sql` import.** A separate `tsc --noEmit --runExternalCode` step is needed.
- **A live database is needed for the typecheck and for builds and loads.** Reylo reads `DATABASE_URL`, or `direct_url` in `.reylo.yaml`, opens a postgres.js wire connection and prepares each statement. It keeps a gitignored `.reylo/` cache. In my test, a warm cache let `tsc` pass with the database down, and with no cache and no database it fails with `reylo5`. The docs' FAQ still says you cannot build without a database. The runtime loader and the bundler plugins run the same analysis, so a build, a Vitest run or a `node --import reylo/register` start also needs the database or a warm cache.
- **PGlite: yes, through `@electric-sql/pglite-socket`, verified empirically.** For Postgres, Reylo's typecheck only speaks the wire protocol from a `postgres://` URL. It has no in-process PGlite mode, although its own playground runs the engine on in-process PGlite. Pointing `DATABASE_URL` at a `PGLiteSocketServer` worked with reylo 0.5.0, TypeScript 7.1.0-beta, PGlite 0.5.11 and pglite-socket 0.2.14:
  - correct row and parameter types;
  - a misspelled column reported as `reylo6` at its line and column;
  - TS errors on wrong use.

  There are caveats:
  - pglite-socket allows one connection by default, and a second client's connection is reset.
  - With `maxConnections > 1`, an open transaction on another connection stalls Reylo past its 10 s connect timeout.
  - SSL and postgres.js over a Unix socket URL are not supported.
  - Reylo does not document or test PGlite as a typecheck database, only as a runtime driver.

## 1. Identity

- **Repo:** https://github.com/colinhacks/reylo, described as "Import .sql files into TypeScript with full type inference and zero codegen". It is MIT, its language is Rust (a WebAssembly analysis engine) plus TS, its homepage is https://reylo.dev, it was created on 2026-10-21T00:16:54Z and last pushed on 2026-10-24T04:54:52Z (`gh api repos/colinhacks/reylo`).
- **Author:** Colin McDonnell. That is the `author` field in [package.json](https://github.com/colinhacks/reylo/blob/main/package.json), and the npm maintainer is `colinhacks <colinmcd94@gmail.com>` (`npm view reylo`).
- **npm packages** (`npm view`):
  - `reylo` 0.5.0: MIT, `engines.node >=24`, no dependencies, optional peers `@reylosql/{postgres,mysql,sqlite}@0.5.0`, unpacked size 178 kB.
  - `@reylosql/postgres` 0.5.0: about 3.4 MB unpacked. It contains `engine.wasm` and a bundled postgres.js describer ([packages/postgres/package.json](https://github.com/colinhacks/reylo/blob/main/packages/postgres/package.json)). On disk the installed packages took 328 KB (`reylo`) and 4.2 MB (`@reylosql/postgres`).
- **Disambiguation:** `gh search repos reylo` turns up only profile repos and unrelated personal repos (for example `matheusc3m/reylo` and `DarthJarJar345/Reylo`). The SQL tool is unambiguous.

## 2. Maturity and maintenance

| Metric | Value | Source |
| --- | --- | --- |
| npm name first registered | 0.0.0, 2026-10-03 (placeholder) | `npm view reylo time` |
| First real release | 0.0.1, 2026-10-22T05:20Z | npm time; [GitHub releases](https://github.com/colinhacks/reylo/releases) |
| Releases | 0.0.1, 0.0.2, 0.1.0, 0.2.0, 0.3.0 (all 10-22), 0.4.0 (10-23 18:38Z), 0.5.0 (10-23 23:34Z) | npm time; `gh api repos/colinhacks/reylo/releases` |
| Latest | 0.5.0, 2026-10-23 | same |
| Pre-1.0 | yes | |
| Breaking changes in latest | yes: "Two changes can break an existing project" (the `coalesce` → `::nullable(type)` change, and null refused for every other parameter) | [v0.5.0 release notes](https://github.com/colinhacks/reylo/releases/tag/v0.5.0) |
| Stars, forks, open issues and PRs | 1,102, 8, 10 | `gh api repos/colinhacks/reylo` |
| Contributors | colinhacks (532 per the API, 534 in git log), pullfrog[bot] (1) | `gh api …/contributors`; `git log` |
| Commit history | the first commit is dated 2026-05-10 (it began as a Prisma-schema tool); about 360 of 535 commits fell on 2026-10-20 to 10-23 | `git log` of a clone at `1eecb3e` |
| Weekly downloads | `reylo` 808 and `@reylosql/postgres` 738 (2026-10-16 to 10-22); `reylo` had 801 on 10-22 alone | api.npmjs.org downloads |
| Open feature requests | Bun as the mapper runtime (#116), DuckDB (#30), MS SQL (#28), codecs (#25), branded types (#22) | [issues](https://github.com/colinhacks/reylo/issues) |

**Stability warnings.** The README has no explicit "experimental" or "alpha" banner. Its only caveat is that it depends on "TypeScript 7.1 (currently in beta)" ([README](https://github.com/colinhacks/reylo/blob/main/README.md)). The breaking 0.5.0 release on day two is the clearest stability signal.

**Testing posture.** CI runs against a `postgres:18` service container ([.github/workflows](https://github.com/colinhacks/reylo/tree/main/.github/workflows)). A driver matrix runs every supported driver version against real servers, PGlite 0.2 to 0.5 among them ([lab/driver-matrix/README.md](https://github.com/colinhacks/reylo/blob/main/lab/driver-matrix/README.md)).

## 3. API

**Writing queries.** A query is a `.sql` file. You import it, and its default export is a query object. For example, `getUser.run(db, { id: 1 })` resolves to `{ id: number; name: string; email: string | null } | null` ([README](https://github.com/colinhacks/reylo/blob/main/README.md)). There is no tagged template and no codegen.

**Parameters:**
- A parameter is `:name`, and Reylo infers its type from where it is used ([03-inference.mdx, Named parameters](https://github.com/colinhacks/reylo/blob/main/site/content/sections/03-inference.mdx)).
- Cast with `::type` where the context does not pin the type down. An untyped parameter is an error unless `strict_params: false`.
- `::nullable(type)` (new in 0.5.0) makes a parameter nullable and optional. Any other parameter that receives `null` is refused at run time.
- "You can use Postgres's `$1` instead, but not both in one query; then `.run()` takes an object keyed by number, `{ 1: 42 }`" ([postgres.mdx](https://github.com/colinhacks/reylo/blob/main/site/content/docs/postgres.mdx)).

**Result shape** (the README table):

| The query | Resolves to |
| --- | --- |
| A unique-key match or `limit 1` | `Row \| null` |
| An aggregate without `group by`, or a one-row `insert … returning` | `Row` |
| An `insert`, `update` or `delete` without `returning` | `void` |
| Anything else | `Row[]` |

**How types are inferred.** "Reylo has your dev database prepare it, without running it, and reads back the type of every column and parameter". On top of that, Reylo infers nullability, cardinality, enum and check-constraint unions, and JSON shapes ([README](https://github.com/colinhacks/reylo/blob/main/README.md)). In the code, the Postgres describer calls postgres.js `sql.unsafe(text).describe()` (Parse/Describe) and reads each column's table oid and attnum. It then runs catalog queries over the same connection ([packages/postgres/describe.ts](https://github.com/colinhacks/reylo/blob/main/packages/postgres/describe.ts)).

**Values.** "A 64-bit integer is a `bigint` … a decimal is its exact text; and an instant is its ISO 8601 text in UTC. No value is a `Date`" ([09-faq.mdx](https://github.com/colinhacks/reylo/blob/main/site/content/sections/09-faq.mdx)). Reylo decodes values itself, so every driver returns the same types.

**Other members** ([02-usage.mdx](https://github.com/colinhacks/reylo/blob/main/site/content/sections/02-usage.mdx)):
- `.try()` returns `{ value }` or `{ error }`, typed with SQLSTATE `code` and `condition`, and with the error narrowed to the unique keys the statement writes.
- `.runSync()` works on synchronous SQLite drivers only.
- `.with(db)` binds a client.
- `.sql` is the compiled statement, `.raw` the file as written, and `.source` its path.
- Every query is published on the Node tracing channel `reylo:query`.

**Compiled statement.** Reylo sends a rewritten statement. Named parameters become `$n`, and by default a sqlcommenter comment is appended (`/*file='…'*/`), which `sqlcommenter: false` turns off ([04-configuration.mdx](https://github.com/colinhacks/reylo/blob/main/site/content/sections/04-configuration.mdx)). I confirmed this: `getSession.sql` was `… where s.id = $1 /*file='src%2Fget_session.sql'*/`.

**Drivers and transactions.** You pass `.run()` a pool, a client, or a transaction taken from one:
- **Postgres:** `pg` (Pool, Client, PoolClient within BEGIN/COMMIT), postgres.js (`sql.begin`, `savepoint`, `reserve`), `Bun.sql`, **PGlite (`db.transaction(tx)`)**, Neon (`neon()` over HTTP, Pool and Client), `pg-promise`, `@vercel/postgres`.
- **Drizzle:** a Drizzle database over `pg`, postgres.js, Neon, PGlite or `Bun.sql`, "or a transaction or savepoint taken from it". This is how Drizzle + Reylo share a client and transactions.

Sources: [02-usage.mdx](https://github.com/colinhacks/reylo/blob/main/site/content/sections/02-usage.mdx) and [postgres.mdx, Drivers](https://github.com/colinhacks/reylo/blob/main/site/content/docs/postgres.mdx).

**Prisma.** Reylo refuses a Prisma client with this hint: "Prisma decodes the values of its queries itself … pass a client of your database's driver, such as the pool its driver adapter was made with". If the object has no `$transaction`, the hint adds that it "does not hand out its transaction's connection" ([src/execute.ts](https://github.com/colinhacks/reylo/blob/main/src/execute.ts), around lines 715 to 726). So a Prisma app can share its driver-adapter `pg` pool with Reylo, but not a Prisma interactive transaction. That fits Butter's design-doc claim.

**Runtime footprint.** `reylo` has no runtime dependencies and is 178 kB unpacked. The emitted module "carries everything the query needs at run time … so that the running code reads no file and asks no database" ([src/loader.ts](https://github.com/colinhacks/reylo/blob/main/src/loader.ts), header comment). The 3.4 MB engine package is a dev dependency, used at build and typecheck time. Reylo requires Node ≥ 24 (`engines`), while Butter's root `package.json` says `node >=22.18.0`.

## 4. Requirements in practice

### 4a. TypeScript 7.1 `contentMappers`

**What the feature is.** It comes from typescript-go PR [#4712 "Content mappers"](https://github.com/microsoft/typescript-go/pull/4712) by andrewbranch, merged 2026-08-19, with a follow-up in [microsoft/TypeScript#63936](https://github.com/microsoft/TypeScript/pull/63936), merged 2026-08-21. Quoting the PR: content mappers are "external integrations that allow TypeScript to include otherwise unsupported file types in a program. They transform a foreign file's original text into valid TypeScript syntax and provide mappings."
- They are configured in `tsconfig.json` under `contentMappers: [{ package, extensions, options }]`.
- The package declares `typescript.contentMapper.exec` in its package.json. TypeScript spawns that process and talks JSON-RPC to it over stdio (`initialize`, `openProject`, `transform`, `closeProject`).
- "When `contentMappers` are specified, `tsc` must be run with `--runExternalCode`. VS Code passes `--runExternalCode` to `tsc --lsp` only in trusted workspaces." Reylo's manifest runs `exec: ["node", "src/mapper.ts"]` with `dynamicConfig: true` ([package.json](https://github.com/colinhacks/reylo/blob/main/package.json)).
- `include: ["src"]` implicitly includes the mapped extensions. In my test, a stray broken `.sql` file under `src/` failed the check even though nothing imported it.

**Release status:**

| Item | Date | Source |
| --- | --- | --- |
| npm `latest` | `7.0.2`, 2026-07-08 | `npm view typescript` |
| `beta` | `7.1.0-beta`, 2026-10-20 | same |
| `next` | `7.1.0-dev.20261024.1` | same |
| TS 7.1 Beta announcement | 2026-10-20: "a Release Candidate in about a month from now, followed by a final release shortly thereafter" | [devblogs](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/) |
| Planned 7.1 RC | 2026-11-10 | [TypeScript 7.1 Iteration Plan #63703](https://github.com/microsoft/TypeScript/issues/63703) |
| Planned 7.1 Stable | 2026-11-24 | same |

The iteration plan lists "Stabilize API → Content Mapper API". The beta itself slipped from the planned 2026-10-06 to 2026-10-20.

**Stable or experimental?** The beta post does not label content mappers experimental. [#64709 "API status as of 7.1 beta"](https://github.com/microsoft/TypeScript/issues/64709) (andrewbranch, 2026-10-09) says the APIs may still have "breaking changes before 7.1 stable if absolutely needed". After stable, "the content mapper protocol will only change in backward-compatible ways during 7.x". There are many open content-mapper issues in microsoft/TypeScript, two of them filed by colinhacks (#64912, #64362). Two are 7.1-beta regressions:
- [#64848](https://github.com/microsoft/TypeScript/issues/64848): quadratic root scanning in no-op builds;
- [#64897](https://github.com/microsoft/TypeScript/issues/64897): `tsc -b` no-op about 5x slower.

**Which tools honor it:**
- **`tsc` 7.1 with `--runExternalCode`: yes.** This is verified in my prototype.
- **`tsc --lsp`, the VS Code "TypeScript 7" extension and Cursor: yes**, given workspace trust and permission ([beta post](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/)). Reylo's docs add that you must point `js/ts.tsdk.path` at the project's TypeScript, because "the extension's own copy is TypeScript 7.0" ([01-setup.mdx, Editor](https://github.com/colinhacks/reylo/blob/main/site/content/sections/01-setup.mdx)).
- **Zed:** works, but it does not send `.sql` files to the server, so errors inside a `.sql` file show only in the type check (same source).
- **Next.js:** its built-in type check does not pass `--runExternalCode`, so `withReylo` turns that check off and runs `tsc --noEmit --runExternalCode` itself (same source).
- **oxlint type-aware (tsgolint), and therefore Vite+ `vp check` with `typeCheck: true`: no evidence of support, and very likely not.** Vite+ says its type check "is powered by tsgolint on top of the TypeScript 7 … toolchain" (`node_modules/vite-plus/docs/guide/lint.md`, vite-plus 1.4.0). The `oxc-project/tsgolint` default branch pins the `typescript-go` submodule at `2bd066d8`, committed on 2026-07-08 ("Merge branch 'main' into ts7-release"). That predates the content-mapper merge of 2026-08-19. `oxlint-tsgolint` latest is `7.0.2005` (2026-10-22), and Butter's catalog has `^7.0.2005`. A search of tsgolint issues and code for content mappers or `runExternalCode` found nothing.
- **Vite, Vitest and Rolldown:** these do not type-check, so `contentMappers` does not apply to them. Their `.sql` imports go through the `reylo/vite` plugin ("For Vitest, this plugin is all you need", [01-setup.mdx](https://github.com/colinhacks/reylo/blob/main/site/content/sections/01-setup.mdx)).

### 4b. A live dev database at typecheck time

- **How Reylo connects.** It uses the `DATABASE_URL` environment variable, or `direct_url` in `.reylo.yaml`, and the URL's scheme picks the dialect: `postgres://`, `postgresql://`, `mysql://`, `mariadb://`, `file:` or `sqlite:`. It loads `.env.local` and `.env` by default, and supports `${VAR}` interpolation and `$(command)` for secrets ([04-configuration.mdx](https://github.com/colinhacks/reylo/blob/main/site/content/sections/04-configuration.mdx); [src/project.ts](https://github.com/colinhacks/reylo/blob/main/src/project.ts) lines 116 to 121). "Point it at a direct connection, not a pooler" (same doc).
- **Mechanism.** For Postgres, the typecheck opens `postgres(url, { max: 1, prepare: false, connect_timeout: 10 })` using the postgres.js bundled in `@reylosql/postgres` ([describe.ts](https://github.com/colinhacks/reylo/blob/main/packages/postgres/describe.ts)), so it needs a **wire-protocol** server. A schema fingerprint query over the catalogs is re-read at most every 5 s. After a connection failure, the session stays offline for 60 s ([src/analyze.ts](https://github.com/colinhacks/reylo/blob/main/src/analyze.ts)).
- **Cache and offline mode.** `.reylo/` holds one JSON entry per statement, keyed by schema. The source says: "while it does not [answer], or no URL names it, the entries are used as they are, so a build that cannot reach the database runs on what `reylo generate` or an earlier type check wrote" ([src/analyze.ts](https://github.com/colinhacks/reylo/blob/main/src/analyze.ts) header). But `.reylo/` writes its own `.gitignore` (`*`), and the docs say "don't commit it". They also say "Can I build without a database? No, not yet" ([09-faq.mdx](https://github.com/colinhacks/reylo/blob/main/site/content/sections/09-faq.mdx)). The documentation and the code disagree here. In practice, CI has no cache unless you restore one.
- **With no database** (my test): `error reylo5: Cannot connect to the database at 127.0.0.1:55499/postgres … .reylo has no analysis of this statement, so run reylo generate where the database can be reached.` The exit code was 2. With a warm `.reylo/` and an unreachable URL, the run exited 0.
- **CI.** Reylo's recipe is "Start the database, apply the migrations, and run `tsc --noEmit --runExternalCode` with `DATABASE_URL` set" ([09-faq.mdx](https://github.com/colinhacks/reylo/blob/main/site/content/sections/09-faq.mdx)). Reylo does not run migrations.
- **Reporting quirk** (observed): `reylo` diagnostics on `.sql` files appear to be reported in an earlier phase than TS semantic errors. While a `.sql` file had a `reylo6` error, tsc printed only that error and not the TS type errors in a `.ts` file. Once the `.sql` error was fixed, the TS errors appeared.

### 4c. Runtime loader or bundler plugin

A `.sql` import must be turned into a JS module wherever code runs ([01-setup.mdx, Runtime / framework](https://github.com/colinhacks/reylo/blob/main/site/content/sections/01-setup.mdx); [package.json exports](https://github.com/colinhacks/reylo/blob/main/package.json)):

| Runtime or tool | How |
| --- | --- |
| Node | `node --import reylo/register` (uses `module.registerHooks`, and blocks on a worker thread for the analysis, per [src/register.ts](https://github.com/colinhacks/reylo/blob/main/src/register.ts)) |
| Bun | preload in `bunfig.toml`; `reylo/esbuild` for `Bun.build` |
| Nub | `nub.jsonc` preload |
| Vite (Vitest, Cloudflare Vite plugin) | `reylo/vite` |
| Next.js | `withReylo`, Turbopack or webpack |
| esbuild | `reylo/esbuild` |
| webpack and Rspack | `reylo/webpack` |
| Jest | `reylo/jest` |

The docs say: "If the project runs on anything else, Reylo has no plugin for it yet". There is no Rolldown-native plugin (Rolldown via Vite is covered by `reylo/vite`), and nothing for tsx, ts-node or Deno.

**The runtime path also needs the analysis.** "The analysis comes from `.reylo/` when it holds the statement for the current schema, else the database. A build that has neither fails" ([src/loader.ts](https://github.com/colinhacks/reylo/blob/main/src/loader.ts)). So:
- a bundled app needs the database (or a warm cache) at **build** time;
- an unbundled Node app using `reylo/register` needs it at **process start or import** time;
- Vitest with `reylo/vite` needs it while transforming tests.

The Vite docs also warn: "Import `.sql` files from server code only … Vite bundles a query wherever it is imported, the browser included."

## 5. Can PGlite be the typecheck dev database?

**What Reylo needs.** For Postgres, the typecheck path only opens a postgres.js connection from a `postgres://` URL ([src/analyze.ts](https://github.com/colinhacks/reylo/blob/main/src/analyze.ts) `#open`; [describe.ts](https://github.com/colinhacks/reylo/blob/main/packages/postgres/describe.ts)). There is no config to hand the typecheck an in-process PGlite.

Reylo's engine itself does run on in-process PGlite. The reylo.dev playground drives the same Postgres engine through `pg.execProtocol` with Parse, Describe and Sync messages, and its RowDescription "carries each column's table oid and column number, which the engine's nullability reads" ([site/lib/live/pg-io.ts](https://github.com/colinhacks/reylo/blob/main/site/lib/live/pg-io.ts)). So PGlite answers Describe the way the engine needs. Exposing that as an option for the typecheck would be a small Reylo feature, but it does not exist in 0.5.0.

**What Reylo documents.** Setup lists the dev database requirement as "Postgres 14 to 18, including Neon and PGlite" ([01-setup.mdx](https://github.com/colinhacks/reylo/blob/main/site/content/sections/01-setup.mdx)). No page explains how to point `DATABASE_URL` at PGlite, and no file in the repo mentions `pglite-socket`. The driver matrix tests PGlite only "in-process" as a **runtime** client ([lab/driver-matrix/README.md](https://github.com/colinhacks/reylo/blob/main/lab/driver-matrix/README.md)).

**PGlite's wire server.** [`@electric-sql/pglite-socket`](https://github.com/electric-sql/pglite/tree/main/packages/pglite-socket) 0.2.14 was released on 2026-10-21, is Apache-2.0, and had about 5.9M downloads that week. It provides `PGLiteSocketServer`, a TCP server or Unix socket, and a `pglite-server` CLI with `--run … --include-database-url`. Its README notes these limitations:
- "PGlite is a single-connection database". Multiple connections are possible through a multiplexer (`--max-connections`, default 1, "no concurrent connections"), "so not all use cases are guaranteed to work";
- "SSL connections are NOT supported";
- for postgres.js over a Unix socket, the generated `?host=` URL does not work, and you have to use the `path` option, which Reylo's URL-only config cannot pass.

The installed type declarations show a `QueryQueueManager` with `CONNECTION_QUEUE_TIMEOUT = 60000`: queries from all connections are queued onto the one PGlite session.

**My prototype.** It lives in [`reylo-prototype/`](./reylo-prototype/) (throwaway; `npm install`, then `node server.mjs`, then `DATABASE_URL=postgres://postgres@127.0.0.1:55433/postgres npx tsc --runExternalCode`; the `.off` files are the negative cases, renamed into `src/` to run), with reylo 0.5.0, @reylosql/postgres 0.5.0, typescript 7.1.0-beta, PGlite 0.5.11, pglite-socket 0.2.14 and Node 24.22.1. An in-memory PGlite with `users` and `sessions` tables was served on 127.0.0.1:55433, with `DATABASE_URL=postgres://postgres@127.0.0.1:55433/postgres`.

| Case | Result |
| --- | --- |
| A join query with `:id` | passed; the exact-type assertion `{ id: string; expires_at: string; user_id: string; email: string; name: string \| null } \| null` held |
| `insert … returning` | typed as one row (`user.email: string`) |
| Misspelled column | `src/broken.sql(1,12): error reylo6: column "emial" does not exist (42703)` |
| Wrong use in TS | `TS2322` for `email` assigned to `number`, and for `{ id: 1 }` where `id` is text |
| Warm `.reylo/`, database unreachable | exit 0 |
| No cache, database unreachable | `reylo5`, exit 2 |
| `maxConnections: 1`, another client connected | `read ECONNRESET`: the typecheck fails at once |
| `maxConnections: 4`, another client holding an **open transaction** | `CONNECT_TIMEOUT` after 10 s: the typecheck fails |
| `maxConnections: 4`, another client **idle** | passed |
| Runtime: `node --import reylo/register` with the queries run on an **in-process** PGlite, including inside `db.transaction` | worked; timestamps came back as ISO strings |

**Conclusion.** PGlite can back Reylo's typecheck in CI through pglite-socket. Give the typecheck its own PGlite server instance, or at least one that no test is holding a transaction on. Apply the Schema Owner's migrations to it, then run `tsc --noEmit --runExternalCode`. This path is not supported or tested upstream.

## 6. Implications for Butter (my inference, not sourced fact)

- **Keeping Reylo as the default Query Layer.** It is technically a good fit:
  - plain Postgres `.sql` files, with `$1` allowed, which matches "one atomic canonical Postgres SQL statement";
  - PGlite, pg, postgres.js and Drizzle clients and transactions all accepted.

  But it is about three days old and on 0.x, with breaking changes on day two and a single maintainer. It depends on a TS beta whose stable release is planned for 2026-11-24. Making it the *default* today ties Butter's default path to two moving targets. Options:
  - pin exact versions and treat it as preview until both TS 7.1 and Reylo settle;
  - or default to the ORM's raw SQL for now and offer Reylo as an opt-in.
- **Configurator requirement text.** The current three items are accurate but incomplete. Add:
  1. Node ≥ 24.
  2. `tsc --runExternalCode` as a separate typecheck. `vp check` and oxlint type-aware do not run content mappers, so `.sql` imports look unresolved or untyped there. Check how tsgolint reports an unknown `.sql` module and suppress or exclude it if needed.
  3. The database (or a warm `.reylo/`) is needed at build, Vitest transform and Node-loader start time, not only at typecheck.
  4. Reylo's own value conventions: `bigint`, numeric as string, instants as ISO strings, no `Date`. Butter's Effect Schema decoders at the Port boundary must expect these.
  5. The default sqlcommenter suffix on every statement (`sqlcommenter: false` turns it off).
  6. Prisma: share the driver-adapter pool, never a Prisma transaction. That matches the design doc.
- **Butter's CI typecheck.** The issue's open fact resolves to "yes, via pglite-socket". The CI job would:
  1. start `PGLiteSocketServer` (or `pglite-server --run "tsc --noEmit --runExternalCode" --include-database-url`) on a dedicated in-memory PGlite;
  2. apply the reference schema;
  3. run tsc 7.1.

  Keep it apart from the Vitest PGlite instances so that no open test transaction blocks the describer. Because Rename Maps change table and column names, the typecheck must run against a schema rendered with the same Rename Map as the SQL under test, one database per rendered variant.

## What remains unverified

- How oxlint-tsgolint actually reports `import x from "./q.sql"` (an error, or `any`). I inferred "no content-mapper support" from the submodule date and an empty search, and did not run it.
- Whether a future tsgolint release will adopt content mappers. No issue or PR was found.
- Behaviour with several tsconfig projects (`tsc -b`, a monorepo) against a single-connection pglite-socket. Each project may open its own session and connection, which would hit `maxConnections: 1`.
- The editor LSP path against PGlite. I tested only `tsc` on the command line.
- Coverage of Reylo's inference on PGlite beyond the two queries tested: extensions such as pg_jsonschema (unavailable in PGlite, which the playground stubs), enums, domains, JSON aggregation, and Butter's actual Store statements.
- Whether warm `.reylo/` entries keyed to one server URL are reused for a different, unreachable URL by design. My run suggests so, and the docs say the opposite.
- Whether Prisma 8 exposes a usable underlying driver or transaction connection. That is outside Reylo's sources and was not researched here.
- Download figures for 2026-10-23 onward, which were not yet published.

## Sources

1. https://github.com/colinhacks/reylo: repo metadata via `gh api` (created 2026-10-21, 1,102 stars, MIT); clone at commit `1eecb3e` (2026-10-23T21:38:37-07:00).
2. https://github.com/colinhacks/reylo/blob/main/README.md: setup, inference, drivers (0.5.0).
3. https://github.com/colinhacks/reylo/releases: v0.0.1 to v0.5.0 (2026-10-22 to 10-23); v0.5.0 notes on the breaking changes.
4. https://github.com/colinhacks/reylo/blob/main/site/content/sections/01-setup.mdx: requirements, plugins, database, editors.
5. https://github.com/colinhacks/reylo/blob/main/site/content/sections/02-usage.mdx: `.run`, transactions, `.try`, `.with`, tracing.
6. https://github.com/colinhacks/reylo/blob/main/site/content/sections/03-inference.mdx: named parameters, casts, `nullable(…)`.
7. https://github.com/colinhacks/reylo/blob/main/site/content/sections/04-configuration.mdx: `direct_url`, `env`, `strict_params`, `sqlcommenter`.
8. https://github.com/colinhacks/reylo/blob/main/site/content/sections/09-faq.mdx: CI, `.reylo/`, building without a database.
9. https://github.com/colinhacks/reylo/blob/main/site/content/docs/postgres.mdx: Postgres 14 to 18, connection, drivers, `$1`.
10. https://github.com/colinhacks/reylo/blob/main/packages/postgres/describe.ts: postgres.js describer (`max: 1`, `prepare: false`, 10 s timeout).
11. https://github.com/colinhacks/reylo/blob/main/src/analyze.ts: session, cache, offline TTL, `#open`.
12. https://github.com/colinhacks/reylo/blob/main/src/project.ts: URL scheme to dialect.
13. https://github.com/colinhacks/reylo/blob/main/src/loader.ts and https://github.com/colinhacks/reylo/blob/main/src/register.ts: runtime module emission, Node and Bun hooks.
14. https://github.com/colinhacks/reylo/blob/main/src/execute.ts: client dispatch, the Prisma, Kysely and Slonik refusals.
15. https://github.com/colinhacks/reylo/blob/main/site/lib/live/pg-io.ts: the engine on in-process PGlite via `execProtocol`.
16. https://github.com/colinhacks/reylo/blob/main/lab/driver-matrix/README.md: driver test coverage, PGlite in-process.
17. npm registry (`npm view reylo`, `@reylosql/postgres|mysql|sqlite`, `typescript`, `@electric-sql/pglite`, `@electric-sql/pglite-socket`, `oxlint-tsgolint`) and https://api.npmjs.org/downloads, as of 2026-10-24.
18. https://github.com/microsoft/typescript-go/pull/4712: "Content mappers", merged 2026-08-19.
19. https://github.com/microsoft/TypeScript/pull/63936: "Content mappers round 2", merged 2026-08-21.
20. https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/: TS 7.1 Beta, 2026-10-20.
21. https://github.com/microsoft/TypeScript/issues/63703: TypeScript 7.1 Iteration Plan (RC 2026-11-10, stable 2026-11-24).
22. https://github.com/microsoft/TypeScript/issues/64709: API status as of 7.1 beta, content mapper protocol compatibility.
23. https://github.com/microsoft/TypeScript/issues/64848 and https://github.com/microsoft/TypeScript/issues/64897: 7.1-beta content-mapper build regressions; the other content-mapper issues come from `gh search issues --repo microsoft/TypeScript "content mapper"`.
24. https://github.com/oxc-project/tsgolint: `typescript-go` submodule pinned at `2bd066d8` (2026-07-08).
25. `node_modules/vite-plus/docs/guide/lint.md` (vite-plus 1.4.0, in the Butter checkout): `vp check` type check powered by tsgolint.
26. https://github.com/electric-sql/pglite/blob/main/packages/pglite-socket/README.md: PGLiteSocketServer, multiplexer, no SSL, Unix socket caveat (0.2.14).
27. Prototype at [`reylo-prototype/`](./reylo-prototype/) (`server.mjs`, `hold.mjs`, `hold-idle.mjs`, `src/*.sql`, `src/main.ts`, `src/run.ts`), run on 2026-10-24.
