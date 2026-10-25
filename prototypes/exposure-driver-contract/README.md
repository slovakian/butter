# PROTOTYPE (throwaway): Exposure Driver Contract for Unlike Exposures

For [Prototype: an Exposure Driver contract for unlike Exposures](https://github.com/slovakian/butter/issues/15). Never merged.

## Question

What contract must an Exposure Driver satisfy so the same Exposure Invariant tests run against very different Exposures (Effect RPC vs Next.js Server Actions)? Where does the contract break?

## How to Run

```sh
# Run the automated Invariant test suite across both drivers with Vitest
vp test prototypes/exposure-driver-contract/src/index.test.ts

# Run the driver prototype demonstration and break-point checks with Node
node --experimental-strip-types prototypes/exposure-driver-contract/src/run.ts

# Open the interactive logic demo (following .agents/skills/prototype/LOGIC.md)
open prototypes/exposure-driver-contract/demo.html
```

---

## 1. The Exposure Driver Contract

The Exposure Driver bridges Butter's Exposure Invariant tests to hand-written Exposures (or in-process host actions). To bridge HTTP RPC and framework server actions, the contract splits operations into **Calls** (POST mutations) and **Navigations** (browser GET redirects):

```ts
export interface ExposureCookie {
  name: string;
  value: string;
  httpOnly?: boolean;
  sameSite?: "lax" | "strict" | "none";
  secure?: boolean;
  path?: string;
  maxAge?: number;
  expires?: Date;
}

export interface ExposureCallRequest<TInput = unknown> {
  action: string;
  input: TInput;
  origin?: string;
  cookies?: Record<string, string>;
  headers?: Record<string, string>;
}

export interface ExposureCallResponse<TOutput = unknown> {
  status: number;
  rejected: boolean; // True if rejected by transport security (CSRF, origin check, etc.)
  cookies: Map<string, ExposureCookie>;
  headers: Headers;
  data?: TOutput;
  error?: unknown;
  sideEffectOccurred: boolean; // True if state mutated in store
}

export interface ExposureNavigationRequest {
  action: string;
  query?: Record<string, string>;
  origin?: string;
  cookies?: Record<string, string>;
  headers?: Record<string, string>;
}

export interface ExposureNavigationResponse {
  status: number;
  redirectUrl: string;
  cookies: Map<string, ExposureCookie>;
  headers: Headers;
  rejected: boolean;
}

export interface ExposureDriver {
  readonly name: string;
  readonly capabilities: {
    supportsNavigations: boolean;
    nativeOriginCheck: boolean;
    directResponseHeaders: boolean;
    wireFormat: "json" | "rsc-flight" | "custom";
  };
  invokeCall<TInput, TOutput>(
    req: ExposureCallRequest<TInput>
  ): Promise<ExposureCallResponse<TOutput>>;
  invokeNavigation(
    req: ExposureNavigationRequest
  ): Promise<ExposureNavigationResponse>;
}
```

---

## 2. Invariant Coverage

The prototype exercises all four core Exposure Invariants against both drivers:

1. **Cross-Origin State-Changing Request (CSRF):** An untrusted foreign origin (`https://evil.com`) is rejected without executing store side effects or issuing cookies. A trusted same-origin request succeeds.
2. **Session Cookie Attributes:** Verifies `HttpOnly: true`, `SameSite: "lax" | "strict"`, `Secure: true`, `Path: "/"`, and positive `maxAge`.
3. **`Cache-Control: no-store`:** Ensures auth responses return `Cache-Control: no-store`.
4. **OAuth State & PKCE Lifecycle:** Start sets short-lived (<=600s), `HttpOnly`, `SameSite=Lax`, `Secure` cookies; callback validates state, sets session cookie, and clears OAuth cookies; tampered state is rejected.

---

## 3. Where the Contract Breaks (Key Findings)

### Break 1: The Navigation Wall (Server Actions cannot do Navigations)

- **Break:** Next.js Server Actions are strictly POST-only. They cannot handle browser GET navigations (OAuth start redirect and OAuth callback with query parameters).
- **Impact:** An app exposing auth purely through Server Actions **cannot support OAuth or email verification links**.
- **Solution:** A Next.js Exposure Driver must be a **hybrid driver**: routing calls to Server Actions and delegating navigations to a companion Route Handler (`/api/auth/*`). If no Route Handler is mounted, `capabilities.supportsNavigations = false`, and navigation invariants are skipped with an explicit explanatory break notice.

### Break 2: The CSRF Status Code Trap (500 vs 403)

- **Break:** Next.js Server Actions' built-in `action-handler.ts` compares `Origin.host` to `Host` and rejects mismatches with **HTTP 500** (`Error: Invalid Server Actions request`). TanStack Start and Effect RPC reject with **HTTP 403**.
- **Impact:** If an Invariant test asserts `status === 403`, Next.js fails.
- **Solution:** The contract cannot assert raw HTTP status codes. The Driver must provide `rejected: boolean`, asserting `res.rejected === true && res.sideEffectOccurred === false && !res.cookies.has("session_token")`.

### Break 3: Missing Origin Header Asymmetry

- **Break:** Next.js explicitly **allows** requests with no `Origin` header (logging a console warning, intended for curl/Node clients). TanStack Start's `createCsrfMiddleware()` **rejects** requests with no `Origin` or `Sec-Fetch-Site` (403).
- **Impact:** Testing with `origin: undefined` produces opposite results across frameworks.
- **Solution:** Invariant tests must always supply an explicit foreign Origin (`origin: "https://evil.attacker.com"`, `sec-fetch-site: "cross-site"`) when testing CSRF rejection.

### Break 4: Frameworks that Hide HTTP & Response Headers

- **Break:** Inside a Next.js Server Action, `headers()` is read-only (request headers only). The developer has no API to set or inspect response headers. Next.js automatically injects `Cache-Control: no-cache, no-store, max-age=0, must-revalidate` at the wire level.
- **Impact:** An in-process test calling an action function directly cannot inspect response headers or verify `Cache-Control`.
- **Solution:** Drivers must either test over the wire (using the build's action ID and React Flight parsing) or wrap in-process calls in a framework test dispatcher that simulates the host wire envelope.

### Break 5: Middleware Ordering

- **Break:** In Next.js, `proxy.ts` (middleware) runs **before** the action handler and before Next's origin check. If rate limiting is placed in `proxy.ts`, an attacker can trigger rate limits cross-origin before CSRF rejection.
- **Solution:** Butter guidance must document that rate limiting should run after origin verification, or inside the action handler via Butter Primitives.
