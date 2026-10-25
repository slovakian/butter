// PROTOTYPE — the Host: one app server mounting the fetch handler at /auth plus both RPC doors.
import { Layer } from "effect"
import { HttpRouter, HttpServer } from "effect/http"
import { RPCHandler } from "@orpc/server/fetch"
import { RequestHeadersPlugin, ResponseHeadersPlugin } from "@orpc/server/plugins"
import { ButterAuthRoutes, fetchHandler } from "./door-fetch.ts"
import { effectRpcRoutes } from "./door-effect-rpc.ts"
import { appRouter } from "./door-orpc.ts"

// Effect app: its own RPC route and Butter's routes in ONE HttpRouter (option 3 from the comparison).
const effectApp = HttpRouter.toWebHandler(
  Layer.mergeAll(effectRpcRoutes("/rpc/effect"), ButterAuthRoutes).pipe(Layer.provide(HttpServer.layerServices)),
  { disableLogger: true } as any
).handler

// oRPC app: the APP's RPCHandler. Butter's procedures need these two plugins on it.
export const orpcKnobs = { withResponseHeadersPlugin: true }
const orpcWith = new RPCHandler(appRouter, { plugins: [new RequestHeadersPlugin(), new ResponseHeadersPlugin()] })
const orpcWithout = new RPCHandler(appRouter, { plugins: [new RequestHeadersPlugin()] })

const page = (name: string) => new Response(`<h1>${name}</h1>`, { headers: { "content-type": "text/html" } })

export const app = async (req: Request): Promise<Response> => {
  const { pathname } = new URL(req.url)
  if (pathname.startsWith("/rpc/orpc/")) {
    const handler = orpcKnobs.withResponseHeadersPlugin ? orpcWith : orpcWithout
    const { matched, response } = await handler.handle(req, { prefix: "/rpc/orpc", context: {} })
    return matched ? response : new Response("not found", { status: 404 })
  }
  if (pathname === "/rpc/effect" || pathname === "/rpc/effect/") return effectApp(req) // Effect app's merged router (RpcClient adds a trailing "/")
  if (pathname.startsWith("/auth/")) return fetchHandler(req) // Butter's fetch handler, own mount
  return page(pathname) // the app's UI pages: /, /login, /dashboard, /settings …
}
