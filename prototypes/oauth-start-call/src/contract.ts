// PROTOTYPE (throwaway) — the oauth Slice's Contract, as plain Effect HttpApi + Butter annotations.
// Question: what does an OAuth *start Call* cost next to the start/callback Navigations? (slovakian/butter#47)
import { Context, Schema } from "effect"
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "effect/http-api"

// ---------- Butter annotation ----------
// kind: call → every door; navigation → HTTP-shaped doors only (fetch handler).
// sets: which cookie effect the door must apply to the reply. This is NEW: until now only the
// Session effect set cookies; the start Call adds a second kind ("oauthPending").
export interface ButterAnnotation {
  readonly kind: "call" | "navigation"
  readonly sets: "none" | "oauthPending" | "session"
  readonly payload: Schema.Struct<Schema.Struct.Fields>
  readonly success: ReadonlyArray<Schema.Top>
  readonly error: ReadonlyArray<Schema.Top>
}
export const Butter = Context.Service<ButterAnnotation>("butter/Contract")
export const getButter = (e: HttpApiEndpoint.Top) => Context.getOrUndefined(e.annotations, Butter)

// ---------- replies and Flow Errors ----------
// Success replies are TaggedStructs (per "How does one Slice extend another Slice's Contract?").
// The reply carries ONLY the URL. `state` and the PKCE verifier never reach JS: they go in cookies.
export const AuthorizationRedirect = Schema.TaggedStruct("AuthorizationRedirect", { url: Schema.String })

export class ProviderUnavailable extends Schema.TaggedError<ProviderUnavailable>()(
  "ProviderUnavailable", {}, { httpApiStatus: 503 }
) {}
export class RateLimited extends Schema.TaggedError<RateLimited>()(
  "RateLimited", { retryAfterSeconds: Schema.Number }, { httpApiStatus: 429 }
) {}

// `returnTo` must be a same-site path; the Flow checks it (open-redirect Invariant).
const StartInput = Schema.Struct({ returnTo: Schema.optional(Schema.String) })

// ---------- the three actions ----------
// 1. start as a Call: POST, JSON in, JSON out. Ends up on EVERY client.
const githubStart = HttpApiEndpoint.post("githubStart", "/oauth/github/start", {
  payload: StartInput,
  success: AuthorizationRedirect,
  error: [ProviderUnavailable, RateLimited]
}).annotate(Butter, {
  kind: "call", sets: "oauthPending",
  payload: StartInput, success: [AuthorizationRedirect], error: [ProviderUnavailable, RateLimited]
})

// 2. start as a Navigation: GET, a plain link. Same Flow. Only the fetch handler serves it.
//    NOTE: it needs a different id AND a different path from the Call (an HttpApi group can't
//    hold two endpoints with one id), so naming is a real decision, see README.
const githubAuthorize = HttpApiEndpoint.get("githubAuthorize", "/oauth/github/authorize", {
  query: StartInput
}).annotate(Butter, { kind: "navigation", sets: "oauthPending", payload: StartInput, success: [], error: [] })

// 3. callback: GET from GitHub. Always a Navigation, always the fetch handler.
const githubCallback = HttpApiEndpoint.get("githubCallback", "/oauth/github/callback", {
  query: Schema.Struct({ code: Schema.optional(Schema.String), state: Schema.optional(Schema.String), error: Schema.optional(Schema.String) })
}).annotate(Butter, { kind: "navigation", sets: "session", payload: Schema.Struct({}), success: [], error: [] })

// A tiny `session` group so "am I signed in?" is visible from every client.
export const Me = Schema.TaggedStruct("Me", { userId: Schema.NullOr(Schema.String) })
const sessionMe = HttpApiEndpoint.post("me", "/session/me", { payload: Schema.Struct({}), success: Me }).annotate(Butter, {
  kind: "call", sets: "none", payload: Schema.Struct({}), success: [Me], error: []
})

export const OAuthContract = HttpApiGroup.make("oauth").add(githubStart, githubAuthorize, githubCallback)
export const SessionContract = HttpApiGroup.make("session").add(sessionMe)

// The Contract Root. Every door and client below is derived from this one value.
// basePath "/auth" is applied when the Contract Root is rendered (configured, never from `Host`).
export const Contract = HttpApi.make("butter").add(OAuthContract.prefix("/auth"), SessionContract.prefix("/auth"))
