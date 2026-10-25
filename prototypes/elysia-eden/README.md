# Elysia Eden from the Contract (throwaway)

Same trick as ../hono-rpc: Contract -> Elysia `Routes` tree via `CreateEden`, runtime = fetch handler behind `.all("/*")`, retyped with the Contract routes. Run from ../hono-rpc after `npm i elysia @elysiajs/eden` (elysia 1.4.30, eden 1.4.9).

## Elysia 2.0.0-rc.0

`elysia-agnostic.ts` retypes only the `~Routes` property (no positional generics), so one file typechecks and runs on 1.4.30 and 2.0.0-rc.0. On 2.0 RC, Eden 1.4.9 (latest; no 2.x Eden yet, needs --legacy-peer-deps) types paths and inputs but loses every response type, including the app's own native routes; its `treaty` is typed against Elysia 1's 7 generics, and 2.0 added an 8th (`Scope`). 2.0 route tree shape is unchanged apart from an added `error` key. 2.0 also moved hooks before the handler: `.post(path, hook, handler)`.
