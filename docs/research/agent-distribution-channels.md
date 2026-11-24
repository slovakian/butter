# How coding agents discover and consume external guidance

Research for `slovakian/butter#90` (parent map `#86`). All claims below come from primary specifications, documentation, HTTP responses, JSON schemas, and repository commit histories.

## Executive summary

No single channel covers every job Butter needs to do. Each distribution mechanism handles a different part of the lifecycle:

- **Agent-friendly docs sites** (`llms.txt` v2, `Accept: text/markdown` content negotiation, `/.well-known/` discovery) are the cheapest read path for conceptual auth guidance, threat models, and human-readable decisions. They do not carry runnable code or pin a local version inside a repository.
- **Agent Skills** (`agentskills.io` + `skills.sh` / `vercel-labs/skills`) are the strongest channel for procedural workflows, decision checklists, and audit instructions. They use a three-tier progressive disclosure model (~50-100 tokens at startup, <5,000 tokens on activation, unbounded references on demand), support 79 coding agents, and lock exact Git commits plus SHA-256 tree hashes in `skills-lock.json`.
- **ShadCN-style registries** (`registry.json` / `registry-item.json`) work well for self-contained files, UI primitives, and npm dependencies. They break down as the primary delivery mechanism for a target auth system because the schema has no database migration engine, no AST patching for existing app routes or middleware, no version lockfile, and no 3-way merge when upstream fixes ship.
- **MCP servers** fit dynamic queries against live external state, not static documentation or copied code. Loading tool schemas upfront burns context tokens (Anthropic documented a 150,000-token workload dropping to 2,000 tokens via filesystem progressive disclosure, a 98.7% reduction), and configuring MCP differs per client (`.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`, `~/.codex/config.toml`).
- **Runnable reference repositories** give agents complete, CI-verified Effect v4 + Reylo + PostgreSQL code to inspect, run, and adapt to a team's own schema and naming, without forcing fragile file overwrites.
- **Copy-the-code security updates** have a consistent track record across Phoenix (`mix phx.gen.auth`), Rails 8 (`bin/rails generate authentication`), Laravel Breeze, ShadCN UI, and Pilcrow's auth book: none of them can push security patches to already-copied code. Security fixes to templates land as changelog diffs or quiet commits without CVEs. Where ecosystems want automatic security updates, they move security-critical runtime primitives into a small versioned dependency (as Laravel 12 did with Fortify, Rails does with `has_secure_password` and `generates_token_for`, and Pilcrow did with Oslo/Arctic) and pair owned code with explicit audit procedures.

## Channel comparison

| Dimension | Agent-friendly docs site | Agent Skills (`agentskills.io` / `skills.sh`) | ShadCN registry (`registry.json`) | MCP server | Runnable reference repo |
| --- | --- | --- | --- | --- | --- |
| **Discovery** | `/llms.txt`, `Link:` headers (`rel="describedby"`, `rel="alternate"`), `/.well-known/agent-skills/index.json` | `.agents/skills/*/SKILL.md` (project & user), `npx skills find`, `skills.sh`, well-known discovery | `components.json` registries, `ui.shadcn.com/r/registries.json`, `owner/repo/item` GitHub addressing | Per-client config file or `/.well-known/ai-catalog.json` + MCP server card | Linked from docs/skills, cloned or read via Git/GitHub |
| **Context budget** | Pay per fetched page; `Accept: text/markdown` cuts HTML bloat | ~50-100 tokens/skill at startup; <5,000 tokens on activation; `references/` on demand | CLI runs out-of-band; agent only reads copied files or `shadcn view` output | High upfront cost for tool schemas unless deferred; intermediate results consume context | Zero startup cost; agent greps and reads only relevant modules |
| **Versioning & integrity** | Unpinned URLs unless versioned paths exist | `skills-lock.json` v2 pins Git `commit` SHA + deterministic SHA-256 `computedHash`; `--frozen-lockfile` for CI | Optional tag/SHA in `owner/repo/item#v1.2.0` on install; no local lockfile of installed files | Server-controlled version (`server.json` / server card); clients get silent upstream drift | Standard Git tags and commit SHAs |
| **App integration** | Read-only prose and snippets | Guides agent to adapt code to existing schema, routes, and naming | Copies files into `@ui`/`@lib`/`~` targets; merges CSS and `.env` only | Tool calls over JSON-RPC; cannot edit local code without local tools | Agent studies tested slice and writes idiomatic code into target app |
| **Security update path** | Docs edits; readers must re-check | `npx skills check` exits 1 on drift/updates; can bundle an audit checklist skill | `shadcn add --diff` compares against upstream; `-o` overwrites destructively | Server updates apply immediately to tool output, not to previously generated code | Release notes + git diff between tags |

