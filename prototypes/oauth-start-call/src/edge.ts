// PROTOTYPE — Butter-owned edge Primitives. ONE copy, used by every door.
import type { OAuthPending, OAuthStarted } from "./flows.ts"

export const BASE_URL = "https://app.example"
export const AUTH_BASE = "/auth" // where the fetch handler is mounted
export const CALLBACK_URL = `${BASE_URL}${AUTH_BASE}/oauth/github/callback`

// Demo knob: what Path the pending cookie gets. `undefined` = no Path attribute (the pitfall).
export const edgeKnobs: { pendingCookiePath: string | undefined } = { pendingCookiePath: "/" }

const PENDING = "butter_oauth"
const SESSION = "butter_session"

const attrs = (path: string | undefined, maxAge: number) =>
  [path === undefined ? undefined : `Path=${path}`, "HttpOnly", "Secure", "SameSite=Lax", `Max-Age=${maxAge}`]
    .filter(Boolean)
    .join("; ")

// The cookie effect "oauthPending": what EVERY door must do with an OAuthStarted result.
export const oauthPendingEffect = (started: OAuthStarted) => ({
  reply: { _tag: "AuthorizationRedirect" as const, url: started.url },
  setCookies: [`${PENDING}=${Buffer.from(JSON.stringify(started.pending)).toString("base64url")}; ${attrs(edgeKnobs.pendingCookiePath, 600)}`]
})

export const readPending = (cookies: Record<string, string>): OAuthPending | undefined => {
  const raw = cookies[PENDING]
  if (!raw) return undefined
  try {
    return JSON.parse(Buffer.from(raw, "base64url").toString())
  } catch {
    return undefined
  }
}

export const sessionCookie = (token: string) => `${SESSION}=${token}; ${attrs("/", 60 * 60 * 24 * 30)}`
export const clearPendingCookie = `${PENDING}=; ${attrs("/", 0)}`
export const readSessionToken = (cookies: Record<string, string>) => cookies[SESSION]

export const parseCookieHeader = (h: string | null | undefined): Record<string, string> =>
  Object.fromEntries(
    (h ?? "").split(";").map((p) => p.trim()).filter(Boolean).map((p) => [p.slice(0, p.indexOf("=")), p.slice(p.indexOf("=") + 1)])
  )
