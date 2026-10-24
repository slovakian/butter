# oRPC v2's Effect integration, and what it offers Butter

Research for [What does oRPC v2's Effect integration offer Butter?](https://github.com/slovakian/butter/issues/30). Checked on 2026-10-24/25 (UTC clock read 2026-10-24T17:34Z when npm was queried) against npm metadata, the published `@orpc/effect@2.0.0-beta.46` tarball, the `middleapi/orpc` GitHub repository (releases, PRs, docs source under `apps/content/docs`), and the `effect@4.0.6` source in this repo's `node_modules`.

## TL;DR

- **"Stable" means the experimental label came off. It is not a stable oRPC release.** On 2026-10-24 the integration was renamed from `@orpc/experimental-effect` to `@orpc/effect` ("Promote to stable") and shipped in `2.0.0-beta.46`. oRPC v2 as a whole is still a prerelease: npm `latest` for `@orpc/server` is `1.16.1`, the docs install `@orpc/effect@beta`, and beta.46 itself has breaking changes.
- **Handlers are Effect generators, not bare Effects.** `.effect(function* ({ input, context, errors }) { ... })` or `os.handler(handlerGen(function* ...))`. A Butter Flow that returns an `Effect` is one `yield*` inside such a handler.
- **Requirements come in as a built `Context`, not a Layer.** Each request passes `'effect/context'`. The documented pattern is `ManagedRuntime.make(AppLayer)` at module scope, then passing `await runtime.context()` per request.
- **Effect Schema works directly** through an opt-in side-effect import that calls `Schema.toStandardSchemaV1` for you. Without that import you call `Schema.toStandardSchemaV1` yourself.
- **Tagged errors are not mapped for you.** Only `ORPCError`s (ideally declared with `.errors({...})`) reach the client with a type and a status code. Any other failure, `Data.TaggedError` included, becomes a 500 `INTERNAL_SERVER_ERROR` unless the user maps it, for example in the per-request `'effect/wrap'` hook. The compiler does not warn about errors left unmapped.
- **No router-from-object generator.** A router is a plain object of procedures, and each procedure is built one at a time. Turning the `Auth` object into a router takes a small mapping helper written by Butter or the user.
- **Client typing** (`RouterClient<typeof router>`) is a recursive mapped type over oRPC `Procedure` types. You can copy the technique for a Butter client. You cannot reuse the type itself without oRPC types, and at runtime the client needs an oRPC RPC endpoint or an OpenAPI contract.
- **Cookies and headers** work through two plugins (`context.reqHeaders`, `context.resHeaders`) plus the `getCookie`/`setCookie`/`deleteCookie` helpers. Fetch-based adapters exist for Next.js, TanStack Start, Hono, Elysia and Bun, among others.
- **One maintainer.** `dinwwwh` is the only npm maintainer of `@orpc/effect` and has about 1,370 of the repo's commits. The next human contributor has 5.

## 1. Stability, version, dates, maintainers

| Fact | Value | Source |
| --- | --- | --- |
| Integration package (new name) | `@orpc/effect`, created 2026-10-24T13:17Z. Versions: `0.0.0-stage`, `2.0.0-beta.45` (13:19Z), `2.0.0-beta.46` (14:30Z). | `npm view @orpc/effect time` |
| `@orpc/effect` dist-tags | `beta: 2.0.0-beta.46`, `latest: 2.0.0-beta.45`. `latest` points at a beta because the first manual publish set it. | `npm view @orpc/effect dist-tags`, [PR #2321](https://github.com/middleapi/orpc/pull/2321) body ("As with `@orpc/msw`, the first publish also sets `latest`") |
| Old name | `@orpc/experimental-effect`, created 2026-06-21. `latest: 1.14.11` (deprecated, "Published by mistake (contains v2 code)"), `beta: 2.0.0-beta.45`, peer `effect >=4.0.0-beta.90`. | `npm view @orpc/experimental-effect`, PR #2321 |
| The "stable" event | [PR #2321 "feat(effect)!: promote to stable as @orpc/effect"](https://github.com/middleapi/orpc/pull/2321), merged 2026-10-24T13:24Z. It "drops the `experimental-` prefix". Docs keep "the `@beta` convention every v2 page uses". | PR #2321 |
| Release that carries it | [v2.0.0-beta.46](https://github.com/middleapi/orpc/releases/tag/v2.0.0-beta.46), marked **Pre-release** on GitHub, published 2026-10-24T14:27Z. Its breaking changes include "Stop exporting internal-only APIs before v2 stable" (#2326) and "**effect**: Clean up public type surface before stable" (#2320). | `gh release view v2.0.0-beta.46` |
| oRPC v1 vs v2 | `@orpc/server` dist-tags: `latest: 1.16.1` (2026-10-22), `beta: 2.0.0-beta.46`. v2 betas have shipped about weekly since at least beta.40 (2026-09-23). | `npm view @orpc/server dist-tags time` |
| v2 stable date | Not announced. A search of the repo issues for "v2 stable" returned nothing. | `gh search issues --repo middleapi/orpc "v2 stable"` |
| Stability tags | oRPC has no `@stability`-style per-API tags. It relies on semver plus the `beta` channel. The PR says the "public type surface" is frozen as of #2320, but that promise lives only in a beta PR. | `@orpc/effect` dist `.d.ts` (JSDoc has only `@see`/`@example`), PR #2321 |
| Effect peer range | `effect: >=4.0.0`. The PR reports that all 106 package tests and the type tests pass against `effect@4.0.0`. | `package.json` in the tarball, PR #2321 |
| Effect APIs used | `Effect.runPromiseExitWith`, `Effect.gen`, `Effect.tryPromise`, `Effect.callback`, `Effect.contextWith`, `Effect.catchIf`, `Exit.isSuccess`, `Cause.squash`, `Cause.hasInterruptsOnly`, `Context.empty/isContext/makeUnsafe` (and `mapUnsafe`), `Schema.toStandardSchemaV1`, `Schema.toJsonSchemaDocument`, `Schema.isSchema`, `Schema.toType`. Every one I checked is `@stability stable` in `effect@4.0.6`. It does **not** import `effect/rpc`, `effect/http` or any unstable module. | `dist/*.mjs` in the tarball; `node_modules/.pnpm/effect@4.0.6/node_modules/effect/src/{Effect,Context,Cause,Schema}.ts` |
| Maintainers | npm: `dinwwwh` only, on both package names. GitHub contributors: `dinwwwh` 1,370 commits, then bots, then `Mnigos` 5. Recent effect PRs are credited "by @dinwwwh and **Claude**". | `npm view @orpc/effect maintainers`, `gh api repos/middleapi/orpc/contributors`, release notes |
| Repo health | `middleapi/orpc`, MIT, about 5.7k stars, last push 2026-10-24, not archived. | `gh api repos/middleapi/orpc` |

**Verdict on "stable today":** partly confirmed. The integration was promoted out of experimental on 2026-10-24 (UTC). What became stable is the package's status within oRPC v2, and v2 itself is still a prerelease (beta.46) with breaking changes still landing. A user who adopts it today installs `@orpc/server@beta` and `@orpc/effect@beta`.

Not checked: the third-party [`effect-orpc`](https://github.com/utopyin/effect-orpc) package (`1.0.0`, 2026-10-04, maintainer `utopy`, built on oRPC v1 `>=1.13.0` with `effect >=4.0.0`). It is a separate, community option for anyone who must stay on oRPC v1.

## 2. Writing a procedure with Effect

Source: [`apps/content/docs/integrations/effect.mdx`](https://github.com/middleapi/orpc/blob/main/apps/content/docs/integrations/effect.mdx) and `dist/shared/effect.*.mjs`.

- **Handler form.** You write a generator function, not an `Effect` value. You can call `handlerGen(function* (opts, input) {...})` and pass the result to `.handler(...)`. Or you import `@orpc/effect/extensions/effect` once for its side effect, which patches `Builder.prototype.effect` and `ProcedureImplementer.prototype.effect` so that `os.effect(function* ...)` and `implement(contract).x.effect(function* ...)` both work. At runtime `handlerGen` wraps the generator in `Effect.gen`, applies the optional `effect/wrap`, and runs it with `Effect.runPromiseExitWith(context)`.
  - A Butter Flow such as `auth.signIn(input): Effect<Session, SignInError, never>` therefore becomes `os.input(...).effect(function* ({ input }) { return yield* auth.signIn(input) })`.
- **Providing requirements.** The oRPC context carries `'effect/context': Context.Context<Services>`, typed with `WithEffectContext<Services>`. Inside the generator, `yield* SomeService` resolves from that Context. Middleware can add services with `Context.add`. The type of the services yielded inside the handler is checked against `InferEffectServices<Context>`, so a missing service is a compile error.
  - **Layers / ManagedRuntime:** the docs show `const runtime = ManagedRuntime.make(AppLayer)` at module scope, passing `await runtime.context()` as `effect/context` on each request (the OpenTelemetry and Cloudflare Workers sections). The docs warn: "Don't `Effect.provide` layers in `effect/wrap`: it runs for every `middlewareGen` and `handlerGen`, so the layer would be rebuilt several times per request."
  - Handlers get no `Scope`, so you wrap `acquireRelease` in `Effect.scoped`.
- **Interruption.** When the request's abort signal fires, the fiber is interrupted and finalizers run. The PR says client aborts and `createEffectClient` timeouts interrupt the server fiber.
- **Middleware.** `middlewareGen(function* ({ context, next }) { ... yield* next({ context }) })`, where downstream failures land in the Effect error channel.
- **Effect-only APIs.** Confirmed: `effect >=4.0.0` peer, and stable-tagged Effect APIs only (table above).

## 3. Schemas and errors

### Schemas

- **Baseline:** oRPC accepts any Standard Schema, so you write `.input(Schema.toStandardSchemaV1(MySchema))`.
- **Direct Effect Schema:** importing `@orpc/effect/extensions/input-output` once for its side effect patches `ContractBuilder` and `Builder` `.input`/`.output` so they accept an Effect `Schema` directly. Internally that still calls `Schema.toStandardSchemaV1` (`dist/extensions/input-output.mjs`). The types use `Schema.ConstraintDecoder<any>` and map `S['Encoded']` to `S['Type']`.
- **Output direction:** "the handler returns the schema's input, the client receives its output", which matches how oRPC treats other schema libraries (PR #2321 audit).
- **OpenAPI:** `EffectSchemaToJsonSchemaConverter` wraps `Schema.toJsonSchemaDocument` and keeps `identifier`-annotated schemas in `$defs`.
- A decode step that throws surfaces as a plain 500 (PR #2321).

### Errors

- **Typed errors are `ORPCError`s only.** You declare them with `.errors({ CODE: { data?, message? } })` and fail with `return yield* Effect.fail(errors.CODE(...))`. The client sees them typed (`isDefinedError`). A plain `new ORPCError(code)` whose code and data match a declared error is upgraded to the typed one. Otherwise it counts as an unknown error ([error-handling docs](https://github.com/middleapi/orpc/blob/main/apps/content/docs/error-handling.mdx)).
- **Effect tagged errors are not mapped automatically.** The runner does `throw Cause.squash(exit.cause)`, so the raw tagged error reaches oRPC, which treats it as unknown: "Other failures (e.g. `Data.TaggedError`) become `INTERNAL_SERVER_ERROR`" (PR #2321). The documented fix is `'effect/wrap'` in the per-request context: an `Effect.catchCause` / `Effect.mapError` that turns specific tagged errors into `ORPCError('NOT_FOUND', { cause })` and similar. It must be idempotent, because it runs once per `handlerGen` and once per `middlewareGen`.
- **No compile-time check that every error is mapped.** In `HandlerGen`, `TYield extends Effect.Effect<any, any, Services>`, so the error type is `any`, and an unmapped tagged error compiles without complaint and becomes a 500 at runtime.
- **HTTP status codes** come from the error code via `COMMON_ERROR_STATUS_MAP` (`BAD_REQUEST` 400, `UNAUTHORIZED` 401, `FORBIDDEN` 403, `NOT_FOUND` 404, `CONFLICT` 409, `UNPROCESSABLE_CONTENT` 422, `TOO_MANY_REQUESTS` 429, `INTERNAL_SERVER_ERROR` 500, …). Handlers accept a custom `errorStatusMap` built by spreading that map (`packages/client/src/error.ts` JSDoc).
- **The other direction:** `catchORPCError`, `catchORPCErrorCode` and `catchORPCErrorCodes` recover from `ORPCError`s inside Effects.

## 4. Generating a router from an object of Effect functions

oRPC has nothing that turns an object of functions into a router. The [router docs](https://github.com/middleapi/orpc/blob/main/apps/content/docs/router.mdx) say "Define a router as a plain JavaScript object where each key maps to a procedure". Every procedure is a builder chain (`.input`, `.errors`, `.effect`), and contracts (`oc`) work the same way. A router can be wrapped as a whole with `os.use(mw).router({...})`.

Turning Butter's exposable `Auth` object into a router therefore takes a small mapping helper, roughly `mapValues(flows, (flow, name) => base.input(inputSchemas[name]).errors(errorMaps[name]).effect(function* ({ input }) { return yield* flow(input) }))`. The helper has to know each Flow's input schema and error map. Keeping the types precise means a mapped type over `Auth`. That is doable, but it is code Butter or the user owns, and the field names it uses must avoid oRPC's reserved keys (`then`, `bind`, `call`, `apply`, `valueOf`, `toString`, `toJSON`).

## 5. Client typing

- **How it works:** `RouterClient<TRouter>` (`packages/server/src/router-client.ts`) recursively maps the router. Each `Procedure<…, Input, Output, ErrorMap>` becomes a `ProcedureClient` (a `(input, options) => Promise<Output>` with typed errors), and nested objects stay nested. The browser imports only `type { router }`, and `createORPCClient<RouterClient<typeof router>>(link)` gives a typed proxy with no codegen.
- **Without an oRPC server:**
  - The type depends on oRPC's `Procedure`/`ContractProcedure` and `ProcedureClient` types, so you cannot reuse it without oRPC types. Butter can copy the technique, a mapped type from the `Auth` object's Flow signatures to `(input) => Promise<Output>`, with no oRPC dependency.
  - At runtime, `RPCLink` speaks oRPC's own wire format (which changed in v2: "v1 RPC Link and OpenAPI Link clients cannot talk to a v2 server", [migration guide](https://github.com/middleapi/orpc/blob/main/apps/content/docs/migrations/from-v1.mdx)). `OpenAPILink` can call any HTTP API that a contract describes.
  - `createContractClientFactory(link)` builds clients from contracts alone, with less type safety.
- **Other clients:** `createRouterClient(router, { context })` is an in-process client with no network, and `createEffectClient(client)` wraps any oRPC client so each call returns a lazy `Effect` with `ORPCError` in the error channel.

## 6. Cookies, headers, adapters

- **Reading request headers** (for example `Origin`, or the Session cookie): add `RequestHeadersHandlerPlugin` to the handler, then read `context.reqHeaders?.get('origin')` and `getCookie(context.reqHeaders, 'session')` ([request-headers docs](https://github.com/middleapi/orpc/blob/main/apps/content/docs/plugins/request-headers.mdx)).
- **Setting response headers and cookies:** add `ResponseHeadersHandlerPlugin`, then call `setCookie(context.resHeaders, name, value, { httpOnly, secure, maxAge, … })` or `deleteCookie(...)` ([response-headers docs](https://github.com/middleapi/orpc/blob/main/apps/content/docs/plugins/response-headers.mdx), [cookie helpers](https://github.com/middleapi/orpc/blob/main/apps/content/docs/helpers/cookie.mdx)).
- Both header objects are typed `Headers | undefined`, because a direct call without the plugin has none. An Exposure that relies on them has to treat `undefined` as a failure.
- `@orpc/server/helpers` also ships `sign`/`unsign` and encryption helpers.
- There are plugins for CORS and "GET method CSRF protection" (`apps/content/docs/plugins/`). Butter's own origin verification Primitive can run in a middleware or `middlewareGen` either way.
- **Adapters** ([adapters index](https://github.com/middleapi/orpc/blob/main/apps/content/docs/adapters/index.mdx)):
  - Fetch API, which covers Bun and Deno.
  - Node HTTP, Fastify, AWS Lambda, WebSocket (including Bun).
  - Built on Fetch: Next.js, Nuxt, SvelteKit, **TanStack Start** (mounted in a server route `src/routes/api/rpc.$.ts`), SolidStart, React Router, Astro, **Hono**, **Elysia**, H3.
  - Express, Cloudflare Workers, Expo, plus MessagePort-based adapters.
- **Next.js:** the Effect docs note that if you catch defects you must call `unstable_rethrow(Cause.squash(cause))` first, so that `redirect()`/`notFound()` still reach Next.js.

## 7. What this means for Butter

- **It fits ADR-0003** ([Butter stops at Flows](../adr/0003-butter-stops-at-flows.md)). An oRPC Exposure can call Effect Flows directly, with no Promise facade, and stays on stable-tagged Effect APIs. Effect RPC (`effect/rpc`) is unstable, as covered in [Is Effect v4 stable, and are Schema and RPC usable?](https://github.com/slovakian/butter/issues/16).
- **The parts an oRPC Exposure guide or helper would have to cover:**
  1. A `ManagedRuntime` built from the Composition Root, with `runtime.context()` passed as `effect/context` per request.
  2. A table mapping each Flow's tagged errors to oRPC codes, applied in `effect/wrap` or per procedure with `.errors`. Without it, every auth failure is a 500 and the client gets no typed errors. This is the Invariant-relevant part, since the Exposure Invariant tests would catch unmapped errors only at runtime.
  3. The Session cookie set through `ResponseHeadersHandlerPlugin` + `setCookie`, using Butter's cookie serialization Primitive.
  4. The `Origin` check in a middleware reading `reqHeaders`.
  5. A per-Flow input schema (Effect Schema, through the input-output extension or `toStandardSchemaV1`).
- **Risks:**
  - The guidance has to target `@beta` packages until oRPC v2 ships. Beta.46 still had breaking changes.
  - The project rests on one maintainer.
  - The extensions work by patching prototypes as a side effect of an import (it must run "from a module that always runs during initialization"), which can trip up agents and bundlers. The explicit `handlerGen` plus `toStandardSchemaV1` form avoids that.
  - Pin exact beta versions.

## Sources

- npm: `npm view @orpc/effect`, `npm view @orpc/experimental-effect`, `npm view @orpc/server dist-tags time`, `npm view effect-orpc` (queried 2026-10-24T17:34Z).
- Tarball: `npm pack @orpc/effect@2.0.0-beta.46` (`dist/index.{mjs,d.mts}`, `dist/shared/*`, `dist/extensions/{effect,input-output}.{mjs,d.mts}`, `package.json`).
- GitHub: [middleapi/orpc releases](https://github.com/middleapi/orpc/releases) (v2.0.0-beta.40 to beta.46, v1.16.1), [PR #2321](https://github.com/middleapi/orpc/pull/2321), and docs source at `apps/content/docs/`: `integrations/effect.mdx`, `router.mdx`, `error-handling.mdx`, `client/server-side.mdx`, `contract/router.mdx`, `contract/client-factory.mdx`, `helpers/cookie.mdx`, `plugins/request-headers.mdx`, `plugins/response-headers.mdx`, `adapters/index.mdx`, `adapters/tanstack-start.mdx`, `migrations/from-v1.mdx`. Source: `packages/server/src/router-client.ts`, `packages/client/src/error.ts`.
- Effect: `effect@4.0.6` source in this repo's `node_modules` for the `@stability` tags.
