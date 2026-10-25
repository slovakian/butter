// PROTOTYPE — door 2: Effect RPC, derived from the Contract (Calls only).
//
// SURPRISE: an Effect RPC handler cannot touch the HTTP response. RpcServer runs handlers on the
// server's own fibers (rpc/RpcServer.js `makeProtocolWithHttpEffect`): the handler gets
// `{ payload, headers }`, never `HttpServerRequest`, so `HttpEffect.appendPreResponseHandler` is
// unreachable. Butter's door therefore wraps the RPC HTTP route with a per-request "cookie bucket":
// the wrapper opens a bucket, tags the request with its id, handlers drop Set-Cookie strings in it,
// and the wrapper copies them onto the response. This works ONLY because the JSON serialization
// buffers: the response is built after every handler finished. With a framing serialization
// (ndjson / msgpack streaming) the response starts first and cookies would be lost.
//
// This is not new with the OAuth start Call: every sign-in Call on this door must set the Session
// cookie the same way. The start Call just makes it visible.
import { Effect, Layer, Schema } from "effect"
import { Cookies, HttpRouter, HttpServerRequest, HttpServerResponse } from "effect/http"
import { HttpApiEndpoint, HttpApiGroup } from "effect/http-api"
import { Rpc, RpcGroup, RpcSerialization, RpcServer } from "effect/rpc"
import { Contract, getButter, Me } from "./contract.ts"
import { CALLBACK_URL, oauthPendingEffect, parseCookieHeader, readSessionToken } from "./edge.ts"
import { sessions, startOAuth } from "./flows.ts"

// ---------- generator: Contract → RpcGroup (Calls only; kind is visible to types via the method) ----------
type UnionOf<S extends Schema.Top> = [S] extends [never] ? typeof Schema.Never : Schema.Union<ReadonlyArray<S>>
type EndpointToRpc<GId extends string, E> = E extends HttpApiEndpoint.HttpApiEndpoint<
  infer Id, infer M, infer _Path, infer _Params, infer _Query, infer P, infer _H, infer S, infer Er, infer _Mw, infer _MwS
> ? M extends "POST" ? Rpc.Rpc<`${GId}.${Id}`, P, UnionOf<S>, UnionOf<Er>> : never
  : never
type GroupToRpcs<G> = G extends HttpApiGroup.HttpApiGroup<infer GId, infer Es, any> ? EndpointToRpc<GId, Es> : never

const unionOf = (s: ReadonlyArray<Schema.Top>): Schema.Top => (s.length === 0 ? Schema.Never : s.length === 1 ? s[0]! : Schema.Union(s))
export const toRpcGroup = <const Gs extends ReadonlyArray<HttpApiGroup.HttpApiGroup<string, any, boolean>>>(
  ...groups: Gs
): RpcGroup.RpcGroup<GroupToRpcs<Gs[number]>> => {
  const rpcs: Array<Rpc.Any> = []
  for (const g of groups)
    for (const ep of Object.values(g.endpoints as Record<string, HttpApiEndpoint.Top>)) {
      const b = getButter(ep)
      if (b?.kind !== "call") continue
      rpcs.push(Rpc.make(`${g.identifier}.${ep.identifier}`, { payload: b.payload, success: unionOf(b.success), error: unionOf(b.error) }))
    }
  return RpcGroup.make(...rpcs) as any
}

export const AuthRpcs = toRpcGroup(Contract.groups.oauth, Contract.groups.session)

// ---------- the cookie bucket ----------
const BUCKET = "x-butter-cookie-bucket"
const buckets = new Map<string, Array<string>>()
const pushCookies = (headers: Record<string, string | undefined>, setCookies: ReadonlyArray<string>) =>
  Effect.sync(() => buckets.get(headers[BUCKET] ?? "")?.push(...setCookies))

const Handlers = AuthRpcs.toLayer({
  "oauth.githubStart": (payload, { headers }) =>
    Effect.gen(function* () {
      const fx = oauthPendingEffect(yield* startOAuth(payload, CALLBACK_URL))
      yield* pushCookies(headers, fx.setCookies)
      return fx.reply
    }),
  "session.me": (_payload, { headers }) =>
    Effect.sync(() => {
      const token = readSessionToken(parseCookieHeader(headers.cookie))
      return Me.make({ userId: (token && sessions.get(token)) ?? null })
    })
})

export const effectRpcRoutes = (path: `/${string}`) =>
  HttpRouter.use((router) =>
    Effect.gen(function* () {
      const rpcHttp = yield* RpcServer.toHttpEffect(AuthRpcs)
      yield* router.add("POST", path, (req) =>
        Effect.gen(function* () {
          const id = crypto.randomUUID()
          buckets.set(id, [])
          const tagged = req.modify({ headers: { ...req.headers, [BUCKET]: id } })
          const res = yield* rpcHttp.pipe(Effect.provideService(HttpServerRequest.HttpServerRequest, tagged))
          const setCookies = buckets.get(id) ?? []
          buckets.delete(id)
          return HttpServerResponse.mergeCookies(res, Cookies.fromSetCookie(setCookies))
        })
      )
    })
  ).pipe(Layer.provide(Handlers), Layer.provide(RpcSerialization.layerJson))
