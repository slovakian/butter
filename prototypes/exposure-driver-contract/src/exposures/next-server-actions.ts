import type {
  ExposureCallRequest,
  ExposureCallResponse,
  ExposureCookie,
  ExposureDriver,
  ExposureNavigationRequest,
  ExposureNavigationResponse,
} from "../contract.ts";
import { parseSetCookieHeader } from "./effect-rpc.ts";

/**
 * Next.js Cookie Store Mock
 *
 * Simulates next/headers `cookies()` within a request scope.
 */
export class NextCookieStore {
  private readonly cookies = new Map<string, ExposureCookie>();

  set(
    name: string,
    value: string,
    options: Partial<ExposureCookie> = {}
  ): void {
    this.cookies.set(name, {
      expires: options.expires,
      httpOnly: options.httpOnly ?? true,
      maxAge: options.maxAge,
      name,
      path: options.path ?? "/",
      sameSite: options.sameSite ?? "lax",
      secure: options.secure ?? true,
      value,
    });
  }

  get(name: string): ExposureCookie | undefined {
    return this.cookies.get(name);
  }

  delete(name: string): void {
    const existing = this.cookies.get(name);

    if (existing) {
      this.cookies.set(name, {
        ...existing,
        maxAge: 0,
        value: "",
      });
    }
  }

  getAll(): Map<string, ExposureCookie> {
    return new Map(this.cookies);
  }

  populateFromHeader(cookieHeader?: string): void {
    if (!cookieHeader) {
      return;
    }
    for (const pair of cookieHeader.split(";")) {
      const [k, v] = pair.trim().split("=");

      if (k && v !== undefined) {
        this.cookies.set(k, { name: k, path: "/", value: v });
      }
    }
  }
}

/**
 * Next.js Server Actions Runtime / Dispatcher
 *
 * Implements:
 * 1. Next.js built-in Origin check (action-handler.ts)
 *    - Compares Origin.host with Host header
 *    - Rejects mismatch with HTTP 500 (Invalid Server Actions request)
 *    - Allows missing Origin
 * 2. Automatic Next.js headers:
 *    - Cache-Control: no-cache, no-store, max-age=0, must-revalidate
 * 3. In-process cookies() store via AsyncLocalStorage simulation
 * 4. React Flight wire response formatting
 */
export class NextServerActionsRuntime {
  public host = "app.butter.dev";
  public activeSessions = new Set<string>();

  // Companion Route Handler for navigations (the documented requirement for OAuth)
  public hasRouteHandler = true;

  /**
   * Next.js action handler wire entry point (POST to page with Next-Action header)
   */
  async dispatchAction(req: {
    actionId: string;
    origin?: string;
    headers: Record<string, string>;
    cookieHeader?: string;
    payload: unknown;
  }): Promise<{
    status: number;
    headers: Headers;
    cookies: Map<string, ExposureCookie>;
    flightBody: string;
    sideEffectOccurred: boolean;
  }> {
    const responseHeaders = new Headers();
    // Next.js automatically sets Cache-Control on all Server Action responses
    responseHeaders.set(
      "Cache-Control",
      "no-cache, no-store, max-age=0, must-revalidate"
    );

    const initialSessions = this.activeSessions.size;

    // 1. Built-in Next.js Origin / CSRF Check
    // Source: vercel/next.js action-handler.ts ~710-791
    if (req.origin) {
      try {
        const originUrl = new URL(req.origin);
        const reqHost = req.headers.host ?? this.host;

        if (originUrl.host !== reqHost) {
          // Rejection is HTTP 500 in Next.js, NOT 403!
          return {
            cookies: new Map(),
            flightBody: '0:E{"message":"Invalid Server Actions request."}\n',
            headers: responseHeaders,
            sideEffectOccurred: false,
            status: 500,
          };
        }
      } catch {
        return {
          cookies: new Map(),
          flightBody: '0:E{"message":"Invalid Origin header."}\n',
          headers: responseHeaders,
          sideEffectOccurred: false,
          status: 500,
        };
      }
    }
    // Note: If req.origin is missing, Next.js allows it with a logged warning.

    // 2. Initialize Next.js cookies() scope
    const cookieStore = new NextCookieStore();
    cookieStore.populateFromHeader(req.cookieHeader);

    // 3. Execute Server Action function
    if (req.actionId === "signInAction") {
      const input = req.payload as { email: string };
      const sessionToken = `sess_next_${Math.random().toString(36).slice(2)}`;
      this.activeSessions.add(sessionToken);

      // Butter's cookie primitive called inside the action
      cookieStore.set("session_token", sessionToken, {
        httpOnly: true,
        maxAge: 2592000,
        path: "/",
        sameSite: "lax",
        secure: true,
      });

      const sideEffectOccurred = this.activeSessions.size > initialSessions;

      return {
        cookies: cookieStore.getAll(),
        flightBody: `0:{"success":true,"user":{"email":"${input.email}"}}\n`,
        headers: responseHeaders,
        sideEffectOccurred,
        status: 200,
      };
    }

    return {
      cookies: new Map(),
      flightBody: '0:E{"message":"Action not found."}\n',
      headers: responseHeaders,
      sideEffectOccurred: false,
      status: 404,
    };
  }

