import type { ExposureCookie, ExposureDriver } from "./contract.ts";

export interface InvariantResult {
  invariant: string;
  passed: boolean;
  message: string;
  details?: Record<string, unknown>;
}

export interface InvariantSuiteResult {
  driverName: string;
  results: InvariantResult[];
  allPassed: boolean;
}

/**
 * Invariant 1: Cross-Origin State-Changing Request (CSRF Protection)
 *
 * State-changing calls from foreign origins must be rejected, producing
 * no side effects and issuing no auth cookies. Same-origin calls must succeed.
 */
export async function checkCrossOriginStateChangingRequest(
  driver: ExposureDriver,
  trustedOrigin = "https://app.butter.dev",
  untrustedOrigin = "https://evil.attacker.com"
): Promise<InvariantResult> {
  // 1. Untrusted origin attempt
  const untrustedRes = await driver.invokeCall({
    action: "signIn",
    headers: {
      "sec-fetch-site": "cross-site",
    },
    input: { email: "user@example.com", password: "SecretPassword123!" },
    origin: untrustedOrigin,
  });

  if (!untrustedRes.rejected) {
    return {
      details: { untrustedRes },
      invariant: "cross-origin-rejection",
      message: `Failed: Cross-origin request was NOT rejected by ${driver.name}. Status: ${untrustedRes.status}`,
      passed: false,
    };
  }

  if (untrustedRes.sideEffectOccurred) {
    return {
      invariant: "cross-origin-rejection",
      message: `Failed: Side-effect executed despite rejection on ${driver.name}`,
      passed: false,
    };
  }

  if (untrustedRes.cookies.has("session_token")) {
    return {
      invariant: "cross-origin-rejection",
      message: `Failed: Session cookie issued to cross-origin caller on ${driver.name}`,
      passed: false,
    };
  }

  // 2. Trusted origin attempt
  const trustedRes = await driver.invokeCall({
    action: "signIn",
    headers: {
      "sec-fetch-site": "same-origin",
    },
    input: { email: "user@example.com", password: "SecretPassword123!" },
    origin: trustedOrigin,
  });

  if (trustedRes.rejected) {
    return {
      invariant: "cross-origin-rejection",
      message: `Failed: Same-origin request was rejected by ${driver.name}. Status: ${trustedRes.status}`,
      passed: false,
    };
  }

  if (!trustedRes.sideEffectOccurred) {
    return {
      invariant: "cross-origin-rejection",
      message: `Failed: Expected side-effect did not execute for same-origin request on ${driver.name}`,
      passed: false,
    };
  }

  return {
    details: {
      trustedStatus: trustedRes.status,
      untrustedStatus: untrustedRes.status,
    },
    invariant: "cross-origin-rejection",
    message: `Passed: Cross-origin request was rejected without side effects or cookies on ${driver.name}`,
    passed: true,
  };
}

/**
 * Invariant 2: Session Cookie Attributes
 *
 * Session cookies must be HttpOnly, SameSite=Lax (or Strict), Secure, Path=/,
 * and have a positive Max-Age.
 */
export async function checkSessionCookieAttributes(
  driver: ExposureDriver,
  trustedOrigin = "https://app.butter.dev"
): Promise<InvariantResult> {
  const res = await driver.invokeCall({
    action: "signIn",
    input: { email: "user@example.com", password: "SecretPassword123!" },
    origin: trustedOrigin,
  });

  const sessionCookie = res.cookies.get("session_token");

  if (!sessionCookie) {
    return {
      invariant: "session-cookie-attributes",
      message: `Failed: No session_token cookie found in response from ${driver.name}`,
      passed: false,
    };
  }

  const failures: string[] = [];

  if (sessionCookie.httpOnly !== true) {
    failures.push("httpOnly is not true");
  }

  if (sessionCookie.sameSite !== "lax" && sessionCookie.sameSite !== "strict") {
    failures.push(
      `sameSite is "${sessionCookie.sameSite}" (expected lax or strict)`
    );
  }

  if (sessionCookie.secure !== true) {
    failures.push("secure is not true");
  }

  if (sessionCookie.path !== "/") {
    failures.push(`path is "${sessionCookie.path}" (expected "/")`);
  }

  if (!sessionCookie.maxAge || sessionCookie.maxAge <= 0) {
    failures.push(
      `maxAge is ${sessionCookie.maxAge} (expected positive duration)`
    );
  }

  if (failures.length > 0) {
    return {
      details: { sessionCookie },
      invariant: "session-cookie-attributes",
      message: `Failed attributes on ${driver.name}: ${failures.join(", ")}`,
      passed: false,
    };
  }

  return {
    details: { sessionCookie },
    invariant: "session-cookie-attributes",
    message: `Passed: Session cookie has all required security attributes on ${driver.name}`,
    passed: true,
  };
}

