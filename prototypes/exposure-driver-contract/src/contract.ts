/**
 * Exposure Driver Contract for Butter Auth
 *
 * Defines the bridge between Butter's Exposure Invariant tests
 * and an application's Exposure (Effect RPC, Server Actions, Fetch Handlers, etc.)
 */

export interface ExposureCookie {
  name: string;
  value: string;
  httpOnly?: boolean;
  sameSite?: "lax" | "strict" | "none";
  secure?: boolean;
  path?: string;
  /** Lifetime in seconds */
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
  /** Was the call rejected by transport security (CSRF, origin check, etc.)? */
  rejected: boolean;
  cookies: Map<string, ExposureCookie>;
  headers: Headers;
  data?: TOutput;
  error?: unknown;
  /** Did the mutation execute in the underlying store? */
  sideEffectOccurred: boolean;
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

export interface DriverCapabilities {
  supportsNavigations: boolean;
  nativeOriginCheck: boolean;
  directResponseHeaders: boolean;
  wireFormat: "json" | "rsc-flight" | "custom";
}

export interface ExposureDriver {
  readonly name: string;
  readonly capabilities: DriverCapabilities;
  readonly invokeCall: <TInput, TOutput>(
    req: ExposureCallRequest<TInput>
  ) => Promise<ExposureCallResponse<TOutput>>;
  readonly invokeNavigation: (
    req: ExposureNavigationRequest
  ) => Promise<ExposureNavigationResponse>;
}
