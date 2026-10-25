// PROTOTYPE — run: npx tsx src/demo.ts
// Walks the start Call and the start link through every door and client, then the pitfalls.
import { createORPCClient, safe } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import type { ContractRouterClient } from "@orpc/contract"
import { Effect, Layer } from "effect"
import { FetchHttpClient } from "effect/http"
import { HttpApiClient } from "effect/http-api"
import { RpcClient, RpcSerialization } from "effect/rpc"
import { app, orpcKnobs } from "./app.ts"
import { makeBrowser } from "./browser.ts"
import { Contract } from "./contract.ts"
import { AuthRpcs } from "./door-effect-rpc.ts"
import type { appContract } from "./door-orpc.ts"
import { BASE_URL, edgeKnobs } from "./edge.ts"
import { knobs } from "./flows.ts"

const browser = makeBrowser(app)
const fetchLayer = Layer.merge(FetchHttpClient.layer, Layer.succeed(FetchHttpClient.Fetch, browser.fetch as typeof fetch))

// ---------- the three clients, all derived from the Contract ----------
// Butter's `auth` client (HttpApiClient against the fetch handler), Promise shape `{ ok, value | error }`.
const auth = {
  oauth: {
    githubStart: (payload: { returnTo?: string }) =>
      HttpApiClient.make(Contract, { baseUrl: BASE_URL }).pipe(
        Effect.flatMap((c) => c.oauth.githubStart({ payload })),
        Effect.map((value) => ({ ok: true as const, value })),
        Effect.catchTags({ RateLimited: (error) => Effect.succeed({ ok: false as const, error }), ProviderUnavailable: (error) => Effect.succeed({ ok: false as const, error }) }),
        Effect.provide(fetchLayer),
        Effect.runPromise
      )
  },
  me: () => HttpApiClient.make(Contract, { baseUrl: BASE_URL }).pipe(Effect.flatMap((c) => c.session.me({ payload: {} })), Effect.provide(fetchLayer), Effect.runPromise)
}
// `navigationUrl`: Effect's urlBuilder over the same Contract.
const urls = HttpApiClient.urlBuilder(Contract, { baseUrl: BASE_URL })

// Effect RPC client.
const effectRpc = <A, E>(f: (c: RpcClient.FromGroup<typeof AuthRpcs, any>) => Effect.Effect<A, E>) =>
  RpcClient.make(AuthRpcs).pipe(
    Effect.flatMap(f),
    Effect.scoped,
    Effect.provide(RpcClient.layerProtocolHttp({ url: `${BASE_URL}/rpc/effect` })),
    Effect.provide(RpcSerialization.layerJson),
    Effect.provide(fetchLayer),
    Effect.runPromise
  )

// oRPC client (the APP's client; Butter's procedures sit under `auth`).
const orpc: ContractRouterClient<typeof appContract> = createORPCClient(
  new RPCLink({ url: "/rpc/orpc", fetch: (url, init) => browser.fetch(new URL(url, BASE_URL), init) })
)

// ---------- helpers ----------
const show = (label: string, value: unknown) => console.log(`  ${label.padEnd(16)} ${typeof value === "string" ? value : JSON.stringify(value)}`)
const reset = () => {
  browser.clear()
  Object.assign(knobs, { githubDown: false, rateLimited: false })
  edgeKnobs.pendingCookiePath = "/"
  orpcKnobs.withResponseHeadersPlugin = true
}
const hideSecrets = (url: string) => url.replace(/(state|code_challenge)=[^&]+/g, "$1=…")
const finish = async (url: string, whoAmI: () => Promise<unknown>) => {
  show("cookies before", browser.cookies())
  const nav = await browser.navigate(url)
  show("hops", nav.hops.join("  →  "))
  show("landed on", nav.landed)
  show("cookies after", browser.cookies())
  show("me()", await whoAmI())
}

console.log("\n=== 1. Start with a LINK (Navigation) — <a href={navigationUrl(...)}>")
reset()
{
  const href = urls.oauth.githubAuthorize({ query: { returnTo: "/dashboard" } })
  show("href", href)
  await finish(href, auth.me)
}

