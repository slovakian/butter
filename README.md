# Butter Auth (butter)

Vite+ monorepo for **Butter Auth** ("Butter"), configured with Oxlint, Oxfmt, Ultracite presets, and Anti-Slop AST rules.

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