## 1. Agent-friendly docs sites

### `is-agentic.com` methodology and checks

Vercel's [Is Agentic](https://is-agentic.com/methodology) evaluates public websites using Ora's auditing engine. It weights checks into three buckets ([methodology](https://is-agentic.com/methodology), retrieved with `Accept: text/markdown`):

- **Essential checks** share an 80-point pool (11 checks on `is-agentic.com` itself). These cover baseline reachability, raw HTML availability without client-side JS, clean redirects, honest 404 responses, and `robots.txt`.
- **Recommended checks** share a 20-point pool (23 checks on `is-agentic.com`).
- **Bonus signals** add up to 5 points without becoming mandatory requirements. Not-applicable checks are excluded rather than penalized, and sites can declare their lens with `<meta name="is-agentic-site-type" content="content">` (`content`, `business`, `app`, or `store`; see [Is Agentic developer docs](https://is-agentic.com/docs)).

`is-agentic.com` itself models the full discovery stack in its [llms.txt](https://is-agentic.com/llms.txt) and [developer docs](https://is-agentic.com/docs):

1. **Markdown content negotiation** via `Accept: text/markdown`, returning `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, and `406 Not Acceptable` if no supported media type matches.
2. **Well-known machine catalogs**:
   - `/.well-known/api-catalog` returning RFC 9727 `application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"` pointing to `/openapi.json` and `/docs` ([live response](https://is-agentic.com/.well-known/api-catalog)).
   - `/.well-known/ai-catalog.json` returning `application/ai-catalog+json` (`specVersion: "1.0"`) with entries pointing to `application/mcp-server-card+json` ([live response](https://is-agentic.com/.well-known/ai-catalog.json), [server card](https://is-agentic.com/mcp/server-card)).
   - `/.well-known/agent-skills/index.json` conforming to Cloudflare's Agent Skills Discovery RFC v0.2.0 (`https://schemas.agentskills.io/discovery/0.2.0/schema.json`), listing each skill's `name`, `type` (`skill-md` or `archive`), `description`, `url`, and SHA-256 `digest` ([live response](https://is-agentic.com/.well-known/agent-skills/index.json); [RFC v0.2.0](https://github.com/cloudflare/agent-skills-discovery-rfc/blob/main/README.md)).

### Markdown content negotiation and edge conversion

Cloudflare's [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) converts HTML responses to `text/markdown; charset=utf-8` at the edge when a client sends `Accept: text/markdown`. It sets `Vary: accept`, drops stale body headers (`ETag`, `Last-Modified`, `Content-Length`), strips non-content elements, preserves `<meta>` tags as YAML frontmatter and `<script type="application/ld+json">` as a trailing JSON block, and attaches a `Content-Signal: ai-train=yes, search=yes, ai-input=yes` header by default. Input conversion caps at 6 MiB of decompressed HTML.

For a static docs site that Butter controls from source, serving native Markdown directly (both via `Accept: text/markdown` and explicit `.md` URLs, as `ui.shadcn.com` and `agentskills.io` do) is cleaner than edge HTML-to-Markdown conversion. Native Markdown preserves exact code blocks, avoids conversion truncation, and keeps `ETag` caching intact.

### `llms.txt` v2 and `llms-full.txt`

Jeremy Howard updated the [`/llms.txt` proposal to v2](https://github.com/AnswerDotAI/llms-txt/blob/main/nbs/index.qmd) in August 2026 ([changelog](https://github.com/AnswerDotAI/llms-txt/blob/main/nbs/changes.qmd)). Key v2 changes:

- **Subpath scoping.** `llms.txt` can live at `/llms.txt` or any subpath such as `/docs/llms.txt`; a file covers all URLs under its path, and the most specific file wins. Unlike RFC 8615 `/.well-known/`, this works on subpath-hosted sites such as GitHub Pages.
- **Standardized discovery headers.** Pages advertise their Markdown twin and covering index via HTML `<link>` tags or HTTP `Link:` headers: `rel="alternate"; type="text/markdown"` and `rel="describedby"`. (As observed live on `agentskills.io/specification.md`, Mintlify emits `Link: </llms.txt>; rel="llms-txt", </llms-full.txt>; rel="llms-full-txt", </.well-known/agent-skills/index.json>; rel="agent-skills"`.)
- **Search-then-fetch over full-file expansion.** v2 dropped the v1 `llms_txt2ctx` context-expansion tool and the mechanical meaning of `## Optional`. The spec now expects agents to read the compact `llms.txt` index first, then fetch only the linked `.md` pages they need.
- **`llms-full.txt` caveat.** Concatenating an entire docs site into `llms-full.txt` (still generated by platforms like Mintlify) is convenient for one-shot indexing or RAG, but blows up an agent's context window when the agent only needs one auth flow (for example, passkeys or password reset). For Butter, `llms.txt` + per-page `.md` is the primary docs interface; `llms-full.txt` is optional and secondary.

## 2. Agent Skills (`agentskills.io` and `skills.sh`)

### Format and progressive disclosure

The [Agent Skills specification](https://agentskills.io/specification.md) defines a skill as a directory containing a required `SKILL.md` (YAML frontmatter + Markdown instructions) and optional `scripts/`, `references/`, and `assets/` folders. Frontmatter requires `name` (1-64 lowercase alphanumeric/hyphen characters matching the parent directory) and `description` (1-1024 characters stating both what the skill does and when to trigger it), plus optional `license`, `compatibility`, `metadata`, and experimental `allowed-tools`.

Progressive disclosure operates in three tiers ([specification](https://agentskills.io/specification.md), [client integration guide](https://agentskills.io/client-implementation/adding-skills-support.md), and Anthropic's [engineering write-up](https://www.anthropic.com/research/equipping-agents-for-the-real-world-with-agent-skills)):

1. **Tier 1 (Catalog, ~50-100 tokens per skill).** Loaded at session startup from every discovered skill's `name`, `description`, and optional file `location`.
2. **Tier 2 (Instructions, <5,000 tokens and <500 lines recommended).** The `SKILL.md` body loads only when the model or user (`/skill-name`) activates the skill.
3. **Tier 3 (Resources, on demand).** Files in `references/`, `scripts/`, and `assets/` load only when the active `SKILL.md` points to them. File references should stay one level deep. Because scripts execute via the shell rather than dumping their source into the prompt, bundled reference material and deterministic verification scripts have effectively unbounded capacity.

### Discovery, installation, and versioning (`vercel-labs/skills`)

The cross-client convention places skills in `<project>/.agents/skills/` and `~/.agents/skills/` alongside client-native folders such as `.claude/skills/`, with project-level skills overriding user-level skills on name collision ([client integration guide](https://agentskills.io/client-implementation/adding-skills-support.md)).

Vercel Labs' [`skills` CLI](https://github.com/vercel-labs/skills/blob/main/README.md) (`npx skills`, backing `skills.sh`) supports 79 coding agents (including Claude Code, Codex, Cursor, and OpenCode) and solves versioning and supply-chain integrity in ways docs sites and ShadCN registries do not ([CLI reference](https://github.com/vercel-labs/skills/blob/main/docs/commands.md)):

- **Install and ephemeral run.** `npx skills add owner/repo@v1.2.3 --skill <name>` installs via symlink (single canonical copy under `.agents/skills/`) or `--copy`. `npx skills use owner/repo@<skill>` runs a skill once without modifying the repo.
- **Deterministic lockfile (`skills-lock.json` v2).** Records each project skill's `source`, `sourceType`, Git `commit` SHA, and `computedHash` (a deterministic SHA-256 over UTF-8-sorted relative paths, LF-normalized text lengths, and file contents).
- **Update checks and CI gates.** `npx skills check` compares local files against both `skills-lock.json` (flagging local edits) and upstream commits, exiting with code 1 on updates or drift. `npx skills update` moves the locked `commit` forward. Experimental `npx skills experimental_sync` also syncs skills bundled inside npm packages so instructions stay version-locked with a dependency.
- **Web discovery bridge.** Publishing `/.well-known/agent-skills/index.json` (RFC v0.2.0) lets `npx skills add https://example.com` and compliant agents discover skills directly from a docs domain with SHA-256 integrity digests ([RFC v0.2.0](https://github.com/cloudflare/agent-skills-discovery-rfc/blob/main/README.md)).

### Context budget and design tradeoffs for Butter

Skills still carry two real limits ([client integration guide](https://agentskills.io/client-implementation/adding-skills-support.md)):

- **Activation relies on model judgment** unless the user invokes the skill explicitly. Poorly scoped descriptions cause under-triggering or false activations, and installing dozens of unrelated skills crowds the startup catalog.
- **Context compaction risk.** Harnesses that do not exempt active skill instructions from mid-session pruning can silently drop auth invariants halfway through a long implementation. Splitting Butter into focused skills (for example, `butter-auth-design`, `butter-auth-audit`, or flow-specific `references/*.md` files kept under 500 lines in `SKILL.md`) keeps context lean and repeatable.

## 3. ShadCN-style registries

### Schema and CLI mechanics

A ShadCN registry publishes a root [`registry.json`](https://ui.shadcn.com/schema/registry.json) index and per-item payloads conforming to [`registry-item.json`](https://ui.shadcn.com/schema/registry-item.json) ([registry index docs](https://ui.shadcn.com/docs/registry/registry-index.md), [item spec](https://ui.shadcn.com/docs/registry/registry-item-json.md)). Any public GitHub repo with a root `registry.json` now works directly via `npx shadcn@latest add owner/repo/item` without a custom server ([GitHub registries docs](https://ui.shadcn.com/docs/registry/github.md)).

Each registry item can declare:

- `type`: `registry:ui`, `registry:component`, `registry:block`, `registry:lib`, `registry:hook`, `registry:page`, `registry:file`, `registry:style`, `registry:theme`, `registry:base`, `registry:font`, or `registry:item`.
- `dependencies` / `devDependencies`: npm packages with optional `@version`.
- `registryDependencies`: other items by built-in name, `@namespace/item`, URL, or pinned GitHub ref (`owner/repo/item#v1.2.0`; refs are not inherited transitively).
- `files`: source files with `path`, `type`, and `target` (supporting `~/` for project root and `@components/`, `@ui/`, `@lib/`, `@hooks/` placeholders resolved from `components.json`).
- Declarative config merges: `cssVars`, `css` rules, deprecated `tailwind.config`, and additive `envVars` (never overwriting existing `.env` keys), plus a `docs` post-install message string.

The CLI also ships `view`, `search`, `docs --json`, `add --dry-run` / `--diff` / `--view`, and a local `shadcn mcp` bridge ([CLI docs](https://ui.shadcn.com/docs/cli.md), [MCP docs](https://ui.shadcn.com/docs/mcp.md)).

### Where ShadCN registries work and where they break for auth

ShadCN's GitHub registry docs explicitly list `"Feature kits: app/(auth)/*, lib/auth.ts, components/login-form.tsx"` as a use case ([GitHub registries docs](https://ui.shadcn.com/docs/registry/github.md)). That works for isolated UI components, forms, and standalone helper files where copy-paste ownership and npm dependency installation are enough.

For a full target auth system, however, the schema hits five structural walls:

1. **No database schema or migration integration.** `registry-item.json` can drop a raw `.sql` file via `registry:file`, but it cannot inspect existing tables, reconcile column or table renames (`users` vs `accounts`, UUID vs bigint IDs), or append to an existing Reylo/PostgreSQL migration sequence.
2. **No code patching for existing application files.** Outside CSS, Tailwind config, and `.env`, the CLI only writes whole files (`-o/--overwrite` replaces an existing file completely). Auth requires wiring into an existing app's Effect runtime layers, HTTP router, RPC layer, CSRF/cookie middleware, and client entry points.
3. **Hardcoded migrations only.** `shadcn migrate` supports five built-in UI codemods (`cn`, `icons`, `base-color`, `radix`, `rtl`; [CLI docs](https://ui.shadcn.com/docs/cli.md)). Third-party registries cannot ship custom migrations or security-patch transforms.
4. **No version lockfile.** Even when installed from `owner/repo/item#v1.2.0`, `shadcn` records no lockfile mapping local files to upstream versions or hashes. `shadcn add --diff` compares against upstream only on manual invocation and offers no 3-way merge once a team has renamed tables or customized handlers.
5. **Frontend-coupled config.** `components.json` assumes a React/Tailwind frontend project layout (`@ui/`, `@components/`, `tailwind.css`), which is awkward for backend-first Effect v4 + Reylo services or monorepos where auth server code does not live beside UI primitives.

## 4. MCP servers vs. runnable reference repositories

### Model Context Protocol (MCP)

MCP uses a stateful JSON-RPC client-host-server architecture exposing `tools`, `resources`, and `prompts` ([MCP architecture spec](https://modelcontextprotocol.io/specification/2025-11-25/architecture/index.md)).

For distributing Butter's auth guidance and reference code, MCP carries three clear costs:

- **Context overhead.** Most MCP clients load every connected server's tool definitions into context upfront, and every intermediate tool output passes through the model. In Anthropic's engineering benchmark, switching from upfront MCP tool loading to filesystem-based progressive disclosure cut token usage from **150,000 tokens to 2,000 tokens (98.7% reduction)** ([Code execution with MCP](https://www.anthropic.com/research/code-execution-with-mcp)).
- **Fragmented client setup.** As shown in ShadCN's own [MCP setup docs](https://ui.shadcn.com/docs/mcp.md), every host configures MCP differently: `.mcp.json` (Claude Code), `.cursor/mcp.json` (Cursor), `.vscode/mcp.json` (VS Code), and manual edits to `~/.codex/config.toml` (Codex), each requiring a client restart.
- **No static-guidance advantage.** MCP shines when an agent must query live, stateful, or authenticated external systems (databases, issue trackers, live APIs). Serving static Markdown docs or static reference code over a running JSON-RPC server adds setup friction and runtime failure modes for zero capability gain over local skills, `llms.txt` + `.md` pages, and a Git repo.

### Runnable reference repositories

Pilcrow's evolution after deprecating Lucia v3 illustrates the reference-repo pattern directly. In [Lucia Discussion #1714](https://github.com/lucia-auth/lucia/discussions/1714) (October 2024), Pilcrow explained why a database-backed auth library failed: *"One word - database... database adapters were a significant complexity tax... the bigger issue is how the adapters limit the API."* After archiving [The Copenhagen Book](https://github.com/pilcrowonpaper/copenhagen/blob/main/README.md), Pilcrow published [auth.pilcrowonpaper.com](https://auth.pilcrowonpaper.com/) paired with complete, runnable, open-source example repositories (`basic-example.auth.pilcrowonpaper.com` and `passwordless-example.auth.pilcrowonpaper.com`).

For Butter, a runnable Effect v4 + Reylo + PostgreSQL reference repo complements skills and docs cleanly:

- **CI-verified truth.** Unlike code snippets embedded in prose or JSON payloads, a reference repo compiles, runs PostgreSQL integration tests, and proves every Effect v4 + Reylo type signature and SQL query works together end to end.
- **Zero startup context cost.** An agent inspects only the files it needs (via local clone, `gh`, or raw GitHub URLs pinned to a release tag) and adapts the patterns to the target app's own schema, table names, and router rather than fighting blind file overwrites.
- **Limitation.** A reference repo is passive: without a skill or docs index telling the agent *which* invariants matter and *what* to verify, an agent copying from a template can quietly drop security checks (CSRF, session rotation, rate limiting) while adapting the code.

## 5. Security update precedents for "copy-the-code" ecosystems

Every major ecosystem that generates or copies auth or UI code into a team's repository runs into the same hard boundary: once files live in the app's tree, package managers and dependency scanners (`npm audit`, Dependabot, `mix_audit`, `bundle-audit`) stop seeing them. Here is how five ecosystems actually handle security fixes after code is copied.

### Phoenix `mix phx.gen.auth`

Phoenix's official [`mix phx.gen.auth` guide](https://github.com/phoenixframework/phoenix/blob/main/guides/authn_authz/mix_phx_gen_auth.md) states the contract directly under *Developer responsibilities*:

> "The one caveat with using a generated authentication system is it will not be updated after it's been generated. Therefore, as improvements are made to the output of `mix phx.gen.auth`, it becomes your responsibility to determine if these changes need to be ported into your application. Security-related and other important improvements will be explicitly and clearly marked in the `CHANGELOG.md` file and upgrade notes."

Primary evidence from Phoenix's own history shows how this plays out in practice:

- **Inline diffs in `CHANGELOG.md`.** In Phoenix v1.7.12 (April 11, 2024), Phoenix hardened generated session fixation handling by publishing a literal unified diff inside [`CHANGELOG.md`](https://github.com/phoenixframework/phoenix/blob/v1.7/CHANGELOG.md) telling existing apps to add `delete_csrf_token()` to `renew_session/1`.
- **Silent template hardening without CVEs.** Security improvements to `priv/templates/phx.gen.auth` often land as normal commits rather than GitHub Security Advisories, for example disabling browser spellcheck on credential fields to prevent PII leakage ([commit `0657045c`, #6575](https://github.com/phoenixframework/phoenix/commit/0657045c9d3bdf403125e13d4746a8a027f83529)), passing cookie options when deleting the remember-me cookie ([commit `0572c917`, #6607](https://github.com/phoenixframework/phoenix/commit/0572c9175ee5a1a8f199b2e57be65fe1d3d301ec)), and clearing `:return_to` after login ([commit `167c4695`, #6799](https://github.com/phoenixframework/phoenix/commit/167c4695)). By contrast, runtime framework vulnerabilities in `Phoenix.Socket` and `Phoenix.Presence` do receive formal CVEs and GHSAs (`CVE-2026-32689`, `CVE-2026-56811`, `CVE-2026-129344` in [v1.8 `CHANGELOG.md`](https://github.com/phoenixframework/phoenix/blob/v1.8/CHANGELOG.md)).
- **Reference PRs for major migrations.** When Phoenix v1.8 moved `mix phx.gen.auth` to magic links and sudo mode, the guide linked to example diff pull requests on a bare Phoenix app and warned manually about nulling `hashed_password` on unconfirmed accounts to avoid credential pre-stuffing ([`mix_phx_gen_auth.md`](https://github.com/phoenixframework/phoenix/blob/main/guides/authn_authz/mix_phx_gen_auth.md)).

### Rails 8 `bin/rails generate authentication`

Rails 8.0 introduced [`Rails::Generators::AuthenticationGenerator`](https://github.com/rails/rails/blob/main/railties/lib/rails/generators/rails/authentication/authentication_generator.rb) ([8.0 release notes](https://github.com/rails/rails/blob/main/guides/source/8_0_release_notes.md)), which writes plain Ruby models (`User`, `Session`, `Current`), controllers (`SessionsController`, `PasswordsController`), an `Authentication` concern, routes, and migrations into `app/`.

Two high-signal security hardening fixes landed in `railties` within three months of Rails 8.0 shipping:

- Adding rate limiting to password resets ([commit `92533b15`](https://github.com/rails/rails/commit/92533b1569ba710e166fe6bf2a3249d115a74ad6), February 5, 2025).
- Destroying all active sessions on password reset ([commit `976e5180`, #54524](https://github.com/rails/rails/commit/976e5180a00de26db65b08ac1fd7ab6b679cef9f), February 20, 2025).

Neither fix was pushed to existing Rails 8.0 apps by `bundle update rails`, and neither received a CVE. Rails keeps the blast radius manageable because low-level security primitives (`has_secure_password`, `generates_token_for`, signed/encrypted cookies, `ActionController::RateLimiting`, `params.expect`) stay inside the versioned `rails` gems while generated code is only thin glue.

### Laravel Breeze and the Laravel 12 shift to Fortify-backed starter kits

In Laravel 11, [`laravel/breeze`](https://github.com/laravel/docs/blob/11.x/starter-kits.md) copied all auth controllers, routes (`routes/auth.php`), and views into `app/` via `php artisan breeze:install`. `laravel/breeze` has zero published GitHub Security Advisories (`repos/laravel/breeze/security-advisories` is empty); fixes to stubs only helped newly scaffolded apps.

In Laravel 12, the Laravel team retired Breeze for new apps ([`laravel/breeze` 2.x README](https://github.com/laravel/breeze/blob/2.x/README.md): *"This starter kit is for Laravel 11.x and prior"*) and replaced it with [Laravel 12 Starter Kits](https://github.com/laravel/docs/blob/12.x/starter-kits.md) that split ownership:

- **Backend auth engine moved back into a versioned Composer package (`Laravel Fortify`).** Login, registration, password reset, email verification, and TOTP 2FA routes and logic now update through Composer.
- **Owned app code shrank to UI + action hooks.** Only frontend components (`resources/js`) and thin customization hooks (`app/Actions/Fortify/CreateNewUser.php`, `ResetUserPassword.php`) live in the app. That is why the Laravel 12 FAQ can say *"there is no need to update the starter kit itself"* ([Laravel 12 starter kits docs](https://github.com/laravel/docs/blob/12.x/starter-kits.md)).

### ShadCN UI

`shadcn-ui/ui` has zero published GitHub Security Advisories (`repos/shadcn-ui/ui/security-advisories` is empty). Updates rely on manual pulls: developers or agents run `npx shadcn@latest add --diff [path]` to inspect drift against the current registry and either port changes by hand or overwrite with `-o` ([CLI docs](https://ui.shadcn.com/docs/cli.md)). Upstream security fixes in headless UI behavior still flow through versioned npm dependencies (`radix-ui`, `@base-ui-components/react`), not copied Tailwind wrappers.

### The Copenhagen Book and `auth.pilcrowonpaper.com`

Pilcrow's auth book ([archived `copenhagen`](https://github.com/pilcrowonpaper/copenhagen/blob/main/README.md), replaced by [`auth.pilcrowonpaper.com`](https://auth.pilcrowonpaper.com/)) has no push mechanism at all: corrections land as commits on `pilcrowonpaper/auth.pilcrowonpaper.com` and the Go example repos, discussed in GitHub Discussions and Discord. As of November 2026, `auth.pilcrowonpaper.com` also returns `404` on `/llms.txt`. Crucially, Pilcrow kept cryptographic and protocol primitives (Argon2/OAuth/WebAuthn helpers in Oslo and Arctic) as small, versioned libraries rather than asking users to copy raw crypto code ([Lucia Discussion #1714](https://github.com/lucia-auth/lucia/discussions/1714)).

### Cross-ecosystem takeaway on security updates

Across all five precedents, two mechanisms actually work for keeping owned auth code safe over time:

1. **Keep fragile cryptographic and protocol primitives in versioned dependencies** (hashing, constant-time comparison, OAuth/WebAuthn verification, signed/encrypted cookie helpers), and keep copied/bespoke code to thin, readable domain and SQL wiring.
2. **Make security advisories executable by an agent.** Historically, Phoenix's changelog diffs and Rails's generator commits failed to reach existing apps because humans rarely re-read generator diffs on every release. An agent ecosystem has a new option those frameworks lacked: shipping a version-locked **security changelog / audit skill** (`npx skills check` detects upstream skill updates in CI, and an updated audit skill instructs the coding agent to inspect the team's target auth system for newly published security checks, such as session invalidation on password reset or CSRF token rotation).

## 6. Implications for Butter v1

1. **Primary distribution stack: Agent-friendly docs site + Agent Skills + runnable Effect v4/Reylo reference repo.**
   - **Docs site:** Publish native Markdown via both `Accept: text/markdown` and `.md` URLs, a concise `/llms.txt` (v2 format with `Link:` `describedby` and `alternate` headers), and `/.well-known/agent-skills/index.json` (RFC v0.2.0) so any agent hitting the docs domain immediately discovers Butter's skills.
   - **Agent Skills (`agentskills.io` / `skills.sh`):** Package Butter's architecture decisions, implementation workflow, and security audit checklist as modular skills with progressive disclosure (`SKILL.md` <500 lines, flow-specific `references/*.md`, and verification `scripts/`). Teams pin exact Butter versions in `skills-lock.json` and check for guidance or security-audit updates with `npx skills check`.
   - **Runnable reference repo:** Maintain a CI-tested Effect v4 + Reylo + PostgreSQL reference app tagged in lockstep with Butter's skills and docs so agents can read verified code and adapt it to the target app's own schema, table names, and routes.
2. **Skip MCP and ShadCN registry as v1 primary channels.**
   - A ShadCN registry is optional at best for optional frontend login/signup UI forms later, not for Butter's core server/DB auth architecture.
   - An MCP server is unnecessary overhead for static guidance and reference code unless Butter later introduces a live hosted tool (for example, a remote compliance/test runner).
3. **Design the security-update loop from day one.**
   - Separate versioned cryptographic/protocol libraries (which get normal npm/Dependabot CVEs) from the agent-authored target auth system.
   - Maintain a structured, machine-readable security changelog and an updateable `butter-audit` skill so teams can detect new security guidance via `npx skills check` and have their coding agent audit and patch their bespoke target auth system on demand.
