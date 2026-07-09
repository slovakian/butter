# Butter

Effect-native authentication library. A better-Auth alternative.

## Agent instructions

- **[AGENTS.md](./AGENTS.md)** — how agents should work in this repo, including the permanent Better Auth [Understand Anything](https://github.com/Egonex-AI/Understand-Anything) knowledge graph under [`.understand-anything/`](./.understand-anything/)

## Packages

- `packages/butter` — the core library

## Better Auth reference graph

This repo commits an Understand Anything analysis of upstream Better Auth (`packages/better-auth`) so agents can explore auth architecture without re-cloning or re-analyzing from scratch. See [AGENTS.md](./AGENTS.md) for access instructions.

## Tooling

This monorepo is scaffolded with [Vite+](https://viteplus.dev/) (`vp`), which unifies Vite, Vitest, Oxlint, Oxfmt, and tsdown. Lint/format presets come from [Ultracite](https://www.ultracite.ai/) (Oxlint + Oxfmt). The library is built on [Effect](https://effect.website/) v4 beta.

```bash
# Install the Vite+ CLI once: curl -fsSL https://vite.plus | bash
vp install
vp check
vp run -r test
vp run -r build
```
