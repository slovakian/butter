# Butter Auth (butter)

**Butter Auth** ("Butter") is an auth system you own. Instead of installing a library with one fixed model of auth, you copy security-critical auth code into your repo through a [shadcn registry](https://ui.shadcn.com/docs/registry), and your coding agent builds the rest for your stack, guided by Butter's Skills and checked by shipped Invariant tests.

**Guiding light:** [Pilcrow's Auth Book](https://auth.pilcrowonpaper.com/). Butter's defaults follow it, and its Skills point agents to it before they touch auth code.

- [Design](docs/design.md): what Butter is and what we are building
- [Glossary](GLOSSARY.md): the project's vocabulary
- [Architecture decisions](docs/adr)

This repo is a Vite+ monorepo configured with Oxlint, Oxfmt, Ultracite presets, and Anti-Slop AST rules.

## Toolchain & Stack

- **Toolchain**: [Vite+](https://viteplus.dev) (`vp`)
- **Linter & Formatter**: Oxlint & Oxfmt configured in [vite.config.ts](file:///Users/jason/dev/butter/vite.config.ts)
- **Presets**: [Ultracite](https://www.ultracite.ai) v8 (`ultracite/oxlint/core`, `ultracite/oxlint/vitest`, `ultracite/oxfmt`)
- **Anti-Slop**: Vendored Oxlint plugin under [tools/oxlint/anti-slop](file:///Users/jason/dev/butter/tools/oxlint/anti-slop)
- **Monorepo Structure**:
  - `apps/website`: Frontend application
  - `packages/utils`: Shared utilities package

## Development

- Run full check, tests, and build:

```bash
vp run ready
```

- Run formatting and lint checks:

```bash
vp check
```

- Run test suites:

```bash
vp run -r test
```

- Start development server:

```bash
vp run dev
```