/**
 * Invariant 3: Cache-Control: no-store
 *
 * Sensitive auth endpoints must set Cache-Control: no-store
 */
export async function checkCacheControlNoStore(
  driver: ExposureDriver,
  trustedOrigin = "https://app.butter.dev"
): Promise<InvariantResult> {
  const res = await driver.invokeCall({
    action: "signIn",
    input: { email: "user@example.com", password: "SecretPassword123!" },
    origin: trustedOrigin,
  });

  const cacheControl = res.headers.get("cache-control");

  if (!cacheControl) {
    return {
      invariant: "cache-control-no-store",
      message: `Failed: Cache-Control header missing from response on ${driver.name}`,
      passed: false,
    };
  }

  const lower = cacheControl.toLowerCase();

  if (!lower.includes("no-store")) {
    return {
      invariant: "cache-control-no-store",
      message: `Failed: Cache-Control "${cacheControl}" does not contain "no-store" on ${driver.name}`,
      passed: false,
    };
  }

  return {
    details: { cacheControl },
    invariant: "cache-control-no-store",
    message: `Passed: Cache-Control contains "no-store" ("${cacheControl}") on ${driver.name}`,
    passed: true,
  };
}

/**
 * Invariant 4: OAuth State & PKCE Cookies Lifecycle
 *
 * 1. Start navigation sets state and code_verifier cookies (HttpOnly, SameSite=Lax, Secure, short-lived).
 * 2. Callback validates state, sets session cookie, and clears OAuth cookies.
 * 3. Tampered state in callback is rejected.
 */
