// PROTOTYPE — the Flows (HTTP-free) plus a fake GitHub. One start Flow serves BOTH start actions.
import { Effect } from "effect"
import { ProviderUnavailable, RateLimited } from "./contract.ts"

const b64url = (bytes: Uint8Array) => Buffer.from(bytes).toString("base64url")
const random = (n = 32) => b64url(crypto.getRandomValues(new Uint8Array(n)))
const sha256 = async (s: string) => b64url(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s))))

// ---------- knobs the demo flips ----------
export const knobs = { githubDown: false, rateLimited: false }

// ---------- fake GitHub ----------
const codes = new Map<string, { challenge: string; githubUser: string }>()
export const GITHUB = "https://github.example"
export const github = {
  // what the browser hits: the user "approves" instantly and is sent back to redirect_uri
  authorize(url: URL): string {
    const code = random(8)
    codes.set(code, { challenge: url.searchParams.get("code_challenge")!, githubUser: "octocat" })
    const back = new URL(url.searchParams.get("redirect_uri")!)
    back.searchParams.set("code", code)
    back.searchParams.set("state", url.searchParams.get("state")!)
    return back.toString()
  },
  // server-to-server: the code is useless without the PKCE verifier
  async token(code: string, verifier: string): Promise<string | undefined> {
    const entry = codes.get(code)
    codes.delete(code) // single-use
    if (!entry || entry.challenge !== (await sha256(verifier))) return undefined
    return entry.githubUser
  }
}

// ---------- Flows ----------
export interface OAuthPending {
  readonly state: string
  readonly codeVerifier: string
  readonly returnTo: string
}
export interface OAuthStarted {
  readonly url: string // the only part a client ever sees
  readonly pending: OAuthPending // server-only, travels in cookies
}

const safeReturnTo = (r: string | undefined) => (r && r.startsWith("/") && !r.startsWith("//") ? r : "/")

export const startOAuth = (input: { returnTo?: string | undefined }, callbackUrl: string) =>
  Effect.gen(function* () {
    if (knobs.rateLimited) return yield* Effect.fail(new RateLimited({ retryAfterSeconds: 30 }))
    if (knobs.githubDown) return yield* Effect.fail(new ProviderUnavailable())
    const state = random()
    const codeVerifier = random()
    const url = new URL(`${GITHUB}/login/oauth/authorize`)
    url.searchParams.set("client_id", "butter-demo")
    url.searchParams.set("redirect_uri", callbackUrl)
    url.searchParams.set("state", state)
    url.searchParams.set("code_challenge", yield* Effect.promise(() => sha256(codeVerifier)))
    url.searchParams.set("code_challenge_method", "S256")
    return { url: url.toString(), pending: { state, codeVerifier, returnTo: safeReturnTo(input.returnTo) } } satisfies OAuthStarted
  })

export type FinishError = "OAuthStateMismatch" | "OAuthDenied" | "OAuthCodeRejected"
export const sessions = new Map<string, string>() // token -> userId
export const finishOAuth = (q: { code?: string | undefined; state?: string | undefined; error?: string | undefined }, pending: OAuthPending | undefined) =>
  Effect.gen(function* () {
    if (q.error) return yield* Effect.fail("OAuthDenied" as FinishError)
    if (!pending || !q.state || q.state !== pending.state) return yield* Effect.fail("OAuthStateMismatch" as FinishError)
    const user = yield* Effect.promise(() => github.token(q.code ?? "", pending.codeVerifier))
    if (!user) return yield* Effect.fail("OAuthCodeRejected" as FinishError)
    const token = random()
    sessions.set(token, `user:${user}`)
    return { token, returnTo: pending.returnTo }
  })
