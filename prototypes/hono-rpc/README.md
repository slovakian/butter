# Hono RPC from the Contract (throwaway)

For https://github.com/slovakian/butter/issues/36. `npm i && npx tsc -p . && node --experimental-strip-types proto.ts`.

- proto.ts: Contract (HttpApi) -> Hono Schema type via ~25 lines of mapped types; `hc` fully typed, no route spelled out.
- proto2.ts: same types, runtime is the plain fetch handler behind `app.all("/*")`.
- big/: 40 endpoints, check time 0.26s.

Versions: hono 4.13.14, effect 4.0.6, typescript 5.9.3.
