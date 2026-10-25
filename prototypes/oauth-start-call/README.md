# PROTOTYPE (throwaway): an OAuth start *Call* next to the start and callback Navigations

For [How do RPC apps get OAuth without feeling like a second setup?](https://github.com/slovakian/butter/issues/47). Never merged.

Question: if the `oauth` Slice's Contract declares the start as a **Call** (so `githubStart()` shows up on every derived client), as well as the start **link** (Navigation), what does that look like in practice, and what complexity does it bring?

Versions: `effect@4.0.6`, `@orpc/{contract,server,client}@2.0.0-beta.46`, TypeScript 5.9, Node 24.

```sh
pnpm install --ignore-workspace && npx tsc -p . && npx tsx src/demo.ts
```

## Layout

- `src/contract.ts`: the Contract (Effect `HttpApi`): `oauth.githubStart` (Call), `oauth.githubAuthorize` (start Navigation), `oauth.githubCallback` (Navigation), `session.me` (Call).
- `src/flows.ts`: the start Flow (shared by both start actions), the finish Flow, and a fake GitHub with real S256 PKCE.
- `src/edge.ts`: Butter-owned cookie Primitives (one copy for every door).
- `src/door-fetch.ts`: the fetch handler (`HttpApiBuilder`), also exported as a Layer.
- `src/door-effect-rpc.ts`: Contract → `RpcGroup` generator plus the Effect RPC door (with the cookie-bucket wrapper).
- `src/door-orpc.ts`: Contract → oRPC contract generator, nested under `auth` in the app's router.
- `src/app.ts`: the Host. `/auth/*` goes to the fetch handler, `/rpc/effect` to the app's Effect router (Butter routes merged in), `/rpc/orpc/*` to the app's `RPCHandler`.
- `src/browser.ts`: a fake browser (cookie jar with RFC 6265 Path rules, JS fetch, top-level navigation).
- `src/demo.ts`: the scenarios below.

## Results

| # | Scenario | Result |
|---|---|---|
| 1 | Start with a link: `urls.oauth.githubAuthorize(...)` | signed in, lands on `returnTo` |
| 2 | Start Call via Butter's `auth` client | reply `{ _tag: "AuthorizationRedirect", url }`, then `location.assign(url)`, signed in |
| 3 | Start Call via Effect RPC (`c["oauth.githubStart"]`) | signed in |
| 4 | Start Call via the app's oRPC client (`client.auth.oauth.githubStart`) | signed in |
| 5 | Rate limited before leaving | typed `RateLimited { retryAfterSeconds }` on all three clients; the link can only bounce to `/login?error=RateLimited` |
| 6 | Pending cookie without an explicit `Path` | **fetch handler works by luck** (default-path `/auth/oauth/github` covers the callback); **Effect RPC and oRPC break** (`Path=/rpc/...`), so the callback reports `OAuthStateMismatch` |
| 7 | App's `RPCHandler` lacks `ResponseHeadersPlugin` | Butter's procedure fails closed (500) instead of silently setting no cookie |
| 8 | Two tabs start before either finishes | the second start overwrites the single pending cookie, so the first tab fails with `OAuthStateMismatch`. This was already true with links alone. |
| 9 | Effect RPC client sends a message-level header | it **overrides** the real request header with the same name |

The reply never contains `state` or the PKCE verifier. Those travel only in an `HttpOnly` cookie.

## Findings

1. **The start Call is cheap at the Contract level.** One extra endpoint, one shared Flow, and the generators put it on every client with no per-client code. Typed errors before leaving the page work on all three clients.
2. **Naming is a real decision.** An `HttpApi` group can't hold two endpoints with one id, and the two kinds need different methods (`POST` Call, `GET` Navigation). So the Call and the link need two ids and two paths (`githubStart` / `githubAuthorize` here).
3. **A second kind of cookie effect.** So far only the Session effect set cookies. The start Call adds `oauthPending`, so the Contract annotation must say which cookie effect a reply carries, and every door must apply it.
4. **Effect RPC handlers can't touch the HTTP response.** `RpcServer` runs handlers on its own fibers, and they get `{ payload, headers }`, never `HttpServerRequest`. Butter's Effect RPC door therefore needs a wrapper around the RPC route (a per-request "cookie bucket"), and it only works with a buffering serialization (JSON); a streaming serialization would start the response before handlers finish. **This applies to every Session-setting Call on Effect RPC, not just this one;** the start Call only exposed it.
5. **Effect RPC message headers override request headers** (`message.headers = requestHeaders.concat(message.headers)` in `RpcServer.js`). So anything security-relevant (the Origin check, cookies, the bucket id) must be read at the HTTP wrapper, never from the handler's `headers`, or a page can forge `origin` inside the body. **This is also a door-wide finding, not OAuth-specific.**
6. **oRPC cookie setting depends on user-owned config.** `ResponseHeadersPlugin` and `RequestHeadersPlugin` must be on the app's `RPCHandler`. Butter fails closed if they're missing, and the Setup Prompt must add them (already needed for Session cookies).
7. **Cookie `Path` must be explicit (`Path=/`, or the callback's path).** Without it the bug hides on the fetch handler and shows only on RPC doors. That's the case for an Exposure Invariant that starts through every door and finishes through the fetch handler.
8. **One pending-cookie slot breaks parallel tabs.** This is independent of the Call. A fix is a cookie keyed by `state` (e.g. `butter_oauth_<first 8 chars>`); it belongs to the `oauth` Slice's design, not to this question.
9. The generator typing trap from earlier prototypes came back: `any` in `HttpApiEndpoint`'s 11 slots silently fails to match, so the oRPC contract came out `{}` until every slot used `infer`. The Effect RPC tag union was checked: exactly `"oauth.githubStart" | "session.me"`.
