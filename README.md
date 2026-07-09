# Butter

Effect-native authentication library. A better-Auth alternative.

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
