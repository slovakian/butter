# Butter

Effect-native authentication library. A better-Auth alternative.

## Documentation

- [Docs index](./docs/README.md) — guides for humans and agents
- [Better Auth reference](./docs/better-auth-reference.md) — how agents should look up the [Better Auth](https://github.com/better-auth/better-auth) GitHub repo and [llms.txt](https://www.better-auth.com/llms.txt) docs when building Butter

## Packages

- `packages/butter` — the core library

## Tooling

This monorepo is scaffolded with [Vite+](https://viteplus.dev/) (`vp`), which unifies Vite, Vitest, Oxlint, Oxfmt, and tsdown. Lint/format presets come from [Ultracite](https://www.ultracite.ai/) (Oxlint + Oxfmt). The library is built on [Effect](https://effect.website/) v4 beta.

```bash
# Install the Vite+ CLI once: curl -fsSL https://vite.plus | bash
vp install
vp check
vp run -r test
vp run -r build
```
