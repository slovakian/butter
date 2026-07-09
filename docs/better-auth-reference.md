# Better Auth reference for agents

This guide describes how AI agents should look up [Better Auth](https://github.com/better-auth/better-auth) when working on Butter. Better Auth is the primary upstream reference for API shape, feature scope, and auth patterns that Butter aims to provide in an Effect-native way.

## Quick links

| Resource | URL |
|----------|-----|
| GitHub repository | https://github.com/better-auth/better-auth |
| Documentation site | https://www.better-auth.com/docs |
| LLM documentation index | https://www.better-auth.com/llms.txt |
| Issues | https://github.com/better-auth/better-auth/issues |
| Pull requests | https://github.com/better-auth/better-auth/pulls |

## Recommended lookup order

1. **Start with `llms.txt`** — lightweight table of contents; pick only the pages you need.
2. **Fetch individual LLM pages** — one topic at a time, low token cost.
3. **Clone the GitHub repo** — when you need source code, types, tests, or implementation details not covered by docs.
4. **Use the Better Auth MCP server** — when your environment supports MCP and you want searchable docs without manual fetching.

## Option 1: LLM-friendly docs (`llms.txt`)

Better Auth publishes an [llms.txt](https://www.better-auth.com/llms.txt) index following the [llms.txt convention](https://llmstxt.org/). The index is a categorized table of contents — not the full documentation — so it stays small enough for agent context windows.

### Fetch the index

```bash
curl -fsSL https://www.better-auth.com/llms.txt
```

### Fetch a specific page

Each entry in the index maps to a markdown page under the `llms.txt` path. Convert a docs path to an LLM page URL like this:

```
https://www.better-auth.com/llms.txt/docs/<category>/<slug>.md
```

Examples:

| Topic | LLM page URL |
|-------|----------------|
| API (server endpoints) | https://www.better-auth.com/llms.txt/docs/concepts/api.md |
| Session management | https://www.better-auth.com/llms.txt/docs/concepts/session-management.md |
| Database adapters | https://www.better-auth.com/llms.txt/docs/concepts/database.md |
| OAuth providers | https://www.better-auth.com/llms.txt/docs/concepts/oauth.md |
| Plugins | https://www.better-auth.com/llms.txt/docs/concepts/plugins.md |
| Installation | https://www.better-auth.com/llms.txt/docs/installation.md |

```bash
# Example: fetch the session management doc
curl -fsSL https://www.better-auth.com/llms.txt/docs/concepts/session-management.md
```

### When to use `llms.txt`

- Understanding Better Auth concepts, configuration, and public API
- Comparing Butter's planned API against Better Auth's documented behavior
- Low token budget — fetch one page instead of cloning the whole repo

### When not to use `llms.txt`

- You need exact TypeScript types, internal implementation, or test fixtures
- You are debugging edge cases that may differ between docs and source

## Option 2: Clone and read the GitHub repository

For implementation-level work, clone the upstream repo and read source directly.

```bash
git clone --depth 1 https://github.com/better-auth/better-auth.git /tmp/better-auth
```

Shallow clone is usually enough. Omit `--depth 1` if you need full git history.

### Key paths in the repository

| Path | Contents |
|------|----------|
| `packages/better-auth/` | Core library source |
| `packages/better-auth/src/` | Main implementation (plugins, adapters, API routes) |
| `docs/content/docs/` | Documentation source (`.mdx` files) |
| `packages/cli/` | Better Auth CLI (`npx auth`) |
| `demo/` | Example applications |

### Read docs from the repo (raw GitHub)

If cloning is not practical, fetch individual doc files from GitHub:

```
https://raw.githubusercontent.com/better-auth/better-auth/main/docs/content/docs/<path>.mdx
```

Example:

```bash
curl -fsSL https://raw.githubusercontent.com/better-auth/better-auth/main/docs/content/docs/concepts/api.mdx
```

Note: repo docs are `.mdx` (with frontmatter and MDX components). The `llms.txt` pages are pre-processed markdown that is easier for agents to consume.

### Read source from the repo (raw GitHub)

```
https://raw.githubusercontent.com/better-auth/better-auth/main/packages/better-auth/src/<path>
```

Use ripgrep or your editor's search across the cloned tree to find implementations:

```bash
rg "session" /tmp/better-auth/packages/better-auth/src --glob "*.ts"
```

### When to clone the repo

- Implementing a Butter feature that mirrors Better Auth behavior
- Verifying types, exports, and plugin interfaces
- Reading tests for expected behavior
- Tracing how an endpoint is wired (routes, hooks, database adapters)

## Option 3: Better Auth documentation MCP server

Better Auth also ships a documentation MCP server for MCP-capable clients (Cursor, Claude Code, etc.). This can replace manual `curl` fetches when the server is configured in your environment.

```bash
npx auth@latest mcp --cursor
```

See the [MCP documentation](https://www.better-auth.com/llms.txt/docs/ai-resources/mcp.md) for setup per client.

## Mapping Better Auth concepts to Butter

When researching upstream, focus on areas Butter is likely to implement or compare against:

| Better Auth area | Typical doc path | Butter relevance |
|------------------|------------------|------------------|
| Core API | `docs/concepts/api.md` | Server-side auth API design |
| Sessions | `docs/concepts/session-management.md` | Session lifecycle, cookies, storage |
| Database | `docs/concepts/database.md` | Schema, adapters, migrations |
| OAuth / social | `docs/concepts/oauth.md`, `docs/authentication/` | Provider integrations |
| Plugins | `docs/concepts/plugins.md`, `docs/plugins/` | Extensibility model |
| Client | `docs/concepts/client.md` | Client SDK patterns |
| Hooks | `docs/concepts/hooks.md` | Request/response customization |
| TypeScript | `docs/concepts/typescript.md` | Type inference, additional fields |

Butter uses Effect instead of Better Auth's runtime. Treat Better Auth as a **behavioral and API reference**, not code to copy verbatim.

## Agent workflow checklist

When implementing or reviewing Butter auth features:

- [ ] Read the relevant `llms.txt` page(s) for the feature area
- [ ] If behavior is unclear, locate the implementation in `packages/better-auth/src/`
- [ ] Note Better Auth's public API surface (config options, endpoints, plugin hooks)
- [ ] Design the Effect-native equivalent in Butter (`packages/butter/`)
- [ ] Document intentional differences from Better Auth in code comments or ADRs under `docs/decisions/` if the divergence is significant

## Version and freshness

Better Auth evolves quickly. Prefer `llms.txt` and the live docs site for current public API. When cloning, use `main` for the latest upstream behavior unless you are explicitly matching a pinned Better Auth version.