  /**
   * Next.js Route Handler for navigations (GET /api/auth/...)
   *
   * Crucial finding: Server Actions are POST-only and cannot handle GET navigations.
   * Any Next.js app using OAuth MUST mount a Route Handler.
   */
  async dispatchRouteHandler(req: Request): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname === "/api/auth/oauth/github") {
      const state = `st_next_${Math.random().toString(36).slice(2)}`;
      const pkce = `pk_next_${Math.random().toString(36).slice(2)}`;
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

    if (url.pathname === "/api/auth/oauth/github/callback") {
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

      const sessionToken = `sess_next_${Math.random().toString(36).slice(2)}`;
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

    return new Response("Not found", { status: 404 });
  }
}

/**
 * Next.js Server Actions Exposure Driver
 *
 * Implements ExposureDriver against Next.js Server Actions.
 *
 * Highlights the contract break points:
 * 1. Next.js rejects origin mismatch with 500 (not 403)
 * 2. Next.js forces Cache-Control at the protocol layer
 * 3. Server Actions cannot perform navigations; delegates to Route Handler
 */
export class NextServerActionsDriver implements ExposureDriver {
  public readonly name = "Next.js Server Actions Exposure";
  public readonly capabilities = {
    directResponseHeaders: false, // Next.js abstracts response headers
    nativeOriginCheck: true, // Next.js has built-in origin check
    supportsNavigations: true, // Supported via companion Route Handler
    wireFormat: "rsc-flight" as const,
  };

  private readonly runtime: NextServerActionsRuntime;
  private readonly includeRouteHandler: boolean;

  constructor(runtime: NextServerActionsRuntime, includeRouteHandler = true) {
    this.runtime = runtime;
    this.includeRouteHandler = includeRouteHandler;
    this.capabilities.supportsNavigations = includeRouteHandler;
  }

  async invokeCall<TInput, TOutput>(
    req: ExposureCallRequest<TInput>
  ): Promise<ExposureCallResponse<TOutput>> {
    const actionId = req.action === "signIn" ? "signInAction" : req.action;

    const cookieHeader = req.cookies
      ? Object.entries(req.cookies)
          .map(([k, v]) => `${k}=${v}`)
          .join("; ")
      : undefined;

    const res = await this.runtime.dispatchAction({
      actionId,
      cookieHeader,
      headers: {
        host: "app.butter.dev",
        ...(req.headers ?? {}),
      },
      origin: req.origin,
      payload: req.input,
    });

    // In Next.js, 500 is the rejection status for CSRF/Origin mismatch!
    const isRejected = res.status >= 400;

    return {
      cookies: res.cookies,
      data: isRejected
        ? undefined
        : (JSON.parse(res.flightBody.slice(2)) as TOutput),
      error: isRejected ? res.flightBody : undefined,
      headers: res.headers,
      rejected: isRejected,
      sideEffectOccurred: res.sideEffectOccurred,
      status: res.status,
    };
  }

  async invokeNavigation(
    req: ExposureNavigationRequest
  ): Promise<ExposureNavigationResponse> {
    if (!this.includeRouteHandler) {
      throw new Error(
        "Next.js Server Actions alone cannot handle navigations (POST-only); Route Handler required."
      );
    }

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

    const response = await this.runtime.dispatchRouteHandler(
      new Request(url.toString(), { headers, method: "GET" })
    );

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
