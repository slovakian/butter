import type {
  ExposureCallRequest,
  ExposureCallResponse,
  ExposureCookie,
  ExposureDriver,
  ExposureNavigationRequest,
  ExposureNavigationResponse,
} from "../contract.ts";

/**
 * Utility to parse Set-Cookie headers into ExposureCookie map.
 */
export function parseSetCookieHeader(
  cookieHeaders: string[]
): Map<string, ExposureCookie> {
  const map = new Map<string, ExposureCookie>();

  for (const header of cookieHeaders) {
    const parts = header.split(";").map((p) => p.trim());

    if (parts.length === 0 || !parts[0]) {
      continue;
    }
    const [nameVal, ...attrParts] = parts;
    const equalIdx = nameVal.indexOf("=");

    if (equalIdx === -1) {
      continue;
    }
    const name = nameVal.slice(0, equalIdx).trim();
    const value = nameVal.slice(equalIdx + 1).trim();

    const cookie: ExposureCookie = { name, path: "/", value };

    for (const attr of attrParts) {
      const [key, val] = attr.split("=").map((s) => s.trim().toLowerCase());

      if (key === "httponly") {
        cookie.httpOnly = true;
      } else if (key === "secure") {
        cookie.secure = true;
      } else if (key === "samesite") {
        if (val === "lax" || val === "strict" || val === "none") {
          cookie.sameSite = val;
        }
      } else if (key === "path") {
        cookie.path = attr.split("=")[1]?.trim() ?? "/";
      } else if (key === "max-age") {
        cookie.maxAge = Number.parseInt(val ?? "0", 10);
      }
    }

    map.set(name, cookie);
  }

  return map;
}

/**
 * Effect RPC Exposure Mock Server / Fetch Handler
 *
 * Simulates an Effect RPC endpoint at /rpc and HTTP route for navigations.
 * Implements Butter's edge security middleware:
 * - Origin check: 403 on untrusted origin
 * - Cache-Control: no-store
 * - Cookie attributes: HttpOnly, Secure, SameSite=Lax
 */
export class EffectRpcExposure {
  public trustedOrigin = "https://app.butter.dev";
  public userStore = new Map<string, { email: string; sessionCount: number }>();
  public activeSessions = new Set<string>();

  async handleRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const origin = req.headers.get("origin");

    // 1. Origin Check (Butter Middleware for state-changing requests)
    if (req.method === "POST") {
      if (origin && origin !== this.trustedOrigin) {
        return new Response(
          JSON.stringify({ error: "CSRF: Untrusted Origin" }),
          {
            headers: {
              "Cache-Control": "no-store",
              "Content-Type": "application/json",
            },
            status: 403,
          }
        );
      }
    }

    // 2. RPC calls handler (POST /rpc)
    if (req.method === "POST" && url.pathname === "/rpc") {
      const body = (await req.json()) as {
        _tag: string;
        [key: string]: unknown;
      };

      if (body._tag === "signIn") {
        const { email } = body as { email: string };
        const sessionToken = `sess_${Math.random().toString(36).slice(2)}`;
        this.activeSessions.add(sessionToken);

        const headers = new Headers();
        headers.set("Content-Type", "application/json");
        headers.set("Cache-Control", "no-store, max-age=0");
        headers.append(
          "Set-Cookie",
          `session_token=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`
        );

        return new Response(
          JSON.stringify({ sessionToken, success: true, user: { email } }),
          { headers, status: 200 }
        );
      }

      return new Response(JSON.stringify({ error: "Unknown RPC method" }), {
        headers: { "Cache-Control": "no-store" },
        status: 400,
      });
    }

    // 3. Navigation handler (GET /api/auth/oauth/*)
    if (req.method === "GET" && url.pathname === "/api/auth/oauth/github") {
      const state = `st_${Math.random().toString(36).slice(2)}`;
      const pkce = `pk_${Math.random().toString(36).slice(2)}`;
      const redirectTarget = `https://github.com/login/oauth/authorize?client_id=123&state=${state}&code_challenge=${pkce}`;

      const headers = new Headers();
      headers.set("Location", redirectTarget);
      headers.set("Cache-Control", "no-store");
      headers.append(
        "Set-Cookie",
        `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
      );
      headers.append(
        "Set-Cookie",
        `oauth_pkce=${pkce}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
      );

      return new Response(null, { headers, status: 302 });
    }