export async function checkOAuthStatePkceCookies(
  driver: ExposureDriver
): Promise<InvariantResult> {
  if (!driver.capabilities.supportsNavigations) {
    return {
      invariant: "oauth-state-pkce-lifecycle",
      message: `Break point: ${driver.name} does NOT support navigations (Server Actions are POST-only; requires separate Route Handler)`,
      passed: false,
    };
  }

  // 1. OAuth start navigation
  const startRes = await driver.invokeNavigation({
    action: "oauthStart",
    origin: "https://app.butter.dev",
    query: { provider: "github" },
  });

  if (startRes.rejected) {
    return {
      invariant: "oauth-state-pkce-lifecycle",
      message: `Failed: OAuth start was rejected on ${driver.name}`,
      passed: false,
    };
  }

  const stateCookie = startRes.cookies.get("oauth_state");
  const pkceCookie = startRes.cookies.get("oauth_pkce");

  if (!stateCookie || !pkceCookie) {
    return {
      invariant: "oauth-state-pkce-lifecycle",
      message: `Failed: Missing oauth_state or oauth_pkce cookies in start response on ${driver.name}`,
      passed: false,
    };
  }

  // Verify cookie attributes
  const checkAttributes = (cookie: ExposureCookie, name: string): string[] => {
    const errs: string[] = [];

    if (cookie.httpOnly !== true) {
      errs.push(`${name} httpOnly !== true`);
    }
    if (cookie.sameSite !== "lax") {
      errs.push(`${name} sameSite !== "lax"`);
    }
    if (cookie.secure !== true) {
      errs.push(`${name} secure !== true`);
    }
    if (!cookie.maxAge || cookie.maxAge > 600) {
      errs.push(
        `${name} maxAge is not short-lived (<= 600s), got ${cookie.maxAge}`
      );
    }

    return errs;
  };

  const attrErrors = [
    ...checkAttributes(stateCookie, "oauth_state"),
    ...checkAttributes(pkceCookie, "oauth_pkce"),
  ];

  if (attrErrors.length > 0) {
    return {
      invariant: "oauth-state-pkce-lifecycle",
      message: `Failed OAuth cookie attributes on ${driver.name}: ${attrErrors.join(", ")}`,
      passed: false,
    };
  }

  // 2. Successful OAuth callback
  const callbackRes = await driver.invokeNavigation({
    action: "oauthCallback",
    cookies: {
      oauth_pkce: pkceCookie.value,
      oauth_state: stateCookie.value,
    },
    origin: "https://app.butter.dev",
    query: {
      code: "valid-auth-code",
      provider: "github",
      state: stateCookie.value,
    },
  });

  if (callbackRes.rejected) {
    return {
      invariant: "oauth-state-pkce-lifecycle",
      message: `Failed: Valid OAuth callback rejected on ${driver.name}`,
      passed: false,
    };
  }

  if (!callbackRes.cookies.has("session_token")) {
    return {
      invariant: "oauth-state-pkce-lifecycle",
      message: `Failed: Valid OAuth callback did not issue session_token on ${driver.name}`,
      passed: false,
    };
  }

  // Check that OAuth cookies were cleared
  const clearedState = callbackRes.cookies.get("oauth_state");
  const clearedPkce = callbackRes.cookies.get("oauth_pkce");

  if (
    !clearedState ||
    (clearedState.maxAge !== 0 && clearedState.value !== "")
  ) {
    return {
      invariant: "oauth-state-pkce-lifecycle",
      message: `Failed: oauth_state cookie was not cleared after callback on ${driver.name}`,
      passed: false,
    };
  }

  if (!clearedPkce || (clearedPkce.maxAge !== 0 && clearedPkce.value !== "")) {
    return {
      invariant: "oauth-state-pkce-lifecycle",
      message: `Failed: oauth_pkce cookie was not cleared after callback on ${driver.name}`,
      passed: false,
    };
  }

  // 3. Callback with tampered state
  const tamperedRes = await driver.invokeNavigation({
    action: "oauthCallback",
    cookies: {
      oauth_pkce: pkceCookie.value,
      oauth_state: stateCookie.value,
    },
    origin: "https://app.butter.dev",
    query: {
      code: "valid-auth-code",
      provider: "github",
      state: "tampered-state",
    },
  });

  if (!tamperedRes.rejected) {
    return {
      invariant: "oauth-state-pkce-lifecycle",
      message: `Failed: Callback with tampered state was NOT rejected on ${driver.name}`,
      passed: false,
    };
  }

  if (tamperedRes.cookies.has("session_token")) {
    return {
      invariant: "oauth-state-pkce-lifecycle",
      message: `Failed: Session cookie issued on tampered OAuth state on ${driver.name}`,
      passed: false,
    };
  }

  return {
    invariant: "oauth-state-pkce-lifecycle",
    message: `Passed: OAuth state and PKCE cookies lifecycle fully verified on ${driver.name}`,
    passed: true,
  };
}

/**
 * Run all four Exposure Invariants against a driver.
 */
export async function runExposureInvariants(
  driver: ExposureDriver
): Promise<InvariantSuiteResult> {
  const results: InvariantResult[] = [];

  results.push(
    await checkCrossOriginStateChangingRequest(driver),
    await checkSessionCookieAttributes(driver)
  );
  results.push(
    await checkCacheControlNoStore(driver),
    await checkOAuthStatePkceCookies(driver)
  );

  const allPassed = results.every((r) => r.passed);

  return {
    allPassed,
    driverName: driver.name,
    results,
  };
}
