# How contract-first libraries derive HTTP routes, RPC, and clients from one definition

Research for [How do contract-first libraries derive HTTP routes, RPC, and clients from one definition?](https://github.com/slovakian/butter/issues/38). It feeds [Is every Exposure derived from a runtime contract on exposable?](https://github.com/slovakian/butter/issues/39) and builds on the findings in [Does Butter ship Exposure code, or only guidance?](https://github.com/slovakian/butter/issues/33) (the Effect RPC cookie finding and the Better Auth source reading), which are not repeated here.

Researched 2026-10-25. Every claim below was read from the **published npm tarball** (`npm pack`) of the version listed, not from a repo branch. Paths are relative to the package root.

| Package | Version checked | Published | Dist-tag status |
| --- | --- | --- | --- |
| `effect` (`effect/http-api`, `effect/rpc`, `effect/http`, `Schema`) | 4.0.6 | 2026-10-22 | `latest` |
| `@orpc/contract`, `@orpc/server`, `@orpc/client`, `@orpc/openapi`, `@orpc/effect` | 2.0.0-beta.46 | 2026-10-24 | `beta` (`latest` is still 1.16.1; `@orpc/effect` only exists as v2) |
| `@ts-rest/core`, `@ts-rest/serverless` | 3.52.1 (also read 3.53.0-rc.1) | 2025-03-04 (rc 2025-06-02) | `latest`; nothing published since the rc |
| `hono` | 4.13.13 | 2026-10-04 | `latest` |
| `@hono/standard-validator` | 0.4.0 (version only) | | `latest` |
| `@trpc/server`, `@trpc/client` | 11.19.0 | 2026-09-16 | `latest` |
| `better-auth` | 1.7.12 | | `latest` |

Two throwaway runtime checks (Node 24.22.1) back the load-bearing claims. Their output is in the [appendix](#appendix-runtime-checks).

## Summary

1. **Two families.** *Runtime-contract* libraries (Effect `HttpApi`, Effect RPC, oRPC contract-first, ts-rest) keep a value that describes each operation (schemas, method, path, errors) and build the server router, the client and OpenAPI from that value. *Type-only* libraries (tRPC, Hono RPC, oRPC router-first, Better Auth) let the client import only the **type** of the server, and the client is a `Proxy` that turns property names into URLs.
2. **One Effect Schema can feed all three Butter targets.** The same `Schema.Struct` and `Schema.TaggedError` values went into an `HttpApiEndpoint`, an `Rpc.make`, and an oRPC contract (through `@orpc/effect`) in one process, and all three decoded input, encoded output and returned the typed error (verified at runtime). What is shared is the *schemas*, not the *operation*: `HttpApi` and `RpcGroup` have no bridge to each other in 4.0.6, so something (the user, or Butter) still has to write or generate both declarations.
3. **The Effect Schema → oRPC bridge is decode-only.** `@orpc/effect` monkey-patches oRPC's `.input()`/`.output()` to wrap Effect schemas with `Schema.toStandardSchemaV1`, which is `StandardSchemaV1<Encoded, Type>`: it only decodes. oRPC runs that same decode on handler **output**, so for a schema with a transformation (e.g. `NumberFromString`) the oRPC handler must return the *encoded* form, while the Effect RPC and `HttpApi` handlers return the *decoded* form. Plain structural schemas behave the same everywhere.
4. **Navigations (redirects, OAuth callback, Apple `form_post`) only fit HTTP-shaped contracts.** Effect `HttpApi` can *declare* a 302 with a `location` header in the contract (verified, and it shows up in OpenAPI) and accepts `application/x-www-form-urlencoded` payloads (verified with an Apple-style POST). oRPC's `OpenAPIHandler` does the same with `outputStructure: "detailed"` (verified). ts-rest declares responses by status code, so `302` is declarable. **Effect RPC and oRPC's `RPCHandler` cannot express a navigation at all:** they are a single POST endpoint speaking their own wire format. No library treats "navigation" as a separate *kind* of operation; it is always "an HTTP endpoint whose success is a redirect".
5. **Better Auth's Apple `form_post` trick is worth copying.** Its callback endpoint accepts `POST`, and if the method is POST it immediately redirects to the same path as `GET` with the fields moved to the query string. This makes the browser come back with a top-level GET, which carries `SameSite=Lax` cookies (the OAuth `state` cookie) that a cross-site POST would not.
6. **Cookies and response headers are a side channel everywhere** except `HttpApi`/oRPC-OpenAPI "detailed" outputs, where headers can be part of the declared success. Effect: `HttpEffect.appendPreResponseHandler` (works in both `HttpApi` and RPC-over-HTTP); oRPC: `ResponseHeadersHandlerPlugin` + `context.resHeaders` (works on both RPC and OpenAPI handlers); ts-rest: `responseHeaders`; tRPC: `resHeaders` in the fetch adapter's context; Hono: `c.header`/`setCookie`.
7. **Errors are declared per operation in the runtime-contract libraries** (Effect: error schemas with an `httpApiStatus` annotation; oRPC: `.errors({ CODE: { status, data } })`; ts-rest: extra status codes in `responses`) and arrive typed on every door. tRPC and Hono do not declare errors per procedure.
8. **Escape hatches all live inside the same router.** Effect `HttpApi`: `handleRaw` and returning a raw `HttpServerResponse` from any handler; oRPC: `detailed` output and ordinary fetch routing in front of the handler; ts-rest/Hono/tRPC: the host framework's own routes. None of them offers "an operation the contract cannot describe" as a named concept: you leave the contract and write a plain route.
9. **Cross-module behavior is never by path string in the runtime-contract libraries.** Middleware is attached to a group or a builder and typed. The gap they do have is **ordering**: in both `HttpApiGroup.middleware` and `RpcGroup.middleware`, operations added *after* the call do not get the middleware (documented as a gotcha). Hono middleware and Better Auth hooks match path strings, so a new path that is not in the pattern silently skips them.
10. **Bundle safety is a convention, never a check.** Effect's own docs say API definitions should "always be separate from the server implementation"; oRPC ships `minifyRouterContract` to strip a contract before sending it to the client. No library ships a test or lint that fails when server code leaks into the client bundle.
11. **Stability.** Effect `Schema` is `@stability stable` in 4.0.6; `effect/http-api`, `effect/rpc` and `effect/http` are `@stability unstable`. oRPC v2 is a beta. ts-rest has had no stable release since March 2025. Hono and tRPC are stable.

## Effect `HttpApi` (`effect@4.0.6`)

**Shape.** `HttpApi.make(id).add(HttpApiGroup.make(name).add(HttpApiEndpoint.post(id, path, { params, query, headers, payload, success, error })))`. The module header says endpoints are "declarations, not handlers: builders use them to decode requests, type handler input, encode responses, generate OpenAPI metadata, and derive generated-client call signatures" (`src/http-api/HttpApiEndpoint.ts` L1-L13). Handlers are attached with `HttpApiBuilder.group(Api, "group", (handlers) => handlers.handle(...))` (`src/http-api/HttpApiBuilder.ts` L133, L322-L390); a missing handler is a type error (`Endpoint not handled: …`, L300-L306). `HttpRouter.toWebHandler` turns the result into a `Request → Response` function.

**Browser vs server.** The client is built from the runtime `Api` value: `HttpApiClient.make(api, { baseUrl })` (`src/http-api/HttpApiClient.ts` L597-L615). So the browser bundles the schemas. Effect's own walkthrough says: "Api definitions should **always** be seperate from the server implementation, so that they can be shared between the server and client without leaking server code into clients. Ideally, the would use a seperate package in a monorepo." (`ai-docs/src/51_http-server/10_basics.ts` L12-L15). That is the only protection; there is no check.

**Navigations.** First-class enough:
- A redirect can be **declared**: `success: HttpApiSchema.WithHeaders(HttpApiSchema.Empty(302), { location: Schema.String })`, and the handler returns `HttpApiSchema.withHeaders({ body: undefined, headers: { location } })`. Verified at runtime (302 + `location`), and `OpenApi.fromApi` documents the 302 with a required `location` header ([appendix](#appendix-runtime-checks)). `WithHeaders` is documented in `src/http-api/HttpApiSchema.ts` L770-L830; `Empty(code)` at L167; `status(code)` at L137-L160.
- A handler may also return any `HttpServerResponse` instead of the declared success: the `Handler` type is `Effect<SuccessType | HttpServerResponse, …>` (`src/http-api/HttpApiEndpoint.ts` L684-L708). `HttpServerResponse.redirect(url, { status: 302 })` worked (verified), but then the contract and OpenAPI no longer describe the response.
- Apple `form_post`: payloads can be `application/x-www-form-urlencoded` via `HttpApiSchema.asFormUrlEncoded()` (`src/http-api/HttpApiSchema.ts` L1221-L1236; the builder decodes it at `src/http-api/HttpApiBuilder.ts` L741-L841). Verified with a POST of `code=…&state=…`.
- Links: `HttpApiClient.urlBuilder(Api, { baseUrl })` builds the URL for a GET endpoint without calling it (`src/http-api/HttpApiClient.ts` L760-L800), which is what an email link or "Sign in with Google" `<a href>` needs.

**Cookies and headers.** `HttpApiBuilder.securitySetCookie` is a thin wrapper over `HttpEffect.appendPreResponseHandler` + `HttpServerResponse.setCookie`, defaulting to `secure` and `httpOnly` (`src/http-api/HttpApiBuilder.ts` L607-L631). The general form works from any handler (verified: `session=abc; Path=/; HttpOnly`). Response headers can also be part of the declared success via `WithHeaders`.

**Errors.** Error schemas carry their status: `Schema.TaggedError<…>()("UserNotFound", {}, { httpApiStatus: 404 })` (`ai-docs/src/51_http-server/fixtures/domain/UserErrors.ts`), or `HttpApiSchema.status(n)`. `HttpApiError` ships standard ones (`BadRequest`, `Unauthorized`, …, each with a `NoContent` variant; `src/http-api/HttpApiError.ts`). On the wire the error is the encoded schema at that status (verified: `401 {"_tag":"InvalidCredentials"}`); the client decodes by status back into the typed error.

**Escape hatches.** `handleRaw` skips payload decoding and gives the raw request (`src/http-api/HttpApiBuilder.ts` L372-L390), and any handler can return a raw response (above). Outside the contract, the same `HttpRouter` takes plain routes, which is how Better Auth's docs mount it (`HttpRouter.add("*", "/api/auth/*", HttpEffect.fromWebHandler(auth.handler))`, per the exposure-mounting research).

**Cross-module behavior.** Middleware is a typed service (`HttpApiMiddleware.Service`) that can `provides` a service (e.g. `CurrentUser`), declare its own `error`, and attach security schemes (`ai-docs/src/51_http-server/fixtures/api/Authorization.ts`). It is attached with `.middleware(Tag)` on an endpoint or a group. Gap: "Endpoints added after this method is called do not have the middleware applied" (`src/http-api/HttpApiGroup.ts` L91-L95). The type system softens this: a handler that needs `CurrentUser` only type-checks when middleware that provides it is attached (by design of the `provides` mechanism; not runtime-tested here).

**Stability.** Every export is `@stability unstable` (e.g. `src/http-api/HttpApiEndpoint.ts` L12).

## Effect RPC (`effect@4.0.6`)

**Shape.** `Rpc.make(tag, { payload, success, error, stream })` (`src/rpc/Rpc.ts` L928-L990) collected into `RpcGroup.make(...)`; handlers via `group.toLayer({ Tag: (payload, { headers }) => … })` (`src/rpc/RpcGroup.ts` L97, L335; handler options include request `headers`, `src/rpc/Rpc.ts` L662-L667). Served with `RpcServer.layerHttp({ group, path, protocol: "http" })` (`src/rpc/RpcServer.ts` L937-L975). The module header: "Clients and servers read the same declaration, so the procedure contract is independent of the transport" (`src/rpc/Rpc.ts` L1-L13).

**Browser vs server.** Like `HttpApi`, the client needs the runtime `RpcGroup` value (schemas). A definition file that imports only `effect` is safe to share; handlers live in a separate `toLayer` file. No shipped check.

**Navigations.** Not expressible. The HTTP protocol is one POST route carrying serialized request messages (verified wire: `[{"_tag":"Exit","requestId":"1","exit":{"_tag":"Success",…}}]`). There is no per-operation method, path or status, so an OAuth provider or an email link cannot call an RPC. A navigation needs an `HttpApi` endpoint or a plain `HttpRouter` route next to it.

**Cookies.** Covered in the earlier finding: `appendPreResponseHandler` works over the HTTP protocol, not WebSocket.

**Errors.** Each `Rpc` has an `error` schema (and a `defect` schema); the result is sent as an encoded `Exit`, and the client gets the typed failure in the Effect error channel. No HTTP status is involved.

**Escape hatches.** `Rpc.custom` lets you build your own `Rpc` constructor that rewrites success/error schemas (`src/rpc/Rpc.ts` L1003-L1060), useful for a house style (e.g. adding a shared error to every Rpc). Anything not shaped like a call goes outside RPC.

**Cross-module behavior.** `RpcMiddleware.Service` mirrors `HttpApiMiddleware`. Same ordering gap: `RpcGroup.middleware` adds "middleware to all the procedures added to the group until this point" (`src/rpc/RpcGroup.ts` L66-L68, implemented L297-L300).

**Reuse with `HttpApi`.** No bridge in either direction: nothing in `src/http-api/` imports `src/rpc/` or the reverse. Both take the same `Schema` values, so the *schemas* are shared and the *declarations* are written twice (or generated). Verified: the same `SignInInput` (with a `NumberFromString` field), `SessionOut` and `InvalidCredentials` drove both servers.

**Stability.** `@stability unstable` throughout (`src/rpc/RpcGroup.ts` L9 etc.).

## oRPC contract-first (2.0.0-beta.46)

**Shape.** `oc.input(schema).output(schema).errors({...})` builds a procedure contract; a plain object of them is a router contract. `implement(contract)` returns an implementer whose procedures must match the contract (`@orpc/server dist/index.d.mts` L431-L441); `os.router({...})` is type-checked against it. HTTP routing (`method`, `path`, `successStatus`, `inputStructure`, `outputStructure`) comes from `@orpc/openapi`, which adds `.route(meta)` by **augmenting oRPC's builder prototypes** through a side-effect import, `import "@orpc/openapi/extensions/route"` (`@orpc/openapi dist/extensions/route.d.mts`). Two handlers serve the same router: `RPCHandler` (oRPC's own POST wire format, ignores `route`) and `OpenAPIHandler` (REST by `route`).

**With Effect (`@orpc/effect`).** Also prototype patching: `import "@orpc/effect/extensions/input-output"` replaces `ContractBuilder.prototype.input/output` and `Builder.prototype.input/output` so that any `Schema.isSchema` value is first wrapped with `Schema.toStandardSchemaV1` (`@orpc/effect dist/extensions/input-output.mjs`, whole file). `import "@orpc/effect/extensions/effect"` adds `.effect(handler)` to builders (`dist/extensions/effect.mjs`). The main entry adds `createEffectClient` (wraps each client call in `Effect.tryPromise`), `EffectSchemaToJsonSchemaConverter` for OpenAPI, and `catchORPCError*` helpers (`dist/index.mjs`, `dist/index.d.mts` L177-L178).

**The decode-only caveat.** `Schema.toStandardSchemaV1` returns `StandardSchemaV1<S["Encoded"], S["Type"]>` (`effect src/Schema.ts` L1389-L1398, `@stability stable`). oRPC validates input *and output* with `schema["~standard"].validate(value)` (`@orpc/server dist/shared/server.BB464y-6.mjs` L74-L110). So the server decodes the handler's return value: with a transforming schema the handler must return the encoded form. In Effect RPC and `HttpApi` the handler returns the decoded form and the library encodes it. A Butter-generated oRPC router over Effect schemas has to either restrict contract schemas to non-transforming ones on the output side, or encode the Flow result before returning it. (Read from source; the runtime check only used a transform on the input side.)

**Browser vs server.** Two options. With `RPCLink` the client is a `Proxy` and needs only the **type** `ContractRouterClient<typeof contract>`; the runtime contract never reaches the browser. With `OpenAPILink` the client needs the contract at runtime (`constructor(router: RouterContract, …)`, `@orpc/openapi dist/adapters/fetch/index.d.mts` L32-L34), and oRPC ships `minifyRouterContract` "so it can be safely exported to the client without exposing internal logic" (`@orpc/contract dist/index.d.mts` L121-L129). `createContractClientFactory` builds clients from individual contracts so large apps need not import a single root (L226-L234). Because routing and Effect support arrive as prototype patches, a contract file only behaves correctly if the side-effect imports ran first, in every bundle that uses it.

**Navigations.** Only through `OpenAPIHandler`. `outputStructure: "detailed"` lets the handler return `{ status, headers, body }` with status 200–399 (`@orpc/openapi dist/shared/openapi.B_SoJfYz.d.mts` L221-L263). Verified: a GET `/callback` returned 302 with `location`. `OpenAPIHandler` also accepted a form-encoded POST body (verified), so Apple `form_post` fits. The client side refuses redirects: `RPCLink`/`OpenAPILink` send `redirect: "manual"` and throw "Unexpected redirect response: redirects are not followed." on an opaque redirect (`@orpc/client dist/adapters/fetch/index.mjs` L48, L58-L60). So navigations are reached by plain links, not by the client.

**Cookies.** `ResponseHeadersHandlerPlugin` injects `context.resHeaders` (`@orpc/server dist/plugins/index.d.mts` L330-L352) and `@orpc/server/helpers` has `setCookie`/`getCookie`/`deleteCookie`/`sign`/`encrypt` (`dist/helpers/index.d.mts` L59-L166). Verified on the RPC handler (`set-cookie: session=abc; Path=/; HttpOnly`). There is also `GetMethodCsrfProtectionHandlerPlugin`, which blocks cross-site GETs and requires `SameSite=Lax`/`Strict` auth cookies (L170-L195).

**Errors.** `.errors({ INVALID_CREDENTIALS: { status: 401, data?: schema } })`; the handler throws `errors.INVALID_CREDENTIALS()`. On the RPC client it arrives as an `ORPCError` with `code` and `defined: true` (verified). Over OpenAPI it is a JSON body at that status.

**Escape hatches and cross-module behavior.** Middleware is `.use()` on a builder/implementer and applies to procedures built from it; it is typed, not path-matched. Anything outside the contract is a route in the host's fetch router before or after the oRPC handler.

**Stability.** v2 beta; oRPC's `latest` dist-tag is still 1.16.1.

## ts-rest (3.52.1)

**Shape.** A contract is a plain object of routes: `{ method, path, pathParams?, query?, headers?, body, contentType?, responses: Record<number, schema | c.noBody()> }` (`src/lib/dsl.d.ts` L25-L57). The client (`initClient(contract, { baseUrl })`) and server adapters read the contract at runtime.

**Schemas.** 3.52.1 only understands Zod: it duck-types on `.safeParse` (`index.esm.mjs` L3-L4, L41) and has `zod ^3.22.3` as a peer. 3.53.0-rc.1 (2025-06-02) drops the Zod peer and reads `schema["~standard"]` (`index.esm.mjs` L4161, L4202), but it was never released as stable.

**Browser vs server.** The contract is meant to live in a shared package; no check.

**Navigations.** Responses are keyed by status code, so `302: c.noBody()` is declarable; `contentType: "application/x-www-form-urlencoded"` is a first-class mutation option (L51). Headers are set through `responseHeaders` in the serverless handler args (`@ts-rest/serverless src/lib/types.d.ts` L690).

**Errors.** Just more status codes in `responses`; the client returns a `{ status, body }` union, so callers switch on `status`.

**Cross-module behavior.** `requestMiddleware` and `responseHandlers` on the router builder apply to the whole router (`@ts-rest/serverless src/lib/router-builder/index.d.ts` L8-L20).

**Stability.** Effectively stalled: last stable 2025-03-04, last prerelease 2025-06-02.

## Hono RPC (4.13.13)

**Shape and browser vs server.** No contract object. Routes are ordinary Hono handlers; the client `hc<typeof app>(baseUrl)` gets everything from a **type-only** import of the app. At runtime it is a `Proxy` that joins property names into a path and the last segment into a method (`$get`, `$post`), with `$url()`/`$path()` to build links without calling (`dist/client/client.js` L1-L20, L105-L111). Nothing about schemas reaches the browser.

**Schemas.** Validation is middleware per route (`validator(target, fn)`); Standard Schema through the separate `@hono/standard-validator` (0.4.0, "Validator middleware using Standard Schema").

**Navigations, cookies, errors.** Everything is plain HTTP: `c.redirect(url, status)`, `setCookie(c, …)`, `c.json(body, status)`. Errors are not declared per route; the client types responses by status code from what the handler returns.

**Cross-module behavior.** `app.use("/auth/*", mw)` matches path patterns, so the Better Auth-style "a new path is not covered" gap applies.

## tRPC (11.19.0)

Type-only client (`import type { AppRouter }`), `Proxy` at runtime. Procedures are only `query` (GET), `mutation` (POST) and `subscription`, under one base path; no per-procedure method, path or status, so navigations do not fit. Inputs accept Standard Schema (`StandardSchemaV1Error` is exported from `dist/index.d.mts`). Response headers via `resHeaders` in the fetch adapter's `createContext` options (`dist/adapters/fetch/index.d.mts` L5). Errors are `TRPCError` codes plus a global `errorFormatter`, not declared per procedure. Middleware is typed, via `.use()` on a procedure builder.

## Better Auth (1.7.12), gaps only

**Apple `form_post` and other POST callbacks.** `/callback/:id` takes `GET` and `POST`, allows `application/x-www-form-urlencoded`, and is hidden from metadata (`HIDE_METADATA`). If the method is POST it merges body and query, and **immediately redirects to the GET form of the same URL** (`dist/api/routes/callback.mjs` L23-L46). All real work happens on the GET. This is how it gets `SameSite=Lax` cookies (the signed OAuth `state` cookie) back on a provider's cross-site POST.

**Errors.** Every failure on the callback is a redirect to `errorURL` (default `${baseURL}/error`) with `?error=…` (L47-L80), never a JSON error: navigations report errors by navigating.

**Client plugins are hand-written twins of server plugins.** `twoFactorClient` carries `$InferServerPlugin: {}` (type-only link to the server plugin), its own `pathMethods` table repeating every server path with its method, an `atomListeners` matcher `path.startsWith("/two-factor/")` to refresh the session, and a fetch hook that navigates (`window.location.href = twoFactorPage`) when a response has `twoFactorRedirect` (`dist/plugins/two-factor/client.mjs`). Nothing checks that the client table matches the server endpoints.

## Comparison

| | Definition reaches browser as | Navigation (302, form POST) | Cookies / headers | Errors declared per op | Cross-module | Shared schema format | Stability |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Effect `HttpApi` | runtime value (schemas) | **declarable** in contract; raw response also allowed | side channel or declared `WithHeaders` | yes, with status | typed middleware; ordering gap | Effect Schema | unstable |
| Effect RPC | runtime value (schemas) | **not expressible** | side channel (HTTP protocol only) | yes, no status | typed middleware; ordering gap | Effect Schema | unstable |
| oRPC contract-first | type only (RPCLink) or minified runtime contract (OpenAPILink) | OpenAPIHandler only (`detailed`); client refuses redirects | `resHeaders` plugin | yes, with status | typed `.use()` | Standard Schema (Effect via decode-only wrapper) | beta |
| ts-rest | runtime value | declarable by status | `responseHeaders` | as status codes | router-wide | Zod (Standard Schema only in rc) | stalled |
| Hono RPC | type only | plain handler | plain handler | no | path patterns | any via middleware | stable |
| tRPC | type only | not expressible | `resHeaders` | no (global codes) | typed `.use()` | Standard Schema | stable |
| Better Auth | type only + hand-written client tables | plain endpoint throwing redirects | cookie helpers on ctx | `APIError` codes | **path strings** | Zod | stable |

## Open questions not settled here

- Whether a generic, type-level mapping from one record of Butter contract entries to both an `HttpApiGroup` and an `RpcGroup` type-checks well (deriving at runtime is simple, since both constructors take plain schema values; the types were not tried).
- Effect RPC with framed or streaming serialization and response cookies (unchanged from the earlier finding).
- oRPC output encoding with transforming Effect schemas was read from source, not run.

## Appendix: runtime checks

Installed in a scratch directory: `effect@4.0.6`, `@orpc/{server,contract,client,effect,openapi}@2.0.0-beta.46`. One set of schemas:

```js
const SignInInput = Schema.Struct({ email: Schema.String, count: Schema.NumberFromString })
const SessionOut = Schema.Struct({ userId: Schema.String, n: Schema.Number })
class InvalidCredentials extends Schema.TaggedError()("InvalidCredentials", {}, { httpApiStatus: 401 }) {}
```

used in an `HttpApi` group (`signIn` POST, `callback` GET returning `HttpServerResponse.redirect`, `appleCallback` POST with `asFormUrlEncoded()`), an `RpcGroup` (`SignIn`), and an oRPC contract (`signIn` with `.errors({ INVALID_CREDENTIALS: { status: 401 } })`, `callback` with `outputStructure: "detailed"`), each served through its fetch handler. Output:

```
HttpApi signIn                     {"status":200,"body":{"userId":"a@b","n":3},"cookie":"session=abc; Path=/; HttpOnly"}
HttpApi signIn error               {"status":401,"body":{"_tag":"InvalidCredentials"}}
HttpApi GET callback               {"status":302,"location":"/app?code=c1"}
HttpApi Apple form_post            {"status":302,"location":"/app?apple=c2"}
Effect RPC SignIn (raw wire)       {"status":200,"body":"[{\"_tag\":\"Exit\",\"requestId\":\"1\",\"exit\":{\"_tag\":\"Success\",\"value\":{\"userId\":\"a@b\",\"n\":4}}}]"}
  oRPC RPC set-cookie              session=abc; Path=/; HttpOnly
oRPC client signIn                 {"userId":"a@b","n":5}
oRPC client error                  {"code":"INVALID_CREDENTIALS","defined":true}
oRPC OpenAPI GET callback          {"status":302,"location":"/app?code=c3"}
oRPC OpenAPI form-encoded POST     {"status":200,"body":"{\"userId\":\"f@g\",\"n\":7}"}
```

A second check declared the redirect in the `HttpApi` contract instead of returning a raw response:

```js
const Redirect = HttpApiSchema.WithHeaders(HttpApiSchema.Empty(302), { location: Schema.String })
HttpApiEndpoint.get("callback", "/callback", { query: { code: Schema.String }, success: Redirect })
// handler: Effect.succeed(HttpApiSchema.withHeaders({ body: undefined, headers: { location: `/app?code=${code}` } }))
```

```
declared redirect 302 /app?code=c9
openapi responses {"description":"<No Content>","headers":{"location":{"schema":{"type":"string"},"required":true}}}
```
