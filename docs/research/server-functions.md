# Next.js server actions and TanStack Start server functions: origin checks, cookies, caching, errors

Research for [How do Next.js server actions and TanStack Start server functions handle origin checks, cookies, and errors?](https://github.com/slovakian/butter/issues/32). Feeds [Do framework server functions and actions get support alongside a mounted handler?](https://github.com/slovakian/butter/issues/34) and [Prototype: an Exposure Driver contract for unlike Exposures](https://github.com/slovakian/butter/issues/15).

Researched 2026-10-25.

## Versions and sources

Versions verified with `npm view <pkg> version` on 2026-10-25:

| Package | Version | Source commit |
| --- | --- | --- |
| `next` | 16.4.3 | `vercel/next.js` tag `v16.4.3` = `29bbeab09981148ade186e8599ecdede15abc281` |
| `@tanstack/react-start` | 1.169.4 | (wrapper; logic lives in the core packages below) |
| `@tanstack/start-server-core` | 1.169.45 | `TanStack/router` tag `@tanstack/start-server-core@1.169.45` -> commit `6b9fe6d29552270836c511bc9b343d73541f4424` |
| `@tanstack/start-client-core` | 1.170.39 | released from the same monorepo the same day |
| `seroval` (TanStack's serializer) | 1.7.2 (`^1.6.7` range) | npm tarball `dist/dev/index.js` |

Shorthand below: `NX/` = `https://github.com/vercel/next.js/blob/29bbeab09981148ade186e8599ecdede15abc281/`, `TSR/` = `https://github.com/TanStack/router/blob/6b9fe6d29552270836c511bc9b343d73541f4424/`.

---

## 1. Origin / CSRF

### Next.js server actions

- **Built in, always on, cannot be turned off** (no opt-out option exists in `serverActions` config). Source: `NX/packages/next/src/server/app-render/action-handler.ts` lines ~710-791.
- The check compares only the **host** of `Origin` (`new URL(origin).host`, hostname + port, *scheme ignored*) with `x-forwarded-host` (first value) if present, else `host` (`parseHostHeader`, same file ~547-580).
- Mismatch -> allowed only if the origin host matches `experimental.serverActions.allowedOrigins` (exact or `*` / `**` subdomain wildcards; `NX/packages/next/src/server/app-render/csrf-protection.ts`). Docs: `NX/docs/01-app/03-api-reference/05-config/01-next-config-js/serverActions.mdx`.
- `Origin: null` (sandboxed iframes etc.) is treated as the literal host `null` and so is rejected unless allowlisted.
- **Missing `Origin` is allowed** with a logged warning ("handcrafted request ... can't contain user credentials that haven't been shared willingly"). The docs state this explicitly (`serverActions.mdx`, `allowedOrigins` section). So a plain Node `fetch` with no `Origin` gets through.
- **Rejection shape:** for a fetch action (has `Next-Action` header) the response is **HTTP 500** with a Flight body carrying `Error('Invalid Server Actions request.')`; for a no-JS form (MPA) action, the error is thrown and becomes the normal 500 render. Not 403. Action body is not executed.
- `Sec-Fetch-Site` and `Referer` are not consulted.
- **GET cannot invoke an action.** `getServerActionRequestMetadata` only classifies `POST` requests as possible actions (`NX/packages/next/src/server/lib/server-action-request-meta.ts`). `application/x-www-form-urlencoded` POSTs are explicitly unsupported (bail out to 404 / normal page).
- **Cross-origin from a browser:** a JS `fetch` needs the custom `Next-Action` header, so it triggers a CORS preflight; the no-JS `<form method=post enctype=multipart/form-data>` path is a "simple" cross-site request and is stopped only by the Origin check.
- Docs reminder: actions are "reachable via a direct POST request" and must authenticate inside (`NX/docs/01-app/02-guides/data-security.mdx` "Built-in Server Actions Security features"; `NX/docs/01-app/02-guides/server-actions.mdx` "Security").

### TanStack Start server functions

- Protection is **a request middleware, `createCsrfMiddleware()`**, added 2026-05-09 (`feat(start): CSRF middleware (#7373)`, commit `5ae2ae5e0`). Source: `TSR/packages/start-client-core/src/createCsrfMiddleware.ts`.
- **Only automatic when the app has no `src/start.ts`.** `createStartHandler` installs a default `createCsrfMiddleware({ filter: ctx => ctx.handlerType === 'serverFn' })` *only* when there is no `startInstance` (`TSR/packages/start-server-core/src/createStartHandler.ts` ~113-115 and ~700-710). If the app defines `createStart(...)` without the middleware, server functions are **unprotected**; Start only prints a dev-mode warning (`warnMissingCsrfMiddlewareOnce`, suppressed in production and by `serverFns.disableCsrfMiddlewareWarning`). Docs: `TSR/docs/start/framework/react/guide/server-functions.md` "Same-Origin Requests", `.../guide/middleware.md` "CSRF Middleware".
- Algorithm (`validateCsrfRequest`, line ~154), first header present wins:
  1. `Sec-Fetch-Site` present -> must match `secFetchSite` (default `'same-origin'`; `same-site` is rejected by default).
  2. else `Origin` present -> must equal `opts.origin` matcher, or by default the **full origin** (scheme+host+port) of `request.url`.
  3. else `Referer` (default on) -> same-origin prefix check.
  4. none present -> **rejected** unless `allowRequestsWithoutOriginCheck: true`.
- **Rejection shape:** `new Response('Forbidden', { status: 403 })` (plain text), customizable via `failureResponse`.
- Consequence for tests: the inverse of Next. A plain Node `fetch` with no `Origin` / `Sec-Fetch-Site` / `Referer` is **rejected (403)**; a test must send `Origin: <app origin>` (or `Sec-Fetch-Site: same-origin`) to get through, and can send a foreign `Origin` to assert rejection.
- Behind a proxy, `request.url`'s origin may be the internal one; the docs say to set `createCsrfMiddleware({ origin: 'https://app.example.com' })`.
- **GET is the default method** (`createServerFn` sets `method = 'GET'` when unspecified, `TSR/packages/start-client-core/src/createServerFn.ts` line 86). A GET server function is callable by a simple cross-site GET (`<img>`, link) - no preflight - so it is guarded only by the CSRF middleware (which does run for GET, since it filters on `handlerType`, not method). A state-changing server function declared without `method: 'POST'` is a real risk.
- Method mismatch -> `405` with `Allow` (`server-functions-handler.ts` ~186-196). This runs *after* request middleware (the handler is the pipeline terminal).

## 2. Wire format: can a test call one with plain HTTP?

### Next.js

- Fetch action (client: `NX/packages/next/src/client/components/router-reducer/reducers/server-action-reducer.ts` ~117-151): `POST <current page URL>` with headers `Next-Action: <actionId>`, `Accept: text/x-component`, optional `Next-Router-State-Tree`; body = React `encodeReply(args)` - a string (JSON-like, e.g. `["a",1]`) for simple args, or `FormData` (multipart) when args contain files / FormData.
- No-JS form action: `multipart/form-data` POST with fields `$ACTION_ID_<id>` (or `$ACTION_REF_n` + `$ACTION_n:0` for bound args) - see `areAllActionIdsValid` in `action-handler.ts` ~1555.
- **Action IDs** are encrypted, build-specific, rotated at least every 14 days (`data-security.mdx`). A test must get the ID from the build: `.next/server/server-reference-manifest.json` (`SERVER_REFERENCE_MANIFEST`, `NX/packages/next/src/shared/lib/constants.ts:131`) or the client bundle. Unknown ID -> 400 `Invalid Server Action request.` or 409 `Server Action unavailable.` with `x-nextjs-action-not-found: 1` (`action-handler.ts` ~99-107, ~650-670).
- **Response** is an RSC Flight stream (`text/x-component`). Status and headers (`Set-Cookie`, `Cache-Control`) are readable with plain HTTP; the return value needs a Flight decoder (`react-server-dom-*/client`) to read reliably. Redirects come back as **200** with `x-action-redirect`, not 3xx (~1343-1366).
- Verdict: reachable with plain HTTP for transport assertions (status, origin rejection, cookie attributes, cache headers), but needs a build-derived action ID; decoding results is framework-specific.

### TanStack Start

- URL: `<serverFnBase>/<functionId>`, default base `/_serverFn/` (`TSR/packages/start-plugin-core/src/planning.ts:89`; `createStartHandler.ts` slices the ID from the path). The ID is a SHA-256 hash by default, stable across builds for the same file+function, customizable via `generateFunctionId` (`server-functions.md` "Function ID generation"). Each function also exposes `.url` (progressive enhancement).
- Client (`TSR/packages/start-client-core/src/client-rpc/serverFnFetcher.ts` ~135-172): header `x-tsr-serverFn: true`; GET puts seroval-JSON of `{ data, context }` in `?payload=` (1 MB cap, `server-functions-handler.ts` ~252-260); POST sends it as `application/json`; `FormData` args go as multipart.
- Response: `application/json` + `x-tss-serialized: true` (seroval cross-JSON), or a framed stream for streaming results. Without `x-tsr-serverFn: true`, primitive/null/`Response` results are returned raw (`server-functions-handler.ts` ~286-294).
- Verdict: **easier than Next** to drive with plain HTTP - stable IDs, JSON bodies; payloads with only plain JSON values can be hand-written, but faithful encoding/decoding uses seroval.

## 3. Cookies and headers

### Next.js

- `cookies()` from `next/headers`: read in Server Components; `.set` / `.delete` only in Server Functions or Route Handlers (`NX/docs/01-app/03-api-reference/04-functions/cookies.mdx`). Options: `name, value, expires, maxAge, domain, path, secure, httpOnly, sameSite, priority, partitioned` - **all attributes controllable**. Setting a cookie in an action triggers a re-render of the current page in the same response (`server-actions.mdx`).
- `headers()` gives request headers (read-only). There is **no public API to set arbitrary response headers from a server action**.
- **`Cache-Control` is forced by the framework:** after the origin check passes, Next sets `Cache-Control: no-cache, no-store, max-age=0, must-revalidate` on every action response (`action-handler.ts` ~795-799). Butter cannot change it but also does not need to; tests can assert it. Note the origin-rejected 500 response is returned *before* this header is set.

### TanStack Start

- From `@tanstack/react-start/server` (`TSR/packages/start-server-core/src/request-response.ts` re-exports `internal-request-response.ts`): `getRequest`, `getRequestHeader(s)`, `getRequestIP({ xForwardedFor })`, `getCookie(s)`, `setCookie`, `deleteCookie`, `setResponseHeader(s)`, `appendResponseHeader`, `removeResponseHeader`, `setResponseStatus`.
- `setCookie(name, value, options)` serializes with `cookie-es` and defaults only `path: '/'` (line ~1447-1459). `HttpOnly`, `Secure`, `SameSite`, `Max-Age`, `Domain`, `Partitioned` are **fully controllable and nothing is defaulted** - Butter must set them.
- **No default `Cache-Control`** on server function responses (no `no-store` anywhere in `start-server-core/src`). Butter must call `setResponseHeader('Cache-Control', 'no-store')`. The docs warn about `public` caching of authenticated responses (`server-functions.md` "Server Context & Request Handling").
- Returning or throwing a `Response` also works; its headers reach the caller.

## 4. Errors

### Next.js

- Thrown error in a fetch action -> **HTTP 500**, the rejection is encoded in the Flight stream and rethrown on the client (`action-handler.ts` ~1413-1440). In **production the message is replaced** with a generic message + `digest` (`NX/docs/01-app/03-api-reference/03-file-conventions/error.mdx` "Good to know" and `error.digest`). Typed errors (`instanceof`, custom fields) **do not survive**.
- `redirect()` -> 200 + `x-action-redirect` (fetch) or 303 `Location` (MPA). `notFound()` / `forbidden()` / `unauthorized()` -> matching 404/403/401 status.
- Docs recommend modelling **expected errors as return values** (e.g. with `useActionState`), not throws (`NX/docs/01-app/01-getting-started/10-error-handling.mdx` "Handling expected errors").

### TanStack Start

- Thrown error -> `createServerFnErrorResponse` (`server-functions-handler.ts` ~131-174): body `{ error }` serialized with seroval, `x-tss-serialized: true`. Status: a `status`/`statusCode` property on the error (or its `cause`), else a status set via `setResponseStatus`, else **500** (`internal-request-response.ts` ~198-206, ~683-708).
- seroval keeps `message`, sets `name` to the subclass constructor name, and copies **own properties** (e.g. `code`); `stack` is dropped unless a feature flag is enabled; revived as a built-in `Error` (`seroval@1.7.2 dist/dev/index.js`, error-options and `ERROR_CONSTRUCTOR` table). So `error.name` and `error.code` survive, `instanceof MyError` does not (unless a custom serialization adapter is registered via `serializationAdapters`). **No production redaction:** messages and own props reach the client - don't put secrets in them.
- `redirect()` / `notFound()` and thrown `Response`s are handled specially (thrown `Response` gets `x-tss-raw-response: thrown`; the client rethrows it).
- Errors in request middleware on a server-fn request use the same serialized error format; the CSRF rejection is the exception (plain-text 403 `Response`).

## 5. Middleware placement (rate-limit keys, Session reads)

### Next.js

- `proxy.ts` (formerly `middleware.ts`) runs **before** the action handler. Actions are not separate routes - they are POSTs to the page path - so a proxy matcher that excludes a path also skips actions on it (`NX/docs/01-app/03-api-reference/03-file-conventions/proxy.mdx` "Execution order", Good-to-know). The proxy can see `Next-Action` and the client IP headers, so rate-limiting can key there, but it runs before (and independent of) the Origin check.
- There is no per-action middleware; Session reads happen inside the action via `cookies()` / `headers()`.

### TanStack Start

- Order: global `requestMiddleware` (from `createStart`; runs for every request incl. SSR, server routes, server fns) -> server-fn dispatch (method check, payload parse) -> global `functionMiddleware` -> the function's own `.middleware([...])` -> handler (`middleware.md` "Global Request Middleware", "Middleware Execution Order"; `createStartHandler.ts` terminal ~795-812).
- CSRF is just one request middleware, so its position relative to a rate-limit or Session middleware is the app's choice. Request middleware can read cookies/headers and pass context down; `ctx.handlerType === 'serverFn'` distinguishes server-fn requests.

---

## Decision-relevant summary for Butter

| Concern | Next.js server action | TanStack Start server function |
| --- | --- | --- |
| Cross-origin rejection built in? | Yes, always, host-only compare | Only if no `src/start.ts`, else app must add `createCsrfMiddleware` |
| Missing `Origin` | Allowed (warning) | Rejected (403) by default |
| Rejection status | 500 | 403 |
| GET invocation | Impossible | Default method is GET; must declare `POST` for mutations |
| `Cache-Control: no-store` | Forced by framework | Not set; Butter must set it |
| Cookie attributes | Fully controllable via `cookies().set` | Fully controllable via `setCookie`; only `path=/` defaulted |
| Plain-HTTP reachability | Yes, but needs build action ID; Flight response | Yes, stable hashed ID, JSON response |
| Typed errors | Lost; message redacted in prod | `name` + own props survive; no redaction |

Implications:

1. An Exposure Invariant "cross-origin state-changing request is rejected" must accept **different rejection statuses** (Next 500, Start 403) and should assert "not executed" (no side effect, no `Set-Cookie`) rather than one status code.
2. "Missing Origin" behaves oppositely; an invariant that sends no `Origin` cannot be framework-neutral. Tests should send a **foreign `Origin`** to test rejection and the **app's own `Origin`** to test acceptance.
3. For TanStack, the Invariant is meaningful only if the user's `src/start.ts` includes the CSRF middleware (or Butter ships its own); Butter cannot assume it. Butter's own server functions should be `POST`.
4. On TanStack, Butter must itself set `Cache-Control: no-store` and every cookie attribute; on Next, `no-store` is guaranteed and Butter only owns cookie attributes.
5. Error contracts should be **return values** (discriminated results), not thrown typed errors - Next redacts and strips them, TanStack keeps only name/props.
6. An Exposure Driver can reach both with plain HTTP for transport assertions; Next needs the action ID from `server-reference-manifest.json` and a Flight decoder for return values; TanStack needs the function ID and seroval for complex payloads.