console.log("\n=== 2. Start with a CALL via Butter's `auth` client (fetch handler)")
reset()
{
  const r = await auth.oauth.githubStart({ returnTo: "/settings" })
  show("reply", r.ok ? { ...r.value, url: hideSecrets(r.value.url) } : r)
  if (r.ok) await finish(r.value.url, auth.me) // the app's code: location.assign(r.value.url)
}

console.log("\n=== 3. Start with a CALL via Effect RPC (app's Effect router, Butter routes merged in)")
reset()
{
  const r = (await effectRpc((c) => c["oauth.githubStart"]({ returnTo: "/settings" }))) as { url: string }
  show("reply", { ...r, url: hideSecrets(r.url) })
  await finish(r.url, () => effectRpc((c) => c["session.me"]({})))
}

console.log("\n=== 4. Start with a CALL via oRPC (app's own client, `client.auth.oauth.githubStart`)")
reset()
{
  const r = await orpc.auth.oauth.githubStart({ returnTo: "/settings" })
  show("reply", { ...r, url: hideSecrets(r.url) })
  await finish(r.url, () => orpc.auth.session.me({}))
}

console.log("\n=== 5. Typed error BEFORE leaving the page (rate limited)")
reset()
knobs.rateLimited = true
{
  const a = await auth.oauth.githubStart({})
  show("auth client", a.ok ? "ok?!" : a.error)
  const e = await effectRpc((c) => c["oauth.githubStart"]({}).pipe(Effect.flip))
  show("Effect RPC", { _tag: (e as any)._tag, retryAfterSeconds: (e as any).retryAfterSeconds })
  const [err, , isDefined] = await safe(orpc.auth.oauth.githubStart({}))
  show("oRPC", { isDefined, code: (err as any)?.code, status: (err as any)?.status, data: (err as any)?.data })
  const nav = await browser.navigate(urls.oauth.githubAuthorize({ query: {} }))
  show("link", `can only bounce: ${nav.landed}`)
}

console.log("\n=== 6. PITFALL: pending cookie without an explicit Path")
const starts: Array<[string, () => Promise<string>]> = [
  ["fetch handler", async () => ((await auth.oauth.githubStart({})) as any).value.url],
  ["Effect RPC", async () => ((await effectRpc((c) => c["oauth.githubStart"]({}))) as any).url],
  ["oRPC", async () => ((await orpc.auth.oauth.githubStart({})) as any).url]
]
for (const [door, start] of starts) {
  reset()
  edgeKnobs.pendingCookiePath = undefined
  const url = await start()
  const jar = browser.cookies()
  const nav = await browser.navigate(url as string)
  show(door, `cookie ${jar.at(-1)}  →  ${nav.landed}`)
}

console.log("\n=== 7. PITFALL: the app's RPCHandler is missing ResponseHeadersPlugin")
reset()
orpcKnobs.withResponseHeadersPlugin = false
{
  const [err] = await safe(orpc.auth.oauth.githubStart({}))
  show("oRPC", err ? `fails closed: ${(err as any).code} (${(err as any).status})` : "SILENTLY no cookie")
}

console.log("\n=== 8. Two tabs start sign-in before either finishes (one pending-cookie slot)")
reset()
{
  const tabA = (await orpc.auth.oauth.githubStart({ returnTo: "/a" })).url
  const tabB = urls.oauth.githubAuthorize({ query: { returnTo: "/b" } })
  const b = await browser.navigate(tabB) // tab B finishes first, via the link
  const a = await browser.navigate(tabA) // tab A comes back from GitHub second
  show("tab B (link)", b.landed)
  show("tab A (oRPC)", a.landed)
}
console.log("\n=== 9. SURPRISE: Effect RPC message headers override the real HTTP request headers")
reset()
{
  await effectRpc((c) => c["oauth.githubStart"]({}, { headers: { "x-butter-cookie-bucket": "forged" } }))
  show("cookies", `${JSON.stringify(browser.cookies())}  (the client redirected the bucket; same goes for origin/cookie)`)
}
console.log()