    if (
      req.method === "GET" &&
      url.pathname === "/api/auth/oauth/github/callback"
    ) {
      const queryState = url.searchParams.get("state");
      const cookieHeader = req.headers.get("cookie") ?? "";

      const cookiePairs = Object.fromEntries(
        cookieHeader.split(";").map((p) =>
          p
            .trim()
            .split("=")
            .map((s) => s.trim())
        )
      );

      if (!queryState || queryState !== cookiePairs.oauth_state) {
        return new Response("OAuth state verification failed", {
          headers: { "Cache-Control": "no-store" },
          status: 403,
        });
      }

      const sessionToken = `sess_${Math.random().toString(36).slice(2)}`;
      this.activeSessions.add(sessionToken);

      const headers = new Headers();
      headers.set("Location", "https://app.butter.dev/dashboard");
      headers.set("Cache-Control", "no-store");
      headers.append(
        "Set-Cookie",
        `session_token=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`
      );
      // Clear OAuth cookies
      headers.append(
        "Set-Cookie",
        `oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
      );
      headers.append(
        "Set-Cookie",
        `oauth_pkce=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
      );

      return new Response(null, { headers, status: 302 });
    }

    return new Response("Not Found", { status: 404 });
  }
}

/**
 * Effect RPC Exposure Driver
 *
 * Implements ExposureDriver against the Effect RPC exposure.
 */
export class EffectRpcExposureDriver implements ExposureDriver {
  public readonly name = "Effect RPC Exposure";
  public readonly capabilities = {
    directResponseHeaders: true,
    nativeOriginCheck: false, // Relies on Butter's middleware
    supportsNavigations: true,
    wireFormat: "json" as const,
  };

  private readonly exposure: EffectRpcExposure;

  constructor(exposure: EffectRpcExposure) {
    this.exposure = exposure;
  }

  async invokeCall<TInput, TOutput>(
    req: ExposureCallRequest<TInput>
  ): Promise<ExposureCallResponse<TOutput>> {
    const headers = new Headers(req.headers ?? {});
    headers.set("Content-Type", "application/json");

    if (req.origin) {
      headers.set("Origin", req.origin);
    }
    if (req.cookies) {
      const cookieStr = Object.entries(req.cookies)
        .map(([k, v]) => `${k}=${v}`)
        .join("; ");

      headers.set("Cookie", cookieStr);
    }

    const initialSessionsCount = this.exposure.activeSessions.size;

    const request = new Request("https://app.butter.dev/rpc", {
      body: JSON.stringify({
        _tag: req.action,
        ...(req.input as object),
      }),
      headers,
      method: "POST",
    });

    const response = await this.exposure.handleRequest(request);

    // Extract all Set-Cookie headers
    const setCookieHeaders = response.headers.getSetCookie
      ? response.headers.getSetCookie()
      : response.headers.get("set-cookie")
        ? [response.headers.get("set-cookie")!]
        : [];

    const cookies = parseSetCookieHeader(setCookieHeaders);

    const isRejected = response.status >= 400;
    const sideEffectOccurred =
      this.exposure.activeSessions.size > initialSessionsCount;

    let data: TOutput | undefined;
    let error: unknown;

    try {
      const json = await response.json();

      if (isRejected) {
        error = json;
      } else {
        data = json as TOutput;
      }
    } catch {
      // not json
    }

    return {
      cookies,
      data,
      error,
      headers: response.headers,
      rejected: isRejected,
      sideEffectOccurred,
      status: response.status,
    };
  }

  async invokeNavigation(
    req: ExposureNavigationRequest
  ): Promise<ExposureNavigationResponse> {
    const url = new URL("https://app.butter.dev");

    if (req.action === "oauthStart") {
      url.pathname = "/api/auth/oauth/github";
    } else if (req.action === "oauthCallback") {
      url.pathname = "/api/auth/oauth/github/callback";
    }

    if (req.query) {
      for (const [k, v] of Object.entries(req.query)) {
        url.searchParams.set(k, v);
      }
    }

    const headers = new Headers(req.headers ?? {});

    if (req.origin) {
      headers.set("Origin", req.origin);
    }
    if (req.cookies) {
      const cookieStr = Object.entries(req.cookies)
        .map(([k, v]) => `${k}=${v}`)
        .join("; ");

      headers.set("Cookie", cookieStr);
    }

    const request = new Request(url.toString(), {
      headers,
      method: "GET",
    });

    const response = await this.exposure.handleRequest(request);

    const setCookieHeaders = response.headers.getSetCookie
      ? response.headers.getSetCookie()
      : response.headers.get("set-cookie")
        ? [response.headers.get("set-cookie")!]
        : [];

    const cookies = parseSetCookieHeader(setCookieHeaders);

    return {
      cookies,
      headers: response.headers,
      redirectUrl: response.headers.get("location") ?? "",
      rejected: response.status >= 400,
      status: response.status,
    };
  }
}
