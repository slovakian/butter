# How Better Auth and the RPC libraries mount on other frameworks

Research for [How do Better Auth and the RPC libraries mount on other frameworks?](https://github.com/slovakian/butter/issues/31). It feeds [Does Butter ship Exposure code, or only guidance?](https://github.com/slovakian/butter/issues/33) and [Does Butter ship a typed client derived from the exposable object?](https://github.com/slovakian/butter/issues/35).

Researched 2026-10-25. Source claims are pinned to these commits (shallow clones of each default branch):

| Repo | Commit |
| --- | --- |
| better-auth/better-auth | `d25b91e76077a521212294041e86bca91d87c39f` |
| unnoq/orpc | `e691289935c1f2679844da46039490d710b032c0` |
| trpc/trpc | `1c9bf51ea572fd46fa52fb725999b8d0c6950386` |
| honojs/hono | `5ca49b0720755c585c9a9835f0a479ceea36fb52` |
| elysiajs/elysia | `e037eca710e7ad193be09cc6615ab0dbe54af914` |
| Effect-TS/effect-smol (Effect v4) | `3a1128c7684e04d34d9f541f77adaac38a513056` |

Abbreviations below: `BA` = `https://github.com/better-auth/better-auth/blob/d25b91e76077a521212294041e86bca91d87c39f`, `ORPC` = `https://github.com/unnoq/orpc/blob/e691289935c1f2679844da46039490d710b032c0`, `TRPC` = `https://github.com/trpc/trpc/blob/1c9bf51ea572fd46fa52fb725999b8d0c6950386`, `HONO` = `https://github.com/honojs/hono/blob/5ca49b0720755c585c9a9835f0a479ceea36fb52`, `ELYSIA` = `https://github.com/elysiajs/elysia/blob/e037eca710e7ad193be09cc6615ab0dbe54af914`, `EFFECT` = `https://github.com/Effect-TS/effect-smol/blob/3a1128c7684e04d34d9f541f77adaac38a513056`.

## Summary

1. **Everything is one Web `(Request) => Promise<Response>` function.** Each library's core is a fetch handler. Framework "integrations" are very thin: a map that exports the same function under each HTTP method name, a Node bridge, and (only Better Auth) cookie plugins.
2. **The cookie plugins exist only for server-side calls, not for HTTP.** When a browser hits `auth.handler`, cookies go out as `Set-Cookie` on the `Response`, which every host passes through. The Next.js and TanStack Start plugins only matter when app code calls `auth.api.signInEmail(...)` directly inside a Server Action or server function, where there is no `Response` to put headers on.
3. **The prefix is the main thing that goes wrong.** Some handlers expect the full URL and are told their base path (Better Auth `basePath`, tRPC `endpoint`, oRPC `prefix`, Effect router paths, Elysia `prefix`). Some hosts strip the mount prefix before calling the handler (Hono `app.mount`, Elysia `.mount(path, h)`). Getting the two out of step gives 404s.
4. **Hosts that pre-parse the body have to be told not to.** Fetch handlers read the raw body themselves. Express (`express.json()`) and Elysia (its default parser) would consume it first. Elysia's `.mount` sets `parse: 'none'` for you. Express must mount the handler before the body parsers.
5. **The typed client comes from a type-only import of the server object** in Better Auth, oRPC, tRPC, Hono and Elysia. Effect RPC is the exception: its client is built from the runtime `RpcGroup` value (schemas), which is a definition that is safe to share, not the server implementation.
6. **Only the auth library builds CSRF/origin checks and `Cache-Control` into the handler.** The RPC/server libraries leave them opt-in (oRPC plugins, Hono middleware) or absent (tRPC, Effect RPC).

## Better Auth

### `auth.handler` is a plain fetch handler

`betterAuth()` returns `{ handler, fetch: handler, api, options, $context, $ERROR_CODES }`, where `handler = async (request: Request) => ...` (`BA/packages/better-auth/src/auth/base.ts` L49-L112). A test checks that `auth.fetch` is the same function as `auth.handler` (`BA/packages/better-auth/src/auth/minimal.test.ts` L16-L18). For each request, the handler:

- copies the shared auth context for that request, so state that depends on the request (base URL, `trustedOrigins` and `trustedProviders` callbacks) never leaks between concurrent requests (base.ts L55-L104);
- works out `baseURL` from the request (with trusted-proxy headers) when none is configured (base.ts L74-L94);
- passes the request to a `better-call` router built with `basePath` (`BA/packages/better-auth/src/api/index.ts` L280-L300). The router matches on the **full** pathname, so the host must hand over the request unchanged (prefix not stripped).

It needs nothing from the host except the Request: no context argument, no parsed body.

### Framework integrations

| Host | What Better Auth ships | Source |
| --- | --- | --- |
| Next.js App Router | `toNextJsHandler(auth)` returns `{ GET, POST, PATCH, PUT, DELETE }`, all the same function (15 lines) | `BA/packages/better-auth/src/integrations/next-js.ts` L8-L24 |
| Node / Express / Fastify | `toNodeHandler(auth)` passes `auth.handler` to `better-call/node`'s `toNodeHandler`; `fromNodeHeaders` converts `IncomingHttpHeaders` to `Headers` | `BA/packages/better-auth/src/integrations/node.ts` |
| Express | Docs: mount on `/api/auth/*splat` (v5) **before** `express.json()`, because body parsers consume the stream | `BA/docs/content/docs/integrations/express.mdx` L16-L37 |
| Hono | Nothing shipped. Docs: `app.all("/api/auth/*", (c) => auth.handler(c.req.raw))`; the route must match `basePath`, including any Hono `basePath` | `BA/docs/content/docs/integrations/hono.mdx` L8-L53 |
| Elysia | Nothing shipped. Docs: `new Elysia().mount(auth.handler)` | `BA/docs/content/docs/integrations/elysia.mdx` L12-L20 |
| TanStack Start | Docs: a server route at `/api/auth/$` whose `GET`/`POST` handlers call `auth.handler(request)` | `BA/docs/content/docs/integrations/tanstack.mdx` L25-L41 |
| Effect v4 | Docs: `HttpRouter.add("*", "/api/auth/*", HttpEffect.fromWebHandler(auth.handler))` | `BA/docs/content/docs/integrations/effect.mdx` |

The `integrations/` folder also has SvelteKit, SolidStart and Solid TanStack variants. The pattern is the same throughout: adapters are a handful of lines because the core is already `Request → Response`.

### Cookies in frameworks with their own cookie APIs

Two plugins, `nextCookies()` (`next-js.ts` L47) and `tanstackStartCookies()` (`tanstack-start.ts` L24), add an `after` hook that runs on **every** endpoint:

- If the call came through the HTTP router (`ctx._flag === "router"`), they do nothing, because the cookies are already `Set-Cookie` headers on the `Response`.
- Otherwise (a direct `auth.api.*` call from a Server Action or server function), they read `ctx.context.responseHeaders.get("set-cookie")`, parse it, and replay each cookie through the host's API: `(await cookies()).set(name, value, opts)` in Next.js, or `setCookie(...)` from `@tanstack/react-start/server`. Errors are swallowed, because setting a cookie from a Server Component throws.
- `nextCookies` also has a `before` hook on `/get-session`. It detects an RSC render (`RSC: 1` without `next-action`) and skips session refresh there, since cookies cannot be written in that context and the database would get out of step with the cookie.
- Both warn if they are not the last plugin (`cookie-plugin-guard.ts`), because later plugins could add cookies after the replay.

What this means for Butter: a host's cookie API is only needed for in-process calls that skip HTTP. A fetch handler on its own never needs it.

### How `createAuthClient` infers its methods

- `createAuthClient<Option>()` (`BA/packages/better-auth/src/client/vanilla.ts` L79) builds a runtime **Proxy** (`client/proxy.ts` `createDynamicPathProxy`, L36-L80). `client.signIn.email(...)` becomes path segments that are kebab-cased to `/sign-in/email`. The HTTP method comes from a table of known paths (`pathMethods`) or the call options, and is otherwise inferred.
- Types: `InferClientAPI<O>` takes the core `Auth["api"]` endpoints merged with each client plugin's endpoints (`client/types.ts` L45-L51), then runs `InferRoutes`, which maps each endpoint's `path` string to a nested camelCase object through template-literal types (`client/path-to-object.ts` `CamelCase` L101, `PathToObject` L106-L112, `InferRoutes` L301).
- Plugin methods: each client plugin carries a phantom `$InferServerPlugin: {} as ReturnType<typeof serverPlugin>` (for example `BA/packages/better-auth/src/plugins/two-factor/client.ts` L40), so the client picks up the server plugin's endpoint types with a type-only reference. There is also an `$InferAuth` option that takes `typeof auth` directly (`path-to-object.ts` L20-L45, `types.ts` L66-L80).
- The client never imports server code at runtime. The server's types plus a generic Proxy do the work.

## oRPC

- `new RPCHandler(router, opts)` (`ORPC/packages/server/src/adapters/fetch/rpc-handler.ts` L18-L27) wraps a runtime-agnostic `StandardHandler`. `handler.handle(request, { prefix, context })` returns `{ matched: true, response } | { matched: false }` (`ORPC/packages/server/src/adapters/fetch/handler.ts` L9-L52). So it can sit in a middleware chain and fall through when nothing matches.
- `prefix`: the request URL is checked with `matchesHttpPathPrefix` and the procedure path is resolved relative to it. The handler is given the **full** URL plus the prefix (`ORPC/packages/server/src/adapters/standard/handler.ts` L15-L20, L90-L106). `context` is a value or a function of the request, and runs only after the prefix matches (L17-L20).
- Hono: `app.use('/rpc/*', async (c, next) => { const { matched, response } = await handler.handle(c.req.raw, { prefix: '/rpc', context: {} }); if (matched) return c.newResponse(response.body, response); await next() })`. The docs also show a `Proxy` over `c.req.raw` that reuses Hono's body-parse cache when another middleware has already read the body (`ORPC/apps/content/docs/adapters/hono.mdx`).
- Next.js: a catch-all `app/rpc/[[...rest]]/route.ts` exports the same function as `HEAD`, `GET`, `POST`, `PUT`, `PATCH` and `DELETE`, returning 404 when nothing matches (`ORPC/apps/content/docs/adapters/next.mdx`).
- Elysia: `.all('/rpc*', ..., { parse: 'none' })` to skip Elysia's body parsing (`ORPC/apps/content/docs/adapters/elysia.mdx` L34). Express: register body parsers **after** oRPC (`express.mdx` L11).
- Separate Node, Fastify, AWS Lambda, WebSocket and MessagePort adapters exist in `ORPC/packages/server/src/adapters/`.
- Typed client: `createORPCClient<RouterClient<typeof router>>(link)` builds a recursive Proxy that calls `link.call(path, input, options)` (`ORPC/packages/client/src/client.ts` L56-L80). The types come from a type-only `typeof router`.
- Security at this layer, all opt-in plugins: `GetMethodCsrfProtectionHandlerPlugin` rejects cross-site top-level navigation `GET`s and relies on `SameSite=Lax/Strict` cookies (`ORPC/packages/server/src/plugins/get-method-csrf-protection.ts`), plus `cors`, `response-headers` and `request-headers` plugins (`ORPC/packages/server/src/plugins/`). Nothing is on by default.

## tRPC

- `fetchRequestHandler({ endpoint, req, router, createContext })` returns a `Response` (`TRPC/packages/server/src/adapters/fetch/fetchRequestHandler.ts` L24-L60). It strips `endpoint` from the pathname to get the procedure path (L36-L39), so it is given the full URL plus the endpoint. `createContext` receives `{ req, resHeaders, info }`, and `resHeaders` is a `Headers` object merged into the response, which is how procedures set cookies (L26-L33).
- Next.js App Router: `export { handler as GET, handler as POST }` with `endpoint: '/api/trpc'` in `app/api/trpc/[trpc]/route.ts` (`TRPC/www/docs/server/adapters/nextjs.md` L140-L155). There are also Express, Fastify, Lambda, standalone Node and WebSocket adapters (`TRPC/packages/server/src/adapters/`), and a `next-app-dir` helper that maps tRPC errors to Next `redirect`/`notFound` for Server Actions.
- Typed client: `createTRPCClient<AppRouter>(opts)` is an untyped client wrapped in a typed Proxy (`TRPC/packages/client/src/createTRPCClient.ts` L165-L171). The types come from a type-only `typeof appRouter`.
- Security at this layer: no CSRF or origin check. It only enforces method discipline: queries are GET, mutations are POST, and `allowMethodOverride` is off by default (`TRPC/packages/server/src/unstable-core-do-not-import/http/resolveResponse.ts` L272-L273, L395). `Cache-Control` and other headers are up to the user through `responseMeta`.

## Hono

- A Hono app *is* a fetch handler: `app.fetch(request, env, ctx)` (`HONO/src/hono-base.ts` L498). `hono/vercel`'s `handle(app)` is just `(req) => app.fetch(req)` (`HONO/src/adapter/vercel/handler.ts`), so in Next.js you write `export const GET = handle(app)`.
- Hosting other fetch handlers: `app.mount(path, handler, options)` (`HONO/src/hono-base.ts` L348-L400). By default it **rewrites the URL to strip the mount prefix** (L381-L388) and passes `(env, executionCtx)` as extra arguments. `replaceRequest: false` turns the stripping off. That is why Better Auth's docs use `app.all(path, c => auth.handler(c.req.raw))` and not `mount`: Better Auth wants the full path.
- Typed client: `hc<typeof app>(baseUrl)` (`HONO/src/client/client.ts` L151), using a type-only import of the app.
- Security: opt-in `csrf()` middleware. It passes a request if `Origin` matches (by default, the request's own origin) **or** `Sec-Fetch-Site` is in an allowed set (`HONO/src/middleware/csrf/index.ts` L10-L94). The cookie helper enforces the rules for `__Secure-`/`__Host-` prefixes (`HONO/src/helper/cookie/index.ts` L79-L84). There is also a `secure-headers` middleware. None of these are on by default.

## Elysia

- `app.fetch` is a fetch handler. In Next.js: `new Elysia({ prefix: '/api' })` in `app/api/[[...slugs]]/route.ts`, then `export const GET = app.fetch; export const POST = app.fetch`. The `prefix` must match the file location ([elysiajs.com/integrations/nextjs](https://elysiajs.com/integrations/nextjs)).
- Hosting other fetch handlers: `.mount(handler)` with no path registers `ALL /*` and passes the full path. `.mount(path, handler)` strips the path prefix. Both set `parse: 'none'` so the raw body reaches the handler (`ELYSIA/src/index.ts` `mount`, L5585-L5680).
- Typed client: Eden Treaty, `treaty<typeof app>(url)`, using a type-only import. It can also take the app instance directly to call in-process without the network (Elysia Next.js integration docs).

## Effect v4 (effect/unstable/http and effect/unstable/rpc)

- `HttpEffect.fromWebHandler(handler)` wraps any `(Request) => Promise<Response>` as an Effect HTTP app (`EFFECT/packages/effect/src/unstable/http/HttpEffect.ts` L374-L400). This is how Better Auth mounts in Effect.
- `HttpRouter.toWebHandler(appLayer, opts)` turns a router Layer into `{ handler(request, context?), dispose() }` (`EFFECT/packages/effect/src/unstable/http/HttpRouter.ts` L1283-L1345). The optional `context` argument lets a host pass Effect services for each request. `dispose` releases the Layer's resources. `HttpEffect.toWebHandler` and `toWebHandlerLayer` do the same for a single HTTP effect (`HttpEffect.ts` L231-L347).
- RPC: `RpcServer.layerHttp({ group, path, protocol: "http" | "websocket" })` registers a route on an `HttpRouter` (`EFFECT/packages/effect/src/unstable/rpc/RpcServer.ts` L797-L820). `RpcServer.toHttpEffect(group)` returns the bare HTTP effect (L1171-L1205). RpcServer has no direct `toWebHandler`. You get a fetch handler by combining `layerHttp` with `HttpRouter.toWebHandler`, and `path` is the full path (no prefix stripping).
- Needs from the host: the full Request, the serialization layer (`RpcSerialization`), and the handler and middleware services.
- Typed client: `RpcClient.make(group)` (`EFFECT/packages/effect/src/unstable/rpc/RpcClient.ts` L627) with `RpcClient.layerProtocolHttp({ url })` (L985). Unlike the others, the client needs the **runtime** `RpcGroup` value, because the schemas encode and decode on the client. The same goes for `HttpApiClient.make(api)` (`EFFECT/packages/effect/src/unstable/httpapi/HttpApiClient.ts` L476). The definition is shared, but the server implementation stays on the server.
- Security: `HttpMiddleware.cors` and `xForwardedHeaders` (`EFFECT/packages/effect/src/unstable/http/HttpMiddleware.ts` L249, L289). `HttpApiBuilder.securitySetCookie` defaults cookies to `secure: true, httpOnly: true` (`EFFECT/packages/effect/src/unstable/httpapi/HttpApiBuilder.ts` L541-L555). There is no CSRF or origin middleware.

## Which hosts take a plain `Request → Response` handler with no adapter

| Host | Plain fetch handler? | Notes | Source |
| --- | --- | --- | --- |
| Next.js App Router route handlers | Yes | Export functions named `GET`/`POST`/`PUT`/`PATCH`/`DELETE`/`HEAD`/`OPTIONS` that take a `Request` (really a `NextRequest`, which extends it) and return a `Response`. A catch-all `[...slug]` route gives you a prefix. `OPTIONS` is auto-implemented if not exported. Since v15, GET handlers default to dynamic (not cached). `Set-Cookie` on the returned Response works. | [nextjs.org/docs/app/api-reference/file-conventions/route](https://nextjs.org/docs/app/api-reference/file-conventions/route) |
| Next.js Server Actions / RSC | No (no Request/Response) | Cookies only through `cookies()` from `next/headers`, and they cannot be written while rendering an RSC. This is why `nextCookies()` exists. | same; `BA/.../integrations/next-js.ts` |
| TanStack Start server routes | Yes | `createFileRoute(path)({ server: { handlers: { GET: ({ request, params, context }) => Response } } })`. Splat routes are `routes/api/auth/$.ts`. | [tanstack.com/start/latest/docs/framework/react/guide/server-routes](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes) |
| TanStack Start server functions | No (RPC, not Request/Response) | Cookies through `setCookie` from `@tanstack/react-start/server`. This is why `tanstackStartCookies()` exists. | `BA/.../integrations/tanstack-start.ts` |
| Hono | Yes | `app.all(path, c => h(c.req.raw))` keeps the full URL. `app.mount(path, h)` strips the prefix. | `HONO/src/hono-base.ts` L348 |
| Elysia | Yes | `.mount(h)` or `.mount(path, h)`, with body parsing turned off automatically. | `ELYSIA/src/index.ts` L5585 |
| Effect `HttpRouter` | Yes, through `HttpEffect.fromWebHandler` | | `HttpEffect.ts` L374 |
| `Bun.serve`, Deno.serve, Cloudflare Workers | Yes | `Bun.serve({ fetch: h })`, `Deno.serve(h)`, `export default { fetch: h }` | [bun.com/docs/api/http](https://bun.com/docs/api/http) |
| Node `http`, Express, Fastify | No, needs an adapter | `better-call/node`, `@hono/node-server`, `@effect/platform-node` `NodeHttpServer`, and oRPC/tRPC node adapters. In Express, the body parser must come after the handler. | `BA/.../integrations/node.ts`; BA express docs |

So one fetch handler reaches every modern host directly. Node needs one well-known bridge. Only the two "RPC-shaped" framework features (Next Server Actions and TanStack server functions) have no Request/Response, so they need the host's own cookie API.

## CSRF/origin, `Cache-Control` and cookie attributes at the handler layer

| Library | CSRF / origin | `Cache-Control` | Cookie attributes |
| --- | --- | --- | --- |
| Better Auth | **On by default.** `originCheckMiddleware` validates `Origin`/`Referer` (and callback URLs) against `trustedOrigins` on non-GET requests that carry cookies (`BA/.../api/middlewares/origin-check.ts` L64-L130, `validateOrigin` L221-L300). A same-origin `Origin: null` is accepted via `Sec-Fetch-Site: same-origin`. `formCsrfMiddleware` covers first sign-in with no cookie yet, using Fetch Metadata: it blocks `Sec-Fetch-Site: cross-site` + `Sec-Fetch-Mode: navigate`, and otherwise validates any Origin/Referer present. Requests with no Origin header at all (curl, server-to-server) are allowed (L303-L375). | `NO_STORE_HEADERS` (`no-store`, `Pragma: no-cache`) in `BA/packages/core/src/api/index.ts` L30-L33. `/get-session` sets `no-store` and stops those headers leaking onto other endpoints (`BA/.../api/routes/session.ts` L72-L73, L502-L506). | Defaults `httpOnly: true`, `sameSite: "lax"`, `path: "/"`. `secure` and the `__Secure-` prefix apply when the base URL is https (or in production when the base URL is unknown). Cross-subdomain `domain` is opt-in (`BA/.../cookies/index.ts` L60-L112). |
| oRPC | Opt-in `GetMethodCsrfProtectionHandlerPlugin` (blocks cross-site navigation GETs) and `cors` plugin | User sets it (response-headers plugin) | User sets them |
| tRPC | None. Only GET-for-query/POST-for-mutation discipline | User sets it through `responseMeta` | User sets them through `resHeaders` |
| Hono | Opt-in `csrf()` (Origin **or** `Sec-Fetch-Site`) | Opt-in `cache` / `secure-headers` middleware | Cookie helper enforces the `__Secure-`/`__Host-` rules |
| Elysia | None built in | User sets it | User sets them |
| Effect v4 | `cors` only. No CSRF | User sets it | `securitySetCookie` defaults `secure` + `httpOnly` |

## What this means for Butter's decisions

- **A fetch handler is cheap and reaches nearly every host.** Better Auth's adapters are each 10-20 lines on top of one `Request → Response` function. If Butter ships a handler built from the composed Flows object, it gets Next route handlers, TanStack server routes, Hono, Elysia, Effect, Bun, Deno and Workers without adapters, and Node through one bridge. (Feeds [Does Butter ship Exposure code, or only guidance?](https://github.com/slovakian/butter/issues/33).)
- **Pick one prefix convention and document it per host.** The Better Auth/oRPC/tRPC style (handler matches the full URL against a configured base path) works everywhere when the host passes `c.req.raw` unchanged. Hono `mount` and Elysia `.mount(path, …)` strip the prefix by default, which is a classic pitfall worth an Exposure Invariant test.
- **The raw body must reach the handler.** Express and Elysia defaults would consume it. That is a gotcha to note in the docs, not code to write.
- **Cookie-API plugins are only needed for in-process calls** (Server Actions, server functions). Over HTTP, `Set-Cookie` on the Response is enough. Butter's existing plan of framework-free session-cookie serialization Primitives fits that split.
- **Of all these libraries, only the auth library puts origin/CSRF checks and `no-store` in the handler.** If Butter leaves those to the Exposure, they need Invariant tests, because none of the RPC libraries turn them on by default.
- **Typed client:** every library except Effect derives the client from a type-only `typeof server` plus a generic runtime Proxy (path to URL). Effect RPC needs a runtime definition (schemas) on the client. Because Butter's composed object is "safe even if exposed", either model is possible: a Proxy typed from `typeof flows`, or a client built from shared Flow definitions if the encoding needs schemas on the client. (Feeds [Does Butter ship a typed client derived from the exposable object?](https://github.com/slovakian/butter/issues/35).)
