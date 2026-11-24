# Why existing auth libraries and guides fail or succeed

Primary-source research for [slovakian/butter#87](https://github.com/slovakian/butter/issues/87). All claims below are verified directly against upstream source code, official documentation, maintainer announcements, and published security standards as of November 2026.

## Executive summary

Every authentication library runs into the same structural wall: authentication sits inside an application's database, HTTP boundary, and domain model, yet a reusable library must hide all three behind generic adapters, fixed logical schemas, and plugin seams.

- **Better Auth** solves an impressive range of real security and ergonomic problems out of the box, including CSRF origin checks, timing-safe login, atomic IPv6-aware rate limiting, encrypted cookie caches, and OAuth state hygiene. Its failure modes are structural, not accidental: a single `betterAuth()` instance flattens plugin endpoints, database adapters force a translation layer that locks API shapes and blocks SQL joins across app domain tables, `customSession` bypasses session caching and breaks cross-repo type inference, and `authClient` duplicates plugin registration through a runtime `Proxy`.
- **Lucia** and **Arctic** were deprecated by their author (Pilcrow) precisely because database adapters and generic OAuth HTTP wrappers are the wrong abstraction layers. Pilcrow replaced them with minimal copy-paste code and **Pilcrow's Auth Book** (`auth.pilcrowonpaper.com`, successor to the archived Copenhagen Book). The book teaches fundamentals well, but stops short of OAuth/OIDC, multi-tenancy, authorization, TypeScript/PostgreSQL production patterns, client state coordination, operational runbooks, and machine-verifiable security tests.
- **Auth.js** entered maintenance mode under Better Auth in September 2025 after years of friction between its stateless-first model and database-backed credentials. **Ory Kratos**, **Clerk**, and **WorkOS** eliminate in-app auth library coupling by moving identity out of process, but trade it for network boundaries, eventual consistency when syncing user tables, and loss of single-query relational joins.
- **Rolling a target auth system with a coding agent** removes the adapter tax and unlocks direct SQL ownership, but teams risk quietly dropping roughly a dozen security and concurrency controls that mature libraries enforce by default. **Butter** only beats an auth library if it pairs direct code/SQL ownership with opinionated defaults and executable verification against OWASP ASVS 5.0, NIST SP 800-63B-4, and RFC 9700.

---

## Better Auth architecture: what works and where it breaks

All source references below inspect `better-auth/better-auth` at release tag [`v1.7.28`](https://github.com/better-auth/better-auth/releases/tag/v1.7.28) (published 2026-11-24).

### 1. Single `betterAuth()` instance and flat endpoint merging

`betterAuth()` calls `createBetterAuth(options, init)` in [`packages/better-auth/src/auth/full.ts#L27-L31`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/auth/full.ts#L27-L31) and [`packages/better-auth/src/auth/base.ts#L14-L110`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/auth/base.ts#L14-L110). It initializes one shared `authContext` promise and flattens core and plugin endpoints into a single object in [`packages/better-auth/src/api/index.ts#L178-L267`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/api/index.ts#L178-L267):

```ts
const endpoints = {
  ...baseEndpoints,
  ...pluginEndpoints,
  ok,
  error,
} as const;
```

Two architectural constraints fall straight out of this design:

- **Per-request cloning of shared state.** Because `authContext` stores request-dependent values like `baseURL`, `trustedOrigins`, and `trustedProviders`, every HTTP request in `base.ts#L44-L94` must clone `ctx` (via `resolveRequestContext` or `Object.create`) so concurrent requests on different hosts do not corrupt each other. Direct server calls (`auth.api.*`) with a dynamic `baseURL` fail with `INTERNAL_SERVER_ERROR` unless the caller manually forwards `headers`/`request` or configures a fallback ([`to-auth-endpoints.ts#L34-L52`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/api/to-auth-endpoints.ts#L34-L52)).
- **Last-plugin-wins endpoint collisions.** `pluginEndpoints` is built by spreading each plugin's `endpoints` map in order (`api/index.ts#L178-L184`). `checkEndpointConflicts` (`api/index.ts#L58-L171`) only checks plugin-vs-plugin path collisions and logs an error without throwing. Meanwhile, overriding core routes like `/get-session` (as `customSession` does) relies on object-spread shadowing of `baseEndpoints`.

### 2. Plugin system and cross-plugin boundaries

Plugins extend Better Auth through five separate extension mechanisms: `endpoints`, `schema`, `hooks`, `middlewares`, and `onRequest`/`onResponse` ([`docs/content/docs/concepts/plugins.mdx`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/plugins.mdx)). These boundaries create real surprises when composing features:

- **HTTP middlewares skip server calls.** Plugin `middlewares` run only on HTTP requests through the router, not when an endpoint is called directly via `auth.api.*` ([`plugins.mdx#L331`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/plugins.mdx#L331)). Plugin `hooks` run on both HTTP and `auth.api.*` calls via [`dispatchAuthEndpoint`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/api/dispatch.ts#L333-L345), unless another plugin invokes an endpoint function directly (which deliberately bypasses hooks).
- **Raw `Response` returns skip `after` hooks.** In [`dispatch.ts#L444-L447`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/api/dispatch.ts#L444-L447), any endpoint returning a raw `Response` short-circuits all `after` hooks and header post-processing.
- **Cross-plugin coupling leaks into core plugins.** Plugins do not compose cleanly around shared concepts like sessions. For example, [`custom-session/index.ts#L53-L68`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/plugins/custom-session/index.ts#L53-L68) hardcodes an `after` hook matching the exact path `"/multi-session/list-device-sessions"` (gated behind `shouldMutateListDeviceSessionsEndpoint`) because the `multi-session` plugin bypasses `customSession`'s `/get-session` override.
- **Cross-plugin type blindness.** Because plugins are passed as array elements into a single `betterAuth({ plugins: [...] })` call, one plugin cannot see the schema extensions added by sibling plugins during construction.

### 3. Hooks and `databaseHooks`

Better Auth exposes two hook layers, and both impose tight structural ceilings:

- **Monolithic top-level endpoint hooks.** `hooks.before` and `hooks.after` each accept only a single `createAuthMiddleware` function, not an array ([`hooks.mdx#L121-L123`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/hooks.mdx#L121-L123), [`dispatch.ts#L296-L311`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/api/dispatch.ts#L296-L311)). Any app customizing multiple flows has to write a string-matching `if (ctx.path === ...)` switch inside one function. User hooks always run before plugin hooks (`dispatch.ts#L325-L327`), leaving no ordering control relative to individual plugins.
- **Narrow `databaseHooks` scope and typing.** `databaseHooks` apply only to `user`, `session`, and `account` records ([`database.mdx#L872`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/database.mdx#L872)), not arbitrary plugin tables. Official docs note that full type inference for `additionalFields` inside `databaseHooks` is still unsupported ([`database.mdx#L874-L877`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/database.mdx#L874-L877)), and before-hooks must return Better Auth's logical field names rather than the app's database column names ([`database.mdx#L904`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/database.mdx#L904)).
- **Transaction semantics vary by adapter.** On MongoDB with transactions, a `before` database hook can fire multiple times on retry; on adapters without transactions enabled, an `after` hook still runs even when a later step in the same request fails ([`database.mdx#L884-L889`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/database.mdx#L884-L889)).

### 4. Database adapters and schema translation

Every query passes through the adapter factory in [`packages/core/src/db/adapter/factory.ts`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/core/src/db/adapter/factory.ts). The adapter layer introduces three permanent points of friction:

- **Split migration tooling.** `npx auth@latest migrate` and programmatic `getMigrations()` work only with the built-in Kysely adapter ([`database.mdx#L23, L62-L64`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/database.mdx#L23)). Drizzle and Prisma users must run `npx auth@latest generate` to regenerate ORM schema files and then run their ORM's migration tool.
- **Shallow runtime schema checks on ORMs.** Better Auth runs a startup schema check on first request, but for Drizzle and Prisma it only inspects the JavaScript schema objects, so it cannot tell whether migrations were actually applied to the database ([`database.mdx#L128-L130`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/database.mdx#L128-L130)).
- **Dual-write escape hatch.** Better Auth's own hooks documentation advises calling your ORM's `db` instance directly instead of `ctx.context.adapter`, yet warns that doing so bypasses `databaseHooks` and `secondaryStorage` unless you go back through `ctx.context.internalAdapter` ([`hooks.mdx#L268-L275`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/hooks.mdx#L268-L275)). Teams end up juggling two query APIs against the same tables.

### 5. `customSession` plugin limits

[`packages/better-auth/src/plugins/custom-session/index.ts`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/plugins/custom-session/index.ts) overrides `endpoints.getSession` (`GET /get-session`), delegates to core `getSession()` internally (lines 101-107), awaits the user callback `fn(response, ctx)`, and re-parses and forwards `Set-Cookie` headers (lines 111-121). The official docs enumerate three structural limits ([`session-management.mdx#L554-L587`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/session-management.mdx#L554-L587)):

1. **No automatic sibling-plugin type inference.** The `{ user, session }` passed to `fn` omits fields added by other plugins unless you hoist your config object out with `satisfies BetterAuthOptions` and pass it back into `customSession(fn, options)`.
2. **Broken client types across repo boundaries.** [`customSessionClient`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/plugins/custom-session/client.ts#L5-L13) is a thin wrapper around `InferServerPlugin<A, "custom-session">()`. When the client and server live in separate repos and cannot `import type { auth }`, client type inference for custom session fields breaks.
3. **Excluded from session caching.** Neither `session.cookieCache` nor `secondaryStorage` caches custom fields. `fn` executes dynamically on every session fetch, negating cookie-cache savings whenever custom data requires a database lookup.

### 6. Model and column renaming limits (database vs API)

Better Auth supports `modelName` and `fields` overrides on core tables and plugin schemas, translated at runtime by [`get-model-name.ts`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/core/src/db/adapter/get-model-name.ts) and [`get-field-name.ts`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/core/src/db/adapter/get-field-name.ts). That renaming stops at the SQL layer:

- **API and TypeScript names stay fixed.** Mapping `user.fields.name` to `"full_name"` renames the SQL column only; TypeScript types, HTTP payloads, and `databaseHooks` still expose `user.name` ([`database.mdx#L590-L593`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/database.mdx#L590-L593)).
- **Numeric IDs stay strings at the API boundary.** Even with `advanced.database.generateId: "serial"`, Better Auth types `id` as `string`, coerces values when reading/writing the DB, and requires string IDs in endpoint bodies ([`database.mdx#L813-L819`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/database.mdx#L813-L819)).
- **Mass-assignment footgun on `additionalFields`.** Extended user fields default to `input: true`, meaning sign-up bodies and OAuth `mapProfileToUser` can write them unless the developer remembers to set `input: false` on sensitive fields like `role` ([`typescript.mdx#L95-L110`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/typescript.mdx#L95-L110), [`database.mdx#L678-L688`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/database.mdx#L678-L688)).

### 7. Query optimization and join constraints

Database joins shipped as `experimental.joins` in v1.4 and moved to `advanced.database.joins` ([`database.mdx#L1021-L1044`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/database.mdx#L1021-L1044), [`options.mdx#L670`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/reference/options.mdx#L670)). It still defaults to `false`:

- **Default N+1 fallback.** When `joins` is off (or an adapter omits a joined relation key), [`factory.ts#L430-L445`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/core/src/db/adapter/factory.ts#L430-L445) falls back to `handleFallbackJoin`, running sequential queries and stitching rows together in JavaScript.
- **ORM relation coupling.** Enabling joins with Drizzle requires defining explicit Drizzle `relations(...)` (with matching `relationName` strings for multi-FK tables) and passing every relation object into the adapter's schema parameter ([`docs/content/docs/adapters/drizzle.mdx#L85-L116`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/adapters/drizzle.mdx#L85-L116)).
- **Bounded to Better Auth's own tables.** Joins only cover the ~50+ endpoints Better Auth has wired internally (`database.mdx#L1025`). An application still cannot join `session` + `user` + its own domain tables (`workspace`, `subscription`, `membership_permissions`) in a single query through `getSession`.

### 8. `authClient` plugin parity and TypeScript cost

[`createAuthClient`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/client/vanilla.ts#L79-L110) mirrors the server via a second, separate plugin registry:

- **Manual server/client plugin parity.** Almost every server plugin with client-callable endpoints requires registering a matching client plugin on `createAuthClient({ plugins: [...] })` ([`plugins.mdx#L27, L55-L57`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/plugins.mdx#L27)).
- **Dynamic `Proxy` routing.** [`createDynamicPathProxy`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/client/proxy.ts#L13-L69) turns nested camelCase property accesses into kebab-case HTTP paths (`/sign-in/email`) and guesses `POST` vs `GET` from whether the body object has keys unless the client plugin explicitly registers `pathMethods`.
- **Tight type coupling and compiler limits.** Client types rely on importing `typeof auth` (`inferAdditionalFields<typeof auth>()`, `customSessionClient<typeof auth>()`), which fails across separate projects unless fields are duplicated manually ([`typescript.mdx#L112-L147`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/typescript.mdx#L112-L147)). Deep conditional-type inference across many plugins hits TypeScript's type serialization ceiling; the official docs warn users to disable `declaration` and `composite` in `tsconfig.json` if inference overflows ([`typescript.mdx#L35-L38`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/typescript.mdx#L35-L38)).

### What Better Auth genuinely solves well

Critiquing Better Auth's seams without crediting its engineering would mislead Butter's design. Inspecting its source reveals hard-won production details that naive hand-rolled auth regularly misses:

- **Timing-attack resistant credential sign-in.** When an email is not found, [`sign-in.ts#L549-L554`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/api/routes/sign-in.ts#L549-L554) still runs `ctx.context.password.hash(password)` before rejecting so response latency does not leak account existence.
- **Non-blocking password hashing across runtimes.** [`crypto/password.ts`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/crypto/password.ts) picks `node:crypto` `scrypt` (offloaded to the libuv thread pool) on Node/Bun/Deno and falls back to `@noble/hashes` on edge runtimes.
- **OAuth state integrity and callback hygiene.** [`state.ts`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/state.ts) binds PKCE `codeVerifier`, `oauthState`, `idTokenNonce`, expiration, and server-only `serverContext` (distinct from untrusted client `additionalData`), while `oauth.mdx#L228` rejects caller overrides of reserved OAuth query parameters.
- **Origin/CSRF enforcement and cookie security.** [`origin-check.ts`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/api/middlewares/origin-check.ts) guards state-changing requests on slash-bounded paths; [`cookies.mdx`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/cookies.mdx) handles `__Secure-` prefixes, `HttpOnly`/`Secure` defaults, versioned secret rotation, and Safari ITP reverse-proxy guidance.
- **Safe cookie caching with mandatory DB re-checks on sensitive routes.** Even with `cookieCache` enabled (`compact`, `jwt`, or `jwe`), passkey registration, 2FA verification, device authorization, social account linking, and phone changes always bypass cookie cache and verify against the database or secondary storage ([`session-management.mdx#L253`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/session-management.mdx#L253)). `deferSessionRefresh` (`session-management.mdx#L56-L70`) prevents `GET /get-session` from writing to read replicas.
- **Atomic, IPv6-aware rate limiting.** [`rate-limit.mdx`](https://github.com/better-auth/better-auth/blob/v1.7.28/docs/content/docs/concepts/rate-limit.mdx) normalizes IPv6 representations and IPv4-mapped IPv6 addresses, buckets IPv6 traffic by `/64` subnet by default (per RFC 6177) to stop address-rotation bypasses, requires atomic `consume()` instead of racy `get`/`set`, and enforces strict `trustedProxies` / `ipAddressHeaders` rules.
- **Client session lifecycle plumbing.** [`session-atom.ts`](https://github.com/better-auth/better-auth/blob/v1.7.28/packages/better-auth/src/client/session-atom.ts) guards against module-singleton SSR session leakage (`hydrateSessionAtom` no-ops when `typeof window === "undefined"`), deduplicates concurrent mounts with `AbortController`, revalidates on focus, and broadcasts sign-out across tabs via `BroadcastChannel`.

---

## Lucia's deprecation and Pilcrow's Auth Book (The Copenhagen Book)

### Why Pilcrow deprecated Lucia, Arctic, and Oslo

In October 2024 ([`lucia-auth/lucia` Discussion #1707](https://github.com/lucia-auth/lucia/discussions/1707) and [Discussion #1714](https://github.com/lucia-auth/lucia/discussions/1714)), Pilcrow announced the deprecation of the `lucia` npm package (finalized March 2025). His diagnosis was blunt:

> "But why wouldn't a library be the answer? It seems like a such an obvious answer. One word - database. I talked about how database adapters were a significant complexity tax to the library. I think a lot of people interpreted that as maintenance burden on myself. That's not wrong, but the bigger issue is how the adapters limit the API. Adapters always felt like a black box to me as both an end user and a maintainer. It's very hard to design something clean around it and makes everything clunky and fragile, especially when you need to deal with TypeScript shenanigans." ([Discussion #1714](https://github.com/lucia-auth/lucia/discussions/1714))

He also noted that turning Lucia into a full framework like Auth.js would layer framework problems on top of adapter problems ([Discussion #1707](https://github.com/lucia-auth/lucia/discussions/1707)). Instead, he reduced Lucia to a single zero-dependency ~190-line reference file ([`lucia-auth/lucia/code/auth_session.ts`](https://github.com/lucia-auth/lucia/blob/main/code/auth_session.ts)) implementing split-token sessions (`id + "." + base64(secret)` with SHA-256 hashed secrets, constant-time byte comparison, sliding expiration, and `Sec-Fetch-Site` CSRF checks).

On July 29, 2026 ([`pilcrowonpaper.com/blog/18`](https://pilcrowonpaper.com/blog/18)), Pilcrow went further and deprecated **Arctic** (his OAuth 2.0 library) and almost all **Oslo** packages (keeping only `@oslojs/encoding` until `Uint8Array.toBase64()`/`fromBase64()` reach all active Node.js LTS releases, around 2028), while scaling `lucia-auth.com` back to just the Lucia v3 replacement file. His reason for deprecating Arctic directly informs Butter:

> "However, I think the OAuth 2.0 protocol isn't an ideal layer to abstract into a library and any library should target an abstraction one or two layer above the it. It's too tied down to the underlying HTTP protocol and implementations can extend the API however they want." ([`pilcrowonpaper.com/blog/18`](https://pilcrowonpaper.com/blog/18))

### What The Copenhagen Book / Pilcrow's Auth Book covers well

The original [`pilcrowonpaper/copenhagen`](https://github.com/pilcrowonpaper/copenhagen) repository (13 pages including `sessions.md`, `password-authentication.md`, `password-reset.md`, `email-verification.md`, `oauth.md`, `mfa.md`, `csrf.md`, `open-redirect.md`, `webauthn.md`) is now archived and replaced by **Pilcrow's Auth Book** at [`auth.pilcrowonpaper.com`](https://auth.pilcrowonpaper.com) ([source repo](https://github.com/pilcrowonpaper/auth.pilcrowonpaper.com)).

Its current 21 chapters ([`topics.json`](https://github.com/pilcrowonpaper/auth.pilcrowonpaper.com/blob/main/topics.json)) excel at explaining mechanisms from first principles:

- **Session design:** Clear distinction between general sessions and auth sessions, split `id.secret` tokens so lookup IDs are not sensitive while secrets are stored as SHA-256 hashes and verified in constant time.
- **Credentials and verification:** Password storage (Argon2id, bcrypt parameters), email address quirks, email verification codes, and email-code sign-in.
- **Browser security:** Client-side storage tradeoffs and modern CSRF protection (`Sec-Fetch-Site` + `Origin`).
- **Passkeys and WebAuthn internals:** Six dedicated chapters covering WebAuthn, authenticator data, CBOR encoding, client data, registration, and authentication, plus three chapters on ECDSA, RSA, and EdDSA signature schemes.
- **Runnable Go examples:** [`basic-example`](https://github.com/pilcrowonpaper/basic-example.auth.pilcrowonpaper.com) and [`passwordless-example`](https://github.com/pilcrowonpaper/passwordless-example.auth.pilcrowonpaper.com).

### Where existing auth guides stop (gaps Butter can fill)

Even the best existing auth guide leaves five concrete gaps for teams building a real target auth system with coding agents:

1. **Missing production auth capabilities in the active book.** `auth.pilcrowonpaper.com`'s 21 topics omit OAuth 2.0/OIDC (present in archived Copenhagen, dropped from the active rewrite), TOTP/recovery-code MFA, password reset flows, account linking and unverified-email takeover prevention, multi-tenancy/organizations, RBAC, API keys, and rate limiting.
2. **No TypeScript or PostgreSQL reference implementation.** The book's runnable examples are in Go, and `lucia-auth/lucia/code/auth_session.ts` is a minimal SQLite-flavored snippet without HTTP handlers, transactions, or error modeling.
3. **No schema-plus-domain composition patterns.** Guides explain isolated auth tables (`user`, `auth_session`), not how to design clean PostgreSQL schemas and single-query joins that combine session lookup with tenant membership, roles, and app-specific tables without N+1 queries.
4. **No client/SSR coordination or operational playbook.** There is no guidance on SSR hydration without cross-request leakage, cross-tab sign-out synchronization, read-replica safe session refreshes, secret rotation, transaction boundaries during password change + session revocation, or proxy-safe client IP extraction.
5. **Prose for humans, not verifiable specs for agents.** Human guides rely on readers carefully translating prose into code and remembering edge cases across files. They ship no executable security test suite, adversarial checklist, or invariant contract that a coding agent can run in CI to prove the target auth system actually upholds CSRF, timing, fixation, OAuth mix-up, and revocation guarantees.

---

## Other reference architectures: Auth.js, Ory Kratos, Clerk, and WorkOS

| Approach | Primary examples | Data & query boundary | What it wins | Where it breaks down |
| :--- | :--- | :--- | :--- | :--- |
| **In-app adapter library** | Better Auth, Auth.js | App DB behind adapter | Owns data; fast setup for standard flows; rich built-in security defaults | Adapter translation tax; locked API field names; plugin/hook seams; cannot join auth + app tables cleanly |
| **Self-hosted headless server** | Ory Kratos (+ Hydra) | Separate identity DB + HTTP API | Language-agnostic; strong isolation; full self-service flow engine | Second service/DB to operate; custom UI tied to flow state machine; webhook sync latency & failure modes; no SQL FKs/joins |
| **Managed hosted IAM** | Clerk, WorkOS AuthKit | Vendor cloud DB + JWKS JWTs + webhooks | Zero auth maintenance; drop-in UI; turnkey SAML SSO, SCIM, orgs, Radar/abuse defense | External source of truth; eventually consistent webhook DB sync; vendor lock-in & pricing at scale; third-party cookie/FAPI complexity |
| **Guide + owned target code** | Pilcrow's Auth Book, Butter | Native app DB & SQL | Zero adapter tax; total schema/naming freedom; single-query domain joins; zero hidden middleware | Team owns security invariants, updates, and edge cases; high risk of silent security regressions without strong reference code and automated verification |

### Auth.js / NextAuth.js

Auth.js ([`nextauthjs/next-auth`](https://github.com/nextauthjs/next-auth)) proved that Web-API-based open-source auth could run across JS runtimes, defaulting to encrypted JWE stateless cookies (`A256CBC-HS512`) with tab/window syncing and CSRF tokens on `POST` routes. Its structural weak spot was first-class database-backed password authentication:

- In [`packages/core/src/lib/utils/assert.ts#L187-L196`](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/lib/utils/assert.ts#L187-L196), configuring a Credentials-only provider with `session.strategy: "database"` throws `UnsupportedStrategy("Signing in with credentials only supported if JWT strategy is enabled")`.
- Its official [Credentials docs](https://github.com/nextauthjs/next-auth/blob/main/docs/pages/getting-started/authentication/credentials.mdx) warn that Credentials does not persist data and pushes password hashing, rate limiting, and password reset back onto the app.
- On September 22, 2025, Better Auth announced that Auth.js joined Better Auth for maintenance/security patches only, recommending new projects start elsewhere ([`better-auth.com/blog/authjs-joins-better-auth`](https://better-auth.com/blog/authjs-joins-better-auth), [`nextauthjs/next-auth` README](https://github.com/nextauthjs/next-auth/blob/main/README.md)).

### Ory Kratos

Ory Kratos ([`ory/kratos`](https://github.com/ory/kratos)) separates identity into a standalone Go service exposing a Public API (self-service browser/native flows for registration, login, recovery, verification, settings, MFA) and a private Admin API, with user traits defined in versioned JSON Schemas and external side effects wired through **Ory Actions** webhooks ([`ory/docs` webhooks guide](https://github.com/ory/docs/blob/master/docs/guides/integrate-with-ory-cloud-through-webhooks.mdx)).

- **What teams gain:** Clean separation of concerns across polyglot microservices; battle-tested flow state machine with built-in CSRF, hashing, and recovery.
- **What teams lose:** Identity data lives in Kratos's own database, breaking SQL foreign keys and single-query joins with app tables. Custom UIs must dynamically render Kratos's flow node tree. Self-hosted webhooks run inline with strict timeouts and without automatic background retry queues, turning user-table sync into a distributed-systems problem. OAuth2/OIDC provider capabilities require deploying a second service (Ory Hydra).

### Clerk

Clerk uses a **hybrid session architecture** ([`clerk.com/docs/how-clerk-works/overview`](https://clerk.com/docs/how-clerk-works/overview)): a long-lived `HttpOnly` **client token** on Clerk's Frontend API (FAPI) domain paired with a **60-second signed JWT session token** verified locally by your backend using cached **JWKS** public keys.

- **What teams gain:** Fast local verification without per-request DB hits, bounded ~60-second revocation lag, drop-in UI components, and built-in B2B organizations/RBAC embedded in JWT claims.
- **What teams lose:** Clerk is the source of truth, not your database. Clerk's own webhook documentation ([`clerk.com/docs/webhooks/sync-data`](https://clerk.com/docs/webhooks/sync-data)) warns explicitly that webhook deliveries are not guaranteed, can arrive duplicated or out of order, and are **eventually consistent**, creating race conditions if app code queries a synced local `users` table right after sign-up. You also accept third-party runtime availability, FAPI cookie/domain setup, and per-user/feature-tier pricing as you grow.

### WorkOS AuthKit

WorkOS AuthKit ([`workos.com/docs/user-management/sessions`](https://workos.com/docs/user-management/sessions)) focuses on B2B SaaS identity, pairing JWT access tokens (verified against `/.well-known/openid-configuration` JWKS) and rotating refresh tokens (with replay grace periods) with enterprise SAML 2.0/OIDC SSO, domain-based IdP routing, a customer-facing Admin Portal for IT admins, and SCIM Directory Sync provisioning tied directly to session revocation.

- **What teams gain:** They avoid the single nastiest long tail in auth: implementing and debugging SAML XML signature verification, per-IdP quirks across Okta/Entra/Google Workspace, and SCIM lifecycle sync.
- **What teams lose:** The same data-ownership and eventual-consistency boundary as Clerk, plus vendor coupling for core user and organization tables. Notably, enterprise SSO/SCIM is a strong argument for Butter staying honest about scope: an agent-built target auth system should own core app auth cleanly, while treating SAML/SCIM as an explicit boundary where specialized protocols or external brokers earn their keep.

---

## Primary security standards baseline

Any target auth system built with Butter should treat three current primary standards as its non-negotiable verification floor.

### 1. OWASP ASVS v5.0.0 (May 2025)

ASVS v5.0.0 ([`OWASP/ASVS` `v5.0.0_release`](https://github.com/OWASP/ASVS/releases/tag/v5.0.0_release)) moved Authentication to **V6**, Session Management to **V7**, Cookie Security to **V3.3**, and OAuth/OIDC to **V10**. Key verifiable requirements:

- **Passwords ([V6.2](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x15-V6-Authentication.md#v62-password-security)):** Minimum 8 characters (L1), 15 characters strongly recommended (6.2.1); permit at least 64 characters (L2, 6.2.9); no composition rules (6.2.5); allow paste/password managers (6.2.7); verify exact input without truncation or case folding (6.2.8); check against at least top 3,000 common passwords (L1, 6.2.4) and breached password lists (L2, 6.2.12); ban forced periodic rotation (L2, 6.2.10).
- **General auth & recovery ([V6.3-V6.4](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x15-V6-Authentication.md#v63-general-authentication-security)):** Rate-limit/anti-automation controls without enabling malicious account lockout (6.1.1, 6.3.1); no secret questions or password hints (6.4.2); password reset must never bypass enabled MFA (L2, 6.4.3); uniform error messages, HTTP statuses, and response times across login, registration, and forgot-password to prevent user enumeration (L3, 6.3.8); disallow email as an auth factor at L3 (6.3.6).
- **MFA & IdPs ([V6.5-V6.8](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x15-V6-Authentication.md#v65-general-multi-factor-authentication-requirements)):** Single-use TOTP/OTP/lookup secrets (6.5.1), CSPRNG generation (6.5.3), max 10-minute OOB lifetime and 30-second TOTP window (6.5.5), hash lookup secrets (<112 bits entropy with slow salted password hash; >=112 bits with standard cryptographic hash, 6.5.2), namespace federated identities by `(idp_id, provider_user_id)` so one IdP cannot spoof another (6.8.1), and validate assertion signatures plus `acr`/`amr`/`auth_time` when enforcing auth strength (6.8.2, 6.8.4).
- **Sessions ([V7.2-V7.5](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x16-V7-Session-Management.md)):** Reference session tokens generated via CSPRNG with at least 128 bits of entropy (7.2.3); issue a new session token and invalidate the old one on authentication and re-authentication to prevent session fixation (7.2.4); enforce documented inactivity and absolute maximum timeouts (7.3.1, 7.3.2); invalidate server-side on logout/expiry/account disable/delete (7.4.1, 7.4.2); offer revocation of all other sessions on password or MFA change (7.4.3); require full re-authentication before changing email, phone, MFA, or recovery settings (7.5.1).
- **Cookies ([V3.3](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x12-V3-Web-Frontend-Security.md)):** `Secure` attribute plus `__Host-` prefix (or `__Secure-` only when cross-host sharing is explicitly required, 3.3.1, 3.3.3), appropriate `SameSite` (3.3.2), `HttpOnly` for session tokens with no client-script exposure (3.3.4), and total cookie name+value under 4096 bytes (3.3.5).
- **OAuth & OIDC ([V10](https://github.com/OWASP/ASVS/blob/v5.0.0_release/5.0/en/0x19-V10-OAuth-and-OIDC.md)):** Transaction-bound unguessable PKCE/state/nonce bound to the user agent session (10.1.2, 10.2.1), mix-up defense via `iss` validation for multi-AS clients (10.2.2), exact redirect URI matching (10.4.1), single-use auth codes with token revocation on replay (10.4.2), ban Implicit and ROPC grants (10.4.4), require PKCE `S256` and forbid `plain` (10.4.6), refresh token rotation with reuse revocation or sender-constraining (10.4.5), and OIDC `nonce`, `iss`, `sub`, and `aud === client_id` validation (10.5.1-10.5.4).

### 2. NIST SP 800-63B-4 (August 2025)

NIST SP 800-63 Revision 4 ([`pages.nist.gov/800-63-4/sp800-63b.html`](https://pages.nist.gov/800-63-4/sp800-63b.html), published August 2025) updates the US federal identity baseline in four ways that directly shape modern auth design:

- **Synced vs device-bound passkeys (Appendix B, Sec. 2):** Formalizes **syncable authenticators** (cloud-synced passkeys) as acceptable up to **AAL2**, while reserving **AAL3** for hardware/device-bound non-exportable authenticators.
- **Phishing resistance at AAL2 (Sec. 2, Sec. 3.2.5):** Verifiers assessed at AAL2 must offer at least one phishing-resistant option (such as WebAuthn/passkeys). Human-transcribed codes (SMS/email/TOTP) are not phishing-resistant because they lack origin/channel binding.
- **Stricter single-factor password floor (Sec. 3.1.1.2):** Single-factor passwords **SHALL** be at least **15 characters** long (8 characters minimum only when paired with MFA). Composition rules and forced periodic rotation **SHALL NOT** be imposed; screening against breached, common, and context-specific blocklists is required.
- **Explicit session timeout ceilings (Sec. 5.2):** AAL2 sessions should enforce an overall maximum lifetime of no more than 24 hours and an inactivity timeout of no more than 1 hour; AAL3 requires an overall maximum of no more than 12 hours and recommends an inactivity timeout of no more than 15 minutes. (Consumer apps that deviate, e.g., 10-30 day rolling sessions, should document the risk decision per ASVS V7.1.1 and pair it with fresh-session step-up checks on sensitive mutations.)

### 3. RFC 9700 / BCP 240 (January 2025)

[RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.txt) (*Best Current Practice for OAuth 2.0 Security*, updating RFCs 6749, 6750, and 6819 and feeding OAuth 2.1) hardens every redirect-based OAuth integration:

- **Exact redirect URI matching (Sec. 2.1, 4.1.3):** Authorization servers MUST use exact string matching (except port numbers on localhost native-app callbacks). Neither clients nor ASs may act as open redirectors (Sec. 2.1, 4.11).
- **Universal PKCE with `S256` (Sec. 2.1.1, 4.8):** ASs MUST support PKCE and block PKCE downgrade attacks (rejecting a `code_verifier` if no `code_challenge` was sent). Public clients MUST use PKCE; confidential web clients are RECOMMENDED to use PKCE (or OIDC `nonce` with precautions). `S256` SHOULD be used; `plain` leaks the verifier in authorization requests.
- **CSRF and mix-up protection (Sec. 2.1, 4.4, 4.7):** Clients MUST bind authorization transactions to the user agent session via PKCE, OIDC `nonce`, or one-time `state`. Any client interacting with more than one authorization server MUST defend against mix-up attacks via the `iss` parameter ([RFC 9207](https://datatracker.ietf.org/doc/html/rfc9207)), ID Token `iss`, or distinct per-provider redirect URIs.
- **Deprecated grants and token replay (Sec. 2.1.2, 2.2, 2.4, 4.14):** Implicit grant (`response_type=token`) and Resource Owner Password Credentials (ROPC) are deprecated. Public-client refresh tokens MUST be sender-constrained (mTLS/DPoP) or rotated with reuse detection.

---

## What teams risk losing without an auth library

When a team ditches Better Auth or Clerk and asks a coding agent to build a bespoke target auth system from scratch, the agent rarely fails on the happy path ("hash password, insert session row, set cookie"). It fails quietly on the defensive mechanisms that libraries wire invisibly into every request:

1. **Timing and enumeration side channels.** Skipping a dummy Argon2id/scrypt hash when an email does not exist, returning different status codes or copy on sign-up/login/reset, or comparing session/OTP hashes with `===` instead of constant-time comparison (ASVS 6.3.8).
2. **Session fixation and stale-session bypasses.** Reusing an existing session cookie on login/privilege change instead of rotating the token (ASVS 7.2.4), or honoring a cached/JWT session during sensitive mutations like email change, password change, MFA removal, or account linking (ASVS 7.5.1).
3. **Cookie attribute and proxy edge cases.** Forgetting `__Host-`/`__Secure-` prefixes, `HttpOnly`, `Secure`, or `SameSite=Lax` (ASVS 3.3), missing `Sec-Fetch-Site`/`Origin` CSRF checks on cookie-authenticated `POST`/`PUT`/`DELETE` routes, or trusting raw `X-Forwarded-For` headers so attackers spoof their IP and bypass rate limits.
4. **OAuth subtle failure modes.** Omitting PKCE `S256` on confidential web clients, storing `state` without binding it to the initiating browser cookie (login CSRF), skipping `iss`/per-provider callback separation (mix-up attacks, RFC 9700 Sec. 4.4), allowing unvalidated `callbackUrl` open redirects (RFC 9700 Sec. 4.11), or auto-linking an OAuth login to an existing account by an **unverified** provider email (pre-hijacking account takeover).
5. **Non-atomic rate limiting and IPv6 bypasses.** Writing `SELECT count` then `UPDATE count + 1` (race condition under concurrent brute-force bursts), storing rate-limit counters only in process memory on multi-instance/serverless deployments, or keying IPv6 counters by full `/128` address instead of `/64` subnet.
6. **Non-atomic revocation and partial failures.** Updating a password without wrapping session revocation in a database transaction, leaving sessions live after password reset or account disable (ASVS 7.4.2, 7.4.3), or running password reset in a way that clears or bypasses MFA (ASVS 6.4.3).
7. **Broken email/identifier normalization and credential edge cases.** Failing to normalize Unicode/case consistently for lookup keys while preserving exact passwords without silent truncation (e.g., bcrypt's 72-byte cutoff) or whitespace stripping (ASVS 6.2.8).
8. **Client-side SSR leaks and multi-tab drift.** Storing client session state in a module-level singleton that leaks across concurrent SSR requests (as Better Auth explicitly guards against in `session-atom.ts#L28-L32`), or failing to propagate sign-out across open tabs.
9. **Ongoing security maintenance.** Auth libraries ship CVE patches via `npm update` (for instance, new proxy-header bypasses, OAuth provider quirks, or cookie-parsing advisories). An agent-maintained target auth system has no upstream package upgrade path unless Butter provides an explicit way to audit and update existing target codebases when guidance changes.

---

## Implications for Butter

1. **Eliminate the adapter tax completely.** Pilcrow's deprecation of Lucia and Better Auth's `factory.ts` complexity both point to the same root cause: abstracting over arbitrary ORMs and schemas destroys API cleanliness, breaks native SQL joins, and forces double naming (`modelName`/`fields` vs logical names). Butter's choice to target direct, owned SQL queries (PostgreSQL + Reylo in official reference code) directly removes the primary failure mode of auth libraries.
2. **Treat Better Auth's silent security controls as Butter's mandatory floor.** Butter's reference implementations and agent instructions must bake in every quiet defense listed above by default: constant-time comparisons, dummy password hashing on unknown users, `id.secret` hashed opaque session tokens, `__Host-` cookies, `Sec-Fetch-Site` + `Origin` CSRF checks, atomic SQL/Redis rate limiting with `/64` IPv6 normalization, transactional password-change + session revocation, fresh-session re-auth on sensitive mutations, and RFC 9700 OAuth hygiene (PKCE `S256`, browser-bound `state`, exact redirect matching, verified-email linking rules).
3. **Close the guide gap with executable verification.** Prose guides (even strong ones like Pilcrow's Auth Book) stop at explanation. Because Butter's primary builder is a coding agent, Butter should ship runnable security test suites and concrete checklists mapped directly to ASVS 5.0 V6/V7/V10, NIST SP 800-63B-4, and RFC 9700 so both the reference code and every target auth system can be mechanically verified.
4. **Stay honest about the enterprise boundary.** Hosted B2B platforms like WorkOS earn their complexity on SAML 2.0 XML edge cases and SCIM directory sync across dozens of IdPs. Butter v1 should focus on owning core auth, sessions, credentials, OAuth, verification/reset, and native SQL multi-tenancy cleanly rather than chasing Better Auth's 40+ plugin catalog.
