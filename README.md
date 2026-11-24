# butter

Fresh start. Previous experiment wiped.

Vite+ monorepo scaffold (`vp create vite:monorepo`). Workspace packages are private starters — nothing is set up for publishing yet.

## Layout

- `apps/*` — applications (starter: `apps/website`)
- `packages/*` — shared libraries (starter: `packages/utils`)
- `tools/*` — tooling packages (empty for now)
- `.agents/` / `.claude/` — agent skills

## Development

Requires Node.js `>=22.18.0` and pnpm.

```bash
pnpm install          # or: pnpm exec vp install
pnpm exec vp run ready
pnpm exec vp run -r test
pnpm exec vp run -r build
pnpm exec vp run dev  # apps/website
```

See [Vite+ monorepo guide](https://viteplus.dev/guide/monorepo).
