# Research: Client-Side Auth Coordination and Transport Boundaries

- **Ticket**: `slovakian/butter#91` (child of Wayfinder map `#86`)
- **Scope**: Browser/HTTP security invariants, RPC and non-HTTP transport boundaries (Effect v4 RPC, oRPC, tRPC, WebSockets, CLI, mobile/native, service-to-service), and client-side coordination patterns without a monolithic `authClient`.
- **Vocabulary**: **Butter** refers to the opinionated auth guide, reference implementations, and agent tooling published by this project; **target auth system** refers to the bespoke auth code an agent builds and maintains inside a team's application.

---

## Executive Summary

Authentication has a **hard browser/HTTP boundary** that no RPC abstraction or JavaScript client library can eliminate:

1. **Browser session security depends on HTTP headers that JavaScript is forbidden from reading or writing.** `HttpOnly` session cookies (`Set-Cookie` / `Cookie`) and anti-CSRF metadata (`Sec-Fetch-*`, `Origin`) are enforced by the user agent at the HTTP layer. Browser JS cannot mint `HttpOnly` cookies, cannot read `Set-Cookie` response headers, and cannot spoof `Sec-Fetch-*` or `Origin`.
2. **Effect v4 `RpcServer` cannot emit `Set-Cookie` headers or HTTP `302` redirects.** Source inspection of `Effect-TS/effect-smol` (`packages/effect/src/unstable/rpc/RpcServer.ts`) confirms that `makeProtocolWithHttpEffect` forwards incoming HTTP request headers into `RpcMiddleware`, but builds outgoing HTTP responses with only `{ contentType }`—and `RpcServer.layerHttp` defaults to WebSockets. By contrast, oRPC (`ResponseHeadersHandlerPlugin`) and tRPC (`fetchRequestHandler`'s `resHeaders`) expose mutable response headers on their HTTP adapters, though both lose `Set-Cookie` on WebSocket/peer transports and still require plain HTTP routes for OAuth redirects.
3. **Every target auth system cleanly splits into three layers**: a **transport-agnostic auth core** (Effect v4 services + Reylo SQL), a **thin HTTP auth boundary** (cookie-mutating endpoints, OAuth redirects/callbacks, CSRF enforcement), and **optional RPC / non-HTTP adapters** (validating incoming credentials and running non-cookie-mutating procedures).
4. **Monolithic plugin-mirroring `authClient` libraries duplicate state infrastructure apps already own.** Source inspection of Better Auth (`packages/better-auth/src/client/`) shows that `createAuthClient` bundles a dynamic path proxy, Nanostores atoms, a module-level singleton (requiring SSR guards to prevent cross-request leaks), `localStorage` cross-tab signaling, and paired client plugins. Teams using modern routers/query caches (Next.js, TanStack Start/Query, SvelteKit, React Router) get simpler, safer coordination from **thin, app-owned client helpers** (~20–60 lines per capability) built on native Web APIs (`fetch`, `PublicKeyCredential.*FromJSON`, `BroadcastChannel`, framework invalidation).

---

## 1. Browser and HTTP Invariants

Certain authentication guarantees exist *only* because the browser enforces them on HTTP messages. Moving these mechanics into JavaScript-accessible storage or framing protocols degrades the security model.

### 1.1 `HttpOnly` Session Cookies and Forbidden Fetch Headers

- **Cookie security attributes (`RFC 6265`, `draft-ietf-httpbis-rfc6265bis-22`)**:
  - `HttpOnly` isolates the session token from client-side scripts (`document.cookie` and the WHATWG Cookie Store API), preventing direct session-token exfiltration under XSS ([RFC 6265 §5.2.6](https://datatracker.ietf.org/doc/html/rfc6265#section-5.2.6); [draft-ietf-httpbis-rfc6265bis-22](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-22); [WHATWG Cookie Store API](https://cookiestore.spec.whatwg.org/)).
  - `Secure` restricts cookie transmission to HTTPS (and potentially trustworthy localhost origins).
  - `SameSite=Lax` (the modern browser default in `rfc6265bis`) withholds cookies on cross-site subrequests and cross-site `POST` forms while attaching them on top-level cross-site `GET` navigations (necessary for OAuth callbacks and email links). `SameSite=Strict` withholds them on all cross-site requests; `SameSite=None` requires `Secure`.
  - The `__Host-` cookie prefix (`draft-ietf-httpbis-rfc6265bis-22`) forces user agents to reject the cookie unless `Secure` is present, `Path=/`, and `Domain` is omitted—preventing subdomain cookie tossing and fixation.
- **Forbidden headers in the WHATWG Fetch Standard**:
  - `Set-Cookie` and `Set-Cookie2` are **forbidden response-header names** ([WHATWG Fetch Standard — Forbidden response-header name](https://fetch.spec.whatwg.org/#forbidden-response-header-name)): browsers process `Set-Cookie` natively into the cookie jar and hide it from JS `response.headers`.
  - `Cookie`, `Origin`, and all `Sec-*` / `Proxy-*` headers are **forbidden request-header names** ([WHATWG Fetch Standard — Forbidden request-header](https://fetch.spec.whatwg.org/#forbidden-request-header)): browser JS cannot forge or override them.
- **Consequence**: Browser JavaScript can *never* create, rotate, or clear an `HttpOnly` session cookie without receiving an HTTP `Set-Cookie` response header from the server. Storing bearer/session tokens in `localStorage` or `sessionStorage` to bypass HTTP cookies exposes them to any XSS payload ([Pilcrow's Auth Book — Browser Client-Side Storage](https://auth.pilcrowonpaper.com/browser-client-side-storage); [Sessions](https://auth.pilcrowonpaper.com/sessions)).

### 1.2 Top-Level OAuth 2.0/2.1 Redirects, PKCE Callbacks, and the BFF Boundary

- **Mandatory modern OAuth baselines**:
  - [RFC 9700 (BCP 240 — OAuth 2.0 Security Best Current Practice)](https://datatracker.ietf.org/doc/html/rfc9700) mandates **PKCE** ([RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636)) for authorization code flows, forbids the Implicit and Resource Owner Password Credentials grants, and requires exact redirect URI matching and CSRF/mix-up defenses (`state` / `iss`).
  - [draft-ietf-oauth-v2-1-17](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-17) consolidates these requirements into OAuth 2.1.
  - [draft-ietf-oauth-browser-based-apps-27](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps-27) recommends the **Backend-for-Frontend (BFF)** architecture for browser applications: the server acts as a confidential OAuth client, performs the authorization code exchange on the backend, keeps provider tokens off the browser, and issues an `HttpOnly`, `Secure`, `SameSite` session cookie to the browser.
- **Why OAuth cannot run purely over `fetch()` or RPC**:
  1. **Top-level navigation requirement**: Authorization servers (Google, GitHub, Microsoft, Okta) prohibit rendering their login/consent pages inside iframes (`X-Frame-Options` / `CSP frame-ancestors`) and do not expose CORS-readable authorization endpoints. Login *must* initiate a top-level browser navigation (`GET /auth/oauth/:provider` returning HTTP `302` or client `window.location.assign`).
  2. **Callback survival with `SameSite=Lax`**: Before redirecting to the provider, the server stores `state` and PKCE `code_verifier` in short-lived `HttpOnly; Secure; SameSite=Lax` cookies. When the provider redirects the browser back via top-level `GET /auth/oauth/:provider/callback?code=...&state=...`, `SameSite=Lax` attaches those cookies—whereas `SameSite=Strict` would strip them on the cross-site redirect from the IdP ([Copenhagen Book — OAuth](https://github.com/pilcrowonpaper/copenhagen/blob/main/pages/oauth.md)).
  3. **Atomic session establishment**: The callback handler validates `state`, exchanges `code` + `code_verifier` server-to-server, creates the session row, sets the `HttpOnly` session cookie, clears the transient OAuth cookies, and issues a `302` redirect to the post-login app route.

### 1.3 WebAuthn / Passkey Origin and RP ID Binding

- **Browser-enforced cryptographic binding (`W3C WebAuthn Level 3`)**:
  - WebAuthn ceremonies (`navigator.credentials.create()` and `navigator.credentials.get()`) only run in a **Secure Context** (HTTPS or `localhost`) ([W3C WebAuthn Level 3](https://www.w3.org/TR/webauthn-3/)).
  - The Relying Party ID (`rpId`) must be the caller's effective domain or a registrable domain suffix of it; authenticators bind credentials to `SHA-256(rpId)` so a phishing domain cannot replay assertions.
  - The browser synthesizes `clientDataJSON` (`CollectedClientData`) containing `type` (`"webauthn.create"` / `"webauthn.get"`), the server-issued `challenge`, the exact caller `origin`, and `crossOrigin` ([Pilcrow's Auth Book — WebAuthn Client Data](https://auth.pilcrowonpaper.com/webauthn-client-data)). The authenticator signs over `authenticatorData || SHA-256(clientDataJSON)`, and the server must verify `origin`, `rpIdHash`, `type`, and single-use `challenge` freshness.
  - Cross-origin iframes cannot invoke WebAuthn unless explicitly delegated via the `publickey-credentials-get` / `publickey-credentials-create` Permissions Policy headers and `allow` attributes.
- **Level 3 ergonomic primitives**:
  - `PublicKeyCredential.parseCreationOptionsFromJSON()` and `PublicKeyCredential.parseRequestOptionsFromJSON()` natively decode base64url JSON payloads from the server into `ArrayBuffer`s without third-party browser wrappers ([W3C WebAuthn Level 3](https://www.w3.org/TR/webauthn-3/)).
  - Conditional mediation (`mediation: "conditional"` on `get()`, probed via `PublicKeyCredential.getClientCapabilities()`) integrates discoverable passkeys directly into browser autofill without modal dialogs.
- **Transport split**: Unlike OAuth, WebAuthn uses **zero HTTP redirects**—it is a two-roundtrip JSON ceremony (`options` → browser `navigator.credentials.*` → `verify`). Step 1 (`options`) can live in RPC or HTTP; Step 2 (`verify`) *still* requires an HTTP response capable of setting an `HttpOnly` session cookie when authenticating a browser.

### 1.4 CORS and Fetch Metadata CSRF Defenses

- **CORS credential rules ([WHATWG Fetch Standard](https://fetch.spec.whatwg.org/))**:
  - Cross-origin `fetch()` omits cookies by default (`credentials: "same-origin"`). Sending cookies across origins (e.g., `app.example.com` → `api.example.com`) requires `credentials: "include"` on the client, `Access-Control-Allow-Credentials: true` on the server, and an **explicit** `Access-Control-Allow-Origin` header (wildcard `*` is rejected by browsers when credentials are included).
- **Fetch Metadata Resource Isolation Policy ([W3C Fetch Metadata Request Headers](https://www.w3.org/TR/fetch-metadata/))**:
  - Browsers automatically attach `Sec-Fetch-Site` (`same-origin` | `same-site` | `cross-site` | `none`), `Sec-Fetch-Mode` (`navigate` | `cors` | `no-cors` | `same-origin`), and `Sec-Fetch-Dest` (`document` | `empty` | `iframe` | …) on HTTPS requests. Because `Sec-*` headers are forbidden request headers, JavaScript cannot forge them.
  - Combined with `Origin` header validation (for non-safe methods `POST`/`PUT`/`PATCH`/`DELETE`) and `SameSite=Lax` cookies, rejecting `Sec-Fetch-Site: cross-site` on state-changing requests (and on `GET` endpoints that must not execute via cross-site top-level navigations) eliminates classic CSRF without per-form synchronizer tokens ([Pilcrow's Auth Book — CSRF](https://auth.pilcrowonpaper.com/csrf)).
  - Note: Plain HTTP (`http://` outside localhost) and older user agents omit `Sec-Fetch-*`, so production servers validate `Origin` against an allowlist as a companion check and set `Vary: Sec-Fetch-Site, Origin` whenever responses vary on them.

### 1.5 SSR and RSC Cookie Forwarding and Read-Only Render Boundaries

Server-side rendering introduces a second HTTP hop (`Browser → SSR Server → Auth/API Server`) with two invariant constraints:

1. **Cookie forwarding is manual on internal server-to-server fetches**: Server-side `fetch()` has no browser cookie jar. Either the SSR server calls the auth core in-process (the cleanest pattern when Effect v4 + Reylo run in the same app server) or it explicitly forwards the incoming `Cookie` header—as SvelteKit automates for relative requests via `event.fetch` / `handleFetch` ([SvelteKit Hooks Docs](https://svelte.dev/docs/kit/hooks#Server-hooks-handleFetch)) and Effect RPC supports via `RpcClient.withHeaders`.
2. **Streaming SSR renders are read-only for `Set-Cookie`**: Once HTTP response headers flush to begin streaming HTML/RSC payloads, the server can no longer emit `Set-Cookie`.
   - **Next.js App Router**: `cookies()` from `next/headers` is strictly **read-only** in Server Components; `.set()` / `.delete()` throw unless executed inside a **Route Handler**, **Server Action**, or **Middleware** ([Next.js `cookies` Docs](https://nextjs.org/docs/app/api-reference/functions/cookies)).
   - **SvelteKit**: `event.cookies.set()` works in `hooks.server.ts`, `+page.server.ts` loads/actions, and `+server.ts` before headers flush ([SvelteKit Load & Cookies](https://svelte.dev/docs/kit/load#Cookies)).
   - **TanStack Start**: `getCookie` / `setCookie` / `deleteCookie` from `@tanstack/react-start/server` execute inside Server Functions (`createServerFn`) and server routes, which act as the HTTP response boundary ([TanStack Start Authentication Guide](https://tanstack.com/start/latest/docs/framework/react/guide/authentication)).
- **Consequence for sliding sessions**: If a target auth system extends session expiry (sliding expiration) or rotates cookies, a read-only Server Component render *cannot* write the updated `Set-Cookie` header. Renewal must occur either in server middleware before rendering, in a Route Handler / Server Action, or via a split read/refresh signal (e.g., `GET` indicates refresh needed → client triggers `POST`).

---

## 2. RPC Systems and Transport Boundaries

RPC frameworks optimize for typed procedure calls, batching, streaming, and transport portability (HTTP, WebSockets, MessagePort, Worker, stdio). That portability directly conflicts with HTTP-only browser auth mechanics—and different TypeScript RPC stacks resolve the tension in markedly different ways.

### 2.1 Capability Comparison Across Transport Layers

| Capability | Effect v4 `RpcServer` (`effect/unstable/rpc`) | Effect v4 `HttpRouter` / `HttpApi` (`effect/unstable/http*`) | oRPC `RPCHandler` (`@orpc/server`) | tRPC `fetchRequestHandler` (`@trpc/server`) |
|---|---|---|---|---|
| **Read incoming `Cookie` / `Authorization` / `Origin`** | **Yes** — HTTP & WS upgrade `request.headers` are prepended to `message.headers` and passed into `RpcMiddleware` (`options.headers: Headers`) | **Yes** — `HttpServerRequest.headers`, `Cookies`, and `HttpApiSecurity` (`cookie` / `header` / `query` / `Basic`) | **Yes** — `RequestHeadersHandlerPlugin` injects `context.reqHeaders` + `getCookie()` | **Yes** — `createContext({ req, resHeaders })` |
| **Emit `Set-Cookie` from a handler** | **No** — `makeProtocolWithHttpEffect` builds `HttpServerResponse` with only `{ contentType }`; no mutable response headers channel | **Yes** — `HttpServerResponse.setCookie`, `removeCookie`, `setCookies` | **Yes (HTTP only)** — `ResponseHeadersHandlerPlugin` injects `context.resHeaders` + `setCookie()` / `deleteCookie()` | **Yes (HTTP only)** — `ctx.resHeaders.append("Set-Cookie", ...)` |
| **Safe `Set-Cookie` under HTTP batching** | N/A (no outbound headers) | N/A (individual HTTP endpoints) | **Yes** — `BatchHandlerPlugin` lifts sub-response `set-cookie` onto the outer HTTP response and strips it from JSON sub-response bodies | **Shared** — batched procedures share one `resHeaders` `Headers` instance |
| **Emit HTTP `302` redirects (OAuth start/callback)** | **No** | **Yes** — `HttpServerResponse.redirect` | **No** (RPC returns serialized envelopes; use plain HTTP route) | **No** (RPC returns JSON envelopes; use plain HTTP route) |
| **Typed domain errors** | **Yes** — `Schema.TaggedError` via `Rpc` & `RpcMiddleware` error schemas | **Yes** — `HttpApiEndpoint` / `HttpApiMiddleware` Schema errors | **Yes** — `ORPCError` / typed error maps | **Yes** — `TRPCError` (fixed code union + cause) |
| **WebSocket / non-HTTP transport** | **Yes** — `layerHttp` defaults to `"websocket"`; also Socket, Stdio, Worker | HTTP only | **Yes** — `websocket`, `crossws`, `message-port`, `standard-peer` adapters (no `Set-Cookie`) | **Yes** — `wsLink` (`connectionParams`; no `Set-Cookie`) |

### 2.2 Effect v4 RPC (`effect/unstable/rpc`) vs. Effect v4 HTTP (`effect/unstable/http`, `httpapi`)

Direct inspection of `Effect-TS/effect-smol` (the Effect v4 incubation repository merged into Effect v4) reveals a decisive architectural boundary:

- **Inbound headers work cleanly**:
  - In `packages/effect/src/unstable/rpc/RpcServer.ts` (`makeProtocolWithHttpEffect`, lines 1010–1060), the HTTP transport reads `request.headers` from `HttpServerRequest` and prepends them onto each decoded RPC message's `headers` (`requestHeaders.concat(message.headers)`).
  - The WebSocket protocol (`makeProtocolWithHttpEffectWebsocket` + `onSocket`, lines 918–921 and 1461–1462) similarly prepends the HTTP Upgrade request's headers onto incoming RPC messages.
  - `packages/effect/src/unstable/rpc/RpcMiddleware.ts` (lines 47–58) passes `{ client, requestId, rpc, payload, headers }` to server middleware, allowing middleware to parse `Cookie` or `Authorization`, verify sessions against Reylo SQL, inject an authenticated `CurrentUser` / `CurrentSession` service into the handler's Effect context (`Provides`), and fail with a Schema-typed error (`E`).
  - On the client side (`packages/effect/src/unstable/rpc/RpcClient.ts`, lines 812–829), `RpcClient.withHeaders` (backed by `CurrentHeaders`) and `RpcMiddleware.layerClient` allow SSR servers, CLIs, and backend services to attach `Cookie` or `Authorization` headers to outgoing RPC calls.
- **Outbound HTTP response control does NOT exist in `RpcServer`**:
  - `makeProtocolWithHttpEffect` (`RpcServer.ts`, lines 1069–1090) encodes queued RPC frames and returns `HttpServerResponse.text(...)`, `HttpServerResponse.uint8Array(...)`, or `HttpServerResponse.stream(...)` with **only `{ contentType: serialization.contentType }`**. Neither RPC handlers nor `RpcMiddleware` receive a mutable response-headers bag or an `HttpServerResponse` transformer.
  - Moreover, `RpcServer.layerHttp` (`RpcServer.ts`, lines 791–819) defaults to `protocol: "websocket"`, and `makeProtocolHttp` mounts all procedures behind a single `POST` route (`RpcServer.ts`, lines 1132–1144). Over WebSocket or streaming NDJSON, HTTP response headers are already flushed before RPC handlers finish executing.
- **Effect v4 `HttpRouter` and `HttpApi` own the HTTP boundary natively**:
  - `packages/effect/src/unstable/http/HttpServerResponse.ts` provides `setCookie`, `setCookies`, `removeCookie`, and `redirect` (lines 142, 563, 600, 809).
  - `packages/effect/src/unstable/httpapi/HttpApiSecurity.ts` (lines 25–99) and `HttpApiMiddleware.ts` (lines 64–101) model `Http` (Bearer), `ApiKey` (`in: "header" | "query" | "cookie"`), and `Basic` credentials with Schema-typed errors and full `HttpServerResponse` access.
  - **Takeaway for Butter**: In an Effect v4 app, **core auth services** are shared across both layers, **`HttpRouter` / `HttpApi`** handles cookie-setting endpoints and OAuth redirects, and **`RpcServer` + `RpcMiddleware`** consumes the resulting `Cookie` or `Authorization` header for authenticated application RPCs and non-cookie auth procedures.

### 2.3 oRPC (`unnoq/orpc`)

oRPC's HTTP handler is deliberately HTTP-aware, pushing the RPC boundary closer to standard HTTP than Effect RPC does:

- **Mutable response headers & cookie helpers**: `RequestHeadersHandlerPlugin` and `ResponseHeadersHandlerPlugin` (`packages/server/src/plugins/response-headers.ts`) inject `context.reqHeaders` and `context.resHeaders` (`Headers`), used with `getCookie`, `setCookie`, and `deleteCookie` from `@orpc/server/helpers` ([oRPC Response Headers Plugin](https://orpc.dev/docs/plugins/response-headers); [oRPC Cookies Helpers](https://orpc.dev/docs/helpers/cookie)).
- **Security-conscious batching**: In `packages/server/src/plugins/batch.ts` (lines 78–101, 227–250), `BatchHandlerPlugin` sets `ResponseHeadersHandlerPlugin` to run per sub-response (`before = ['~batch']`), then:
  1. `liftSubresponseHeaders` merges every sub-response's `set-cookie` headers onto the outer HTTP batch response and strips `set-cookie` from the JSON sub-response bodies *specifically so JavaScript cannot read `HttpOnly` cookies out of the batch payload*.
  2. `mapSubrequest` gives the outer HTTP transport's `cookie` and `origin` headers precedence over client-authored sub-request headers so payloads cannot spoof browser-injected headers.
- **Built-in Fetch Metadata CSRF guard for `GET` procedures**: `GetMethodCsrfProtectionHandlerPlugin` (`packages/server/src/plugins/get-method-csrf-protection.ts`) inspects `Sec-Fetch-Site`, `Sec-Fetch-Mode`, and `Sec-Fetch-Dest` and rejects cross-site or externally triggered top-level `GET` document navigations (`mode === 'navigate' && dest === 'document'`)—the exact case where `SameSite=Lax` cookies ride along.
- **Hard limits that still remain**: Over oRPC's WebSocket / `crossws` / `message-port` / `standard-peer` adapters (`packages/server/src/adapters/websocket/handler.ts`, `standard-peer/utils.ts`), responses are framed peer messages rather than HTTP responses, so `Set-Cookie` is ignored by the browser. And OAuth login/callback still require real HTTP redirect routes outside `RPCHandler`.

### 2.4 tRPC (`trpc/trpc`)

- **HTTP Fetch adapter**: `fetchRequestHandler` (`packages/server/src/adapters/fetch/fetchRequestHandler.ts`) allocates a `const resHeaders = new Headers()` per HTTP request and passes `{ req, resHeaders }` to `createContext`. Mutations can call `ctx.resHeaders.append("Set-Cookie", ...)` on HTTP transport ([tRPC Fetch Adapter](https://trpc.io/docs/server/adapters/fetch)).
- **Cross-origin & batching nuances**: Cross-origin cookie transport requires customizing `httpBatchLink` / `httpLink`'s `fetch` with `credentials: "include"` alongside explicit server CORS (`Access-Control-Allow-Credentials: true`, non-wildcard origin). Under `httpBatchLink`, batched procedures share a single `resHeaders` instance and HTTP response status semantics.
- **WebSockets (`wsLink`)**: Because browser `new WebSocket()` cannot attach custom headers and post-upgrade frames cannot carry `Set-Cookie`, tRPC uses `connectionParams` (`opts.info.connectionParams`) to pass tokens when opening a socket ([tRPC WebSockets Docs](https://trpc.io/docs/server/websockets)). That forces either a non-`HttpOnly` token or a short-lived HTTP-minted WebSocket ticket.

### 2.5 Partitioning Auth Operations: Pure RPC vs. Companion HTTP Endpoints

| Auth Operation | Requires `Set-Cookie` or `302`? | Effect v4 `RpcServer` | oRPC / tRPC (HTTP adapter) | Required Boundary |
|---|---|---|---|---|
| **OAuth start (`GET /auth/oauth/:p`) & callback (`GET /auth/oauth/:p/callback`)** | **Yes** (`302` + `state`/`PKCE` & session `Set-Cookie`) | Cannot live in RPC | Cannot live in RPC | **HTTP Route** (`HttpRouter` / framework route) |
| **Email/password sign-in, sign-up, sign-out** | **Yes** (`Set-Cookie` / clear cookie) | **No** (for browsers); Yes for token-returning native/CLI clients | Yes (HTTP adapter only; breaks on WS) | **HTTP Route** for browsers (or HTTP-only oRPC/tRPC) |
| **Passkey verify (`verifyAuthentication`)** | **Yes** (`Set-Cookie` on login) | **No** (for browsers) | Yes (HTTP adapter only) | **HTTP Route** for browsers |
| **OTP / Magic-link verify** | **Yes** (`Set-Cookie`; magic link also lands via HTTP navigation) | **No** (for browsers) | Yes (OTP over HTTP adapter only) | **HTTP Route** |
| **Sliding session cookie rotation / refresh** | **Yes** (`Set-Cookie`) | **No** | Yes (HTTP adapter only) | **HTTP Route / Middleware** |
| **Passkey challenge generation (`options`)** | No (if challenge stored in DB/cache; Yes if stored in cookie) | **Yes** | **Yes** | **RPC or HTTP** |
| **Send OTP / Send magic link / Request password reset** | No (server sends email/SMS, stores token in DB) | **Yes** | **Yes** | **RPC or HTTP** |
| **`getSession` / `me` (read-only), `listSessions`, `revokeSession` (other device)** | No | **Yes** (via `RpcMiddleware` reading `Cookie`/`Authorization`) | **Yes** | **RPC or HTTP** |
| **Profile update, password change (without rotating current cookie), API key CRUD, org/role queries** | No | **Yes** | **Yes** | **RPC or HTTP** |

---

## 3. Non-HTTP and Non-Browser Transports

Browser cookie invariants do not exist in CLI, native mobile, WebSocket, or service-to-service contexts. Target auth systems serving non-browser clients must avoid forcing cookie assumptions onto them—and avoid weakening browser security (e.g., turning off `HttpOnly` or accepting bearer tokens from `localStorage`) to unify transports.

### 3.1 Mobile and Native Applications (`RFC 8252` — BCP 212)

- **External User-Agents + PKCE**: [RFC 8252 (OAuth 2.0 for Native Apps)](https://datatracker.ietf.org/doc/html/rfc8252) mandates using the OS **external user-agent** (iOS `ASWebAuthenticationSession`, Android Chrome Custom Tabs) rather than embedded WebViews, combined with **PKCE** (`RFC 7636`, `RFC 9700`). Embedded WebViews allow the host app to snoop credentials and break shared SSO sessions and passkey/WebAuthn autofill.
- **Redirect URIs**: Prefer claimed HTTPS **App Links / Universal Links** (`RFC 8252 §7.2`) over private-use custom URI schemes (`myapp://`, `RFC 8252 §7.1`), which any installed app can hijack on some platforms.
- **Token storage & transport**: Native apps lack a browser cookie jar bound to an origin; they store opaque session/refresh tokens in OS hardware-backed storage (iOS Keychain / Android Keystore) and transmit them via `Authorization: Bearer <token>` over HTTPS—which works identically over HTTP APIs and Effect RPC / oRPC / tRPC.

### 3.2 CLI and Input-Constrained Devices (`RFC 8628` & `RFC 8252 §7.3`)

Two primary-source patterns cover CLIs cleanly without pasting raw passwords or long-lived secrets into terminals:

1. **OAuth 2.0 Device Authorization Grant ([RFC 8628](https://datatracker.ietf.org/doc/html/rfc8628))**: Best when the CLI may run over SSH, in containers, or on headless machines. The CLI calls `POST /auth/device/code` → receives `{ device_code, user_code, verification_uri, interval, expires_in }` → displays the short `user_code` and URL → user authenticates in *any* browser (using normal HTTP cookies/OAuth/passkeys) → CLI polls `POST /auth/device/token` handling standard `authorization_pending`, `slow_down`, `access_denied`, and `expired_token` errors (`RFC 8628 §3.5`) until granted an opaque CLI token stored in OS keychain or `0600` config file.
2. **Loopback Interface Redirection ([RFC 8252 §7.3](https://datatracker.ietf.org/doc/html/rfc8252#section-7.3))**: Best for local developer CLIs with a desktop browser. The CLI binds an ephemeral port on `127.0.0.1` / `[::1]`, opens the system browser with PKCE (`code_challenge`), receives the `code` on `http://127.0.0.1:<port>/callback`, and exchanges it for a CLI bearer token.

### 3.3 WebSockets (`RFC 6455` & WHATWG WebSockets Standard)

WebSockets cross an HTTP-to-frame boundary with four sharp constraints:

1. **No custom headers in browser `new WebSocket(url, protocols)`**: The [WHATWG WebSockets Standard](https://websockets.spec.whatwg.org/) constructor accepts only `url` and optional subprotocols (`Sec-WebSocket-Protocol`); browsers cannot attach `Authorization` headers on Upgrade.
2. **Cross-Site WebSocket Hijacking (CSWSH)**: On the initial HTTP Upgrade handshake, browsers *do* attach same-site / matching cookies automatically, and WebSockets are **not** protected by CORS preflights. [RFC 6455 §10.2](https://datatracker.ietf.org/doc/html/rfc6455#section-10.2) explicitly requires servers to validate the `Origin` header during the Upgrade handshake and reject unrecognized origins with `403`.
3. **No `Set-Cookie` after Upgrade**: Once `101 Switching Protocols` completes, the server can never mutate browser cookies over WebSocket frames.
4. **Recommended patterns**:
   - *Same-origin browser WS*: Validate `Origin` + `HttpOnly` session cookie during the HTTP Upgrade handshake (which Effect v4 `RpcServer.makeProtocolWithHttpEffectWebsocket` already forwards onto `message.headers`), and close the socket or fail in-band when the session expires/revokes.
   - *Cross-origin browser WS*: Mint a short-lived, single-use **WebSocket ticket** (`15–30s` TTL, bound to `sessionId`) via an authenticated HTTP `POST` (protected by `HttpOnly` cookie + CSRF checks), then pass the ticket during WS connection (e.g., first auth frame or `connectionParams`, avoiding query strings where proxy logs capture secrets).

### 3.4 Service-to-Service / Machine-to-Machine (M2M)

Non-interactive backend workloads have no user-agent, no cookie jar, and no CSRF vector. Standard primary-source mechanisms are:
- **OAuth 2.0 Client Credentials Grant** ([RFC 6749 §4.4](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4)) for scoped short-lived access tokens.
- **Mutual-TLS (mTLS) client authentication & certificate-bound tokens** ([RFC 8705](https://datatracker.ietf.org/doc/html/rfc8705)) or **JWT client assertions (`private_key_jwt`)** ([RFC 7523](https://datatracker.ietf.org/doc/html/rfc7523)) to avoid shared static client secrets.
- **Prefix-scoped API keys** (hashed at rest like passwords/tokens, sent via `Authorization: Bearer <key>`), cleanly verified inside `RpcMiddleware` or `HttpApiMiddleware` across any transport.

---

## 4. Client Coordination Without a Monolithic `authClient`

### 4.1 Anatomy of a Monolithic Plugin-Mirroring Client (Better Auth Primary-Source Analysis)

Inspecting `better-auth/better-auth` (`packages/better-auth/src/client/`) shows what a monolithic `authClient` actually does under the hood—and the structural trade-offs it introduces:

1. **Dynamic JS Proxy over HTTP (`vanilla.ts`, `proxy.ts`)**: `createAuthClient` wraps `@better-fetch/fetch` in `createDynamicPathProxy`, translating property chains (`authClient.signIn.email(...)`) into kebab-case HTTP paths (`/sign-in/email`) using a `knownPathMethods` table. Because types are inferred from server plugin types, every server plugin must ship a matching client plugin (`twoFactorClient`, `passkeyClient`, `organizationClient`, etc.) to register `pathMethods`, custom actions, `fetchPlugins`, and `atomListeners`.
2. **Parallel reactive state layer (`session-atom.ts`, `proxy.ts:81-94`)**: Better Auth embeds **Nanostores** (`useSession` atom + `$sessionSignal`). When a proxied fetch succeeds, `proxy.ts` matches `routePath` against `atomListeners` and flips boolean signal atoms inside `setTimeout(..., 10)` to trigger a session re-fetch. This duplicates caching, invalidation, and pending states that apps already manage in TanStack Query, Next.js Router, SvelteKit, or React Router.
3. **Module-level SSR singleton hazard (`session-atom.ts:28-32`)**: Because `authClient` is typically instantiated once at module scope, Better Auth must explicitly guard `hydrateSessionAtom` with `if (typeof window === "undefined") return;`—noting in source comments: *"The client is a module-level singleton, so writing during SSR would leak one request's session into concurrent requests sharing the same process."*
4. **Split GET/POST sliding-refresh dance (`session-atom.ts:138-159`)**: To avoid mutating cookies on `GET /get-session`, the server returns `{ needsRefresh: true }` and the client atom issues a follow-up `POST /get-session`—an extra network roundtrip driven by keeping session management inside a generic client atom rather than server middleware or framework loaders.
5. **Cross-tab and lifecycle orchestration (`broadcast-channel.ts`, `session-refresh.ts`)**: Better Auth implements `WindowBroadcastChannel` using `localStorage` + `window.addEventListener("storage")` (despite the file name) plus `visibilitychange` focus refetching (5-second rate limit) and `online` listeners.
6. **Multi-step plugin interception (`plugins/two-factor/client.ts`, `packages/passkey/src/client.ts`)**: `twoFactorClient` attaches a `fetchPlugins` `onSuccess` hook watching for `context.data?.twoFactorRedirect` to intercept login responses and redirect; `passkeyClient` wraps `@simplewebauthn/browser` (`startAuthentication` / `startRegistration`) across two `$fetch` calls.

**Key insight**: None of these behaviors require a dynamic proxy, a parallel Nanostores store, or server-to-client plugin mirroring. Every piece maps directly to small, inspectable Web Platform primitives and the team's existing router/query cache.

### 4.2 Thin, App-Owned Client Coordination Patterns

Instead of a monolithic `authClient`, a target auth system coordinates multi-step browser flows using **thin, per-capability helpers** (typically 20–60 lines each) owned directly inside the application:

#### 1. OAuth Redirect + Callback
- **Initiation**: Plain `<a href="/auth/oauth/google">` (or `window.location.assign("/auth/oauth/google?next=...")`)—never `fetch()`.
- **Server boundary**: `GET /auth/oauth/:provider` sets short-lived `HttpOnly; Secure; SameSite=Lax` `state` + PKCE `code_verifier` cookies and returns `302`. `GET /auth/oauth/:provider/callback` validates them, creates the session, sets `__Host-session`, clears transient cookies, and returns `302` to the validated relative `next` path.
- **Client state**: Full-document landing naturally hydrates fresh SSR state; no client OAuth SDK needed.

#### 2. OTP and Magic Link Flows
- **Email/SMS OTP**: Step 1 (`POST /auth/otp/request` or RPC) issues a hashed, expiring code. Step 2 (`POST /auth/otp/verify` HTTP route) verifies the code, sets the `HttpOnly` session cookie, and returns `{ ok: true }` (or a structured `stepUpRequired` / `twoFactorRequired` discriminated union—explicitly handled by the form component instead of hidden `fetchPlugins` redirects).
- **Magic Links (same-device vs. cross-device)**:
  - *Same-device*: Email link opens `GET /auth/magic-link?token=...`, which renders a **confirmation form (`POST`)** rather than consuming the single-use token on `GET`—defending against enterprise email security scanners that prefetch `GET` links and against cross-site navigation side effects ([Pilcrow's Auth Book — CSRF](https://auth.pilcrowonpaper.com/csrf)).
  - *Cross-device*: If the user opens the link on a phone while waiting on a desktop tab, the desktop tab polls (or subscribes via SSE) with an opaque, non-secret `pollId` until marked verified, then calls an HTTP `POST /auth/magic-link/claim` (bound to a short-lived `HttpOnly` claim cookie issued when the request started) to receive its own `HttpOnly` session cookie.

#### 3. Passkey / WebAuthn Ceremonies
Using WebAuthn Level 3's built-in JSON parsers ([W3C WebAuthn Level 3](https://www.w3.org/TR/webauthn-3/)), a complete browser passkey sign-in helper needs no plugin framework or heavy SDK:
1. Call `POST /auth/passkey/options` (or an RPC procedure) → receives `{ challengeId, optionsJSON }`.
2. Call `const publicKey = PublicKeyCredential.parseRequestOptionsFromJSON(optionsJSON)` and `const cred = await navigator.credentials.get({ publicKey, mediation })` (supporting `mediation: "conditional"` for autofill UI).
3. Call `POST /auth/passkey/verify` (HTTP endpoint) with `{ challengeId, credential: cred.toJSON() }` → server verifies `origin`, `rpIdHash`, `challenge`, and signature, then emits `Set-Cookie: __Host-session=...`.
4. Trigger app session invalidation + cross-tab broadcast.

*(Registration follows the exact same 3-step shape with `parseCreationOptionsFromJSON` and `navigator.credentials.create`.)*

#### 4. SSR Hydration, Session Invalidation, and Cross-Tab Sync
- **SSR Hydration (zero singleton leaks)**: Read and verify the `HttpOnly` session cookie per-request on the server, pass a sanitized, non-secret `SessionView | null` (`{ user, sessionId, expiresAt }`—never the raw session token) into the page/layout props or request-scoped query cache.
- **Single source of client state**: Store `SessionView` in whatever cache/router the app already uses:
  - Next.js App Router: `router.refresh()` after Server Action / Route Handler auth mutation.
  - TanStack Query / Start: `queryClient.invalidateQueries({ queryKey: ["session"] })` or `router.invalidate()`.
  - SvelteKit: `invalidateAll()` (or `invalidate("app:session")`).
  - React Router: `revalidator.revalidate()`.
- **Cross-tab synchronization**: A ~15-line helper using the standard [`BroadcastChannel` API](https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts) (with optional `window.addEventListener("storage")` fallback) broadcasts `{ type: "auth:changed", reason: "sign-in" | "sign-out" | "switch-org" }` after any cookie-mutating HTTP call. Every other open same-origin tab receives the event and calls the framework's native invalidation function—keeping all tabs synchronized without polling or a second state manager.
- **Concurrent refresh coordination (non-BFF / token-refresh clients only)**: Where a browser app must coordinate refreshing short-lived tokens across tabs (e.g., third-party API tokens rather than server-side cookie sessions), the [W3C Web Locks API](https://w3c.github.io/web-locks/) (`navigator.locks.request("auth-refresh", ...)`) prevents thundering-herd refresh races across tabs.

---

## 5. Architectural Implications for Butter v1

These primary-source invariants suggest four concrete boundaries for **Butter** and any **target auth system** built with Effect v4 + Reylo:

1. **Keep the Effect v4 + Reylo Auth Core strictly transport-agnostic.** Core services (`SessionService`, `PasswordAuth`, `OAuthService`, `PasskeyService`, `OtpService`) accept plain inputs, query PostgreSQL via Reylo, and return domain values plus `Schema.TaggedError`s—never coupling to `HttpServerRequest`, `HttpServerResponse`, or framework APIs.
2. **Treat the HTTP Auth Boundary as mandatory and thin.** In Effect v4, mount cookie-mutating endpoints (`sign-in`, `sign-out`, `verify-*`), OAuth `302` start/callback routes, and Fetch Metadata (`Sec-Fetch-Site` + `Origin`) CSRF middleware on `HttpRouter` / `HttpApi` (or the app's native framework route handlers calling the Effect runtime). Never attempt to emit `Set-Cookie` or OAuth redirects from Effect v4 `RpcServer`.
3. **Support RPC as a first-class *consumer* of auth, not a replacement for the HTTP auth boundary.** Provide a clean Effect v4 `RpcMiddleware` reference pattern that reads incoming `Cookie` / `Authorization` headers, validates the session via the shared auth core, and provides `CurrentSession` to RPC handlers—alongside explicit guidance on which auth operations (reads, session management, challenge generation, non-browser token flows) fit cleanly in RPC vs. HTTP.
4. **Ship thin, copy-owned client helpers instead of a monolithic `authClient`.** Provide small, framework-idiomatic recipes (passkey ceremony helper using WebAuthn Level 3 JSON APIs, `BroadcastChannel` cross-tab invalidator, SSR `SessionView` hydration + framework cache invalidation) that coding agents place directly in the team's app—eliminating plugin-mirroring drift, Nanostores duplication, and SSR singleton bugs.

---

## 6. Primary Sources

### Specifications & RFCs
- **RFC 6265** — *HTTP State Management Mechanism*: https://datatracker.ietf.org/doc/html/rfc6265
- **draft-ietf-httpbis-rfc6265bis-22** — *Cookies: HTTP State Management Mechanism* (`SameSite`, `__Host-`, `HttpOnly`, `Secure`): https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-22
- **RFC 6749** — *The OAuth 2.0 Authorization Framework* (§4.4 Client Credentials): https://datatracker.ietf.org/doc/html/rfc6749
- **RFC 7636** — *Proof Key for Code Exchange (PKCE)*: https://datatracker.ietf.org/doc/html/rfc7636
- **RFC 9700 (BCP 240)** — *Best Current Practice for OAuth 2.0 Security*: https://datatracker.ietf.org/doc/html/rfc9700
- **draft-ietf-oauth-v2-1-17** — *The OAuth 2.1 Authorization Framework*: https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-17
- **draft-ietf-oauth-browser-based-apps-27** — *OAuth 2.0 for Browser-Based Applications* (BFF pattern): https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps-27
- **RFC 8252 (BCP 212)** — *OAuth 2.0 for Native Apps* (§4 External User-Agents, §7.1–7.3 Redirect URIs & Loopback): https://datatracker.ietf.org/doc/html/rfc8252
- **RFC 8628** — *OAuth 2.0 Device Authorization Grant*: https://datatracker.ietf.org/doc/html/rfc8628
- **RFC 6455** — *The WebSocket Protocol* (§10.2 Origin Considerations): https://datatracker.ietf.org/doc/html/rfc6455
- **RFC 8705** — *OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens*: https://datatracker.ietf.org/doc/html/rfc8705
- **RFC 7523** — *JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants*: https://datatracker.ietf.org/doc/html/rfc7523
- **W3C Web Authentication (WebAuthn) Level 3**: https://www.w3.org/TR/webauthn-3/
- **W3C Fetch Metadata Request Headers**: https://www.w3.org/TR/fetch-metadata/
- **W3C Web Locks API**: https://w3c.github.io/web-locks/
- **WHATWG Fetch Standard** (Forbidden request/response headers, CORS credentials): https://fetch.spec.whatwg.org/
- **WHATWG Cookie Store API**: https://cookiestore.spec.whatwg.org/
- **WHATWG HTML Standard** (`BroadcastChannel`, `storage` event): https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts
- **WHATWG WebSockets Standard**: https://websockets.spec.whatwg.org/

### Framework, RPC, and Auth Reference Source Code & Docs
- **Effect v4 (`Effect-TS/effect-smol`)**:
  - `packages/effect/src/unstable/rpc/RpcServer.ts` (lines 791–819, 899–921, 971–1144, 1425–1462)
  - `packages/effect/src/unstable/rpc/RpcMiddleware.ts` (lines 47–84)
  - `packages/effect/src/unstable/rpc/RpcClient.ts` (lines 812–829)
  - `packages/effect/src/unstable/http/HttpServerResponse.ts` (lines 142, 563, 600, 809)
  - `packages/effect/src/unstable/httpapi/HttpApiSecurity.ts` & `HttpApiMiddleware.ts`
- **oRPC (`unnoq/orpc`)**:
  - `packages/server/src/plugins/response-headers.ts`
  - `packages/server/src/plugins/batch.ts` (lines 78–101, 227–250)
  - `packages/server/src/plugins/get-method-csrf-protection.ts`
  - `packages/server/src/adapters/websocket/handler.ts` & `standard-peer/utils.ts`
  - Docs: https://orpc.dev/docs/plugins/response-headers, https://orpc.dev/docs/helpers/cookie
- **tRPC (`trpc/trpc`)**:
  - `packages/server/src/adapters/fetch/fetchRequestHandler.ts`
  - Docs: https://trpc.io/docs/server/adapters/fetch, https://trpc.io/docs/server/websockets
- **Better Auth (`better-auth/better-auth`)**:
  - `packages/better-auth/src/client/vanilla.ts`, `proxy.ts`, `session-atom.ts`, `broadcast-channel.ts`, `session-refresh.ts`
  - `packages/better-auth/src/plugins/two-factor/client.ts`
  - `packages/passkey/src/client.ts`
- **Pilcrow's Auth Book & The Copenhagen Book**:
  - https://auth.pilcrowonpaper.com/sessions, `/csrf`, `/browser-client-side-storage`, `/webauthn-client-data`, `/passkey-authentication`
  - Archived Copenhagen Book (`pilcrowonpaper/copenhagen`): `pages/oauth.md`, `pages/sessions.md`, `pages/csrf.md`
- **SSR Framework Cookie Docs**:
  - Next.js App Router `cookies()`: https://nextjs.org/docs/app/api-reference/functions/cookies
  - SvelteKit `event.cookies` & `handleFetch`: https://svelte.dev/docs/kit/hooks#Server-hooks-handleFetch
  - TanStack Start Authentication: https://tanstack.com/start/latest/docs/framework/react/guide/authentication
