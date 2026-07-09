# AGENTS.md

Instructions for AI agents working in the **Butter** monorepo.

Butter is an Effect-native authentication library positioned as a [Better Auth](https://github.com/better-auth/better-auth) alternative. When implementing Butter features, treat Better Auth as the primary upstream reference for API shape, feature scope, and auth patterns — then translate those patterns into Effect.

---

## Permanent fixture: Better Auth knowledge graph

This repo ships a committed [Understand Anything](https://github.com/Egonex-AI/Understand-Anything) knowledge graph of upstream Better Auth. **Do not treat it as disposable scratch output.** It is the default way agents explore Better Auth architecture inside this monorepo.

| Artifact | Path | Purpose |
|----------|------|---------|
| Knowledge graph | [`.understand-anything/knowledge-graph.json`](./.understand-anything/knowledge-graph.json) | Nodes, edges, layers, and guided tour for `better-auth` |
| Run metadata | [`.understand-anything/meta.json`](./.understand-anything/meta.json) | Upstream commit, file count, purpose |
| Fingerprints | [`.understand-anything/fingerprints.json`](./.understand-anything/fingerprints.json) | Structural baseline for incremental re-analysis |
| Ignore rules | [`.understand-anything/.understandignore`](./.understand-anything/.understandignore) | What was excluded (tests, etc.) |
| Output language | [`.understand-anything/config.json`](./.understand-anything/config.json) | Graph text locale (`en`) |

**Source analyzed:** [`better-auth/better-auth`](https://github.com/better-auth/better-auth) → `packages/better-auth` (see `meta.json` for the exact upstream commit).

**Scale (current graph):** ~294 files · ~779 nodes · ~1782 edges · 8 layers · 10 tour steps. Test files were excluded via `.understandignore`.

### What the graph covers

Architectural layers in the graph:

1. **Auth Core** — factory, public entry points, instance wiring
2. **API Layer** — HTTP endpoints, middleware, dispatch, rate limiting
3. **Runtime Support** — context, cookies, crypto, OAuth helpers, types, utils
4. **Data & Adapters** — DB schema helpers; Drizzle / Kysely / Prisma / Mongo / memory adapters
5. **Client SDKs & Integrations** — client SDK + React / Vue / Svelte / Solid / framework integrations
6. **Social Providers** — built-in social OAuth provider definitions
7. **Plugins** — 2FA, organization, admin, JWT, magic-link, OIDC, captcha, and more
8. **Docs & Tooling** — package docs and build/test config

Guided tour order (see `tour` in the graph): Project Overview → Public Entry Point → Auth Factory Core → API Routes & Dispatch → Runtime Context / Cookies / Crypto → Database Layer & Adapters → Client SDK & Framework Bindings → Social OAuth Providers → Plugin Ecosystem → Build & Test Tooling.

---

## How to access the graph (required workflow)

### 1. Prefer the committed graph — do not rebuild casually

1. Confirm the fixture exists: `.understand-anything/knowledge-graph.json`
2. Read `.understand-anything/meta.json` for upstream commit and scope
3. **Never** load the entire `knowledge-graph.json` into context — it is large
4. Use targeted search (Grep / `rg`) against the JSON for names, summaries, tags, and node IDs
5. Follow edges (`imports`, `contains`, `calls`, `depends_on`, …) only for the matched subgraph
6. Use `layers` and `tour` for architecture orientation and learning order

Node IDs look like `file:src/auth/base.ts`, `function:src/api/dispatch.ts:…`, `config:package.json`, `document:README.md`.

### 2. Use Understand Anything skills (installed in this repo)

Skills live under `.agents/skills/` (symlinked into Cursor / Claude / Pi). Plugin source: `vendor/understand-anything/`.

| Skill | When to use |
|-------|-------------|
| `/understand-chat` | Ask questions about Better Auth architecture using the graph |
| `/understand-explain` | Deep-dive a specific file, function, or module from the graph |
| `/understand-onboard` | Generate an onboarding guide from layers + tour |
| `/understand-dashboard` | Launch the interactive graph dashboard (points at this repo’s `.understand-anything/`) |
| `/understand-diff` | Map a git/PR diff onto graph components and risk |
| `/understand-domain` | Derive domain/flow views from the existing graph |
| `/understand` | Full re-analysis — **only** when intentionally refreshing the fixture (see below) |

In Cursor, invoke these as agent skills named `understand-chat`, `understand-explain`, etc.

### 3. Lookup order when building Butter features

1. **This knowledge graph** — structure, modules, plugins, adapters, call/import relationships
2. **Better Auth `llms.txt` docs** — concepts and public API prose ([llms.txt](https://www.better-auth.com/llms.txt))
3. **Clone / read upstream source** — types, tests, edge-case implementation details
4. **Butter package** — `packages/butter` (Effect-native implementation target)

Graph `filePath` values are relative to upstream `packages/better-auth` (e.g. `src/api/routes/session.ts`), **not** paths inside Butter. Map concepts to Effect in `packages/butter`; do not copy Better Auth code verbatim unless that is explicitly the task.

---

## Keeping the fixture permanent

Committed and should remain on `main`:

- `.understand-anything/knowledge-graph.json`
- `.understand-anything/meta.json`
- `.understand-anything/fingerprints.json`
- `.understand-anything/config.json`
- `.understand-anything/.understandignore`

Gitignored scratch (safe to delete; regenerate on re-analysis):

- `.understand-anything/intermediate/`
- `.understand-anything/tmp/`
- `.understand-anything/diff-overlay.json`
- `.understand-anything/.trash-*/`

**Do not delete or empty the committed graph** as routine cleanup. If a refresh is needed, re-run `/understand` against a checkout of `better-auth` `packages/better-auth`, copy the new artifacts into this repo’s `.understand-anything/`, update `meta.json`, and commit.

---

## Repo map (Butter)

| Path | Role |
|------|------|
| `packages/butter` | Effect-native auth library (implementation target) |
| `.understand-anything/` | Committed Better Auth knowledge graph (this fixture) |
| `.agents/skills/` | Agent skills (addyosmani + Understand Anything + handoff) |
| `vendor/understand-anything/` | Understand Anything plugin submodule |
| `.cursor-plugin/plugin.json` | Cursor plugin entry for Understand Anything |

### Tooling

```bash
# Install Vite+ CLI once: curl -fsSL https://vite.plus | bash
vp install
vp check
vp run -r test
vp run -r build
```

Submodule (needed for Understand Anything skills/dashboard):

```bash
git submodule update --init --recursive
```
