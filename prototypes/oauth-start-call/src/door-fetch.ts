// PROTOTYPE — door 1: the fetch handler (HttpApiBuilder). Serves Calls AND Navigations.
import { Effect, Layer } from "effect"
import { Cookies, HttpEffect, HttpRouter, HttpServer, HttpServerRequest, HttpServerResponse } from "effect/http"
import { HttpApiBuilder } from "effect/http-api"
import { Contract, Me } from "./contract.ts"
import { CALLBACK_URL, clearPendingCookie, oauthPendingEffect, readPending, readSessionToken, sessionCookie } from "./edge.ts"
import { finishOAuth, sessions, startOAuth } from "./flows.ts"

const withSetCookies = (setCookies: ReadonlyArray<string>) =>
  HttpEffect.appendPreResponseHandler((_req, res) => Effect.succeed(HttpServerResponse.mergeCookies(res, Cookies.fromSetCookie(setCookies))))

// Navigation errors can only travel as `?error=<tag>` on a redirect (per the Flow Errors ticket).
const errorRedirect = (tag: string) => HttpServerResponse.redirect(`/login?error=${tag}`, { status: 302 })

const OAuthLive = HttpApiBuilder.group(Contract, "oauth", (h) =>
  h
    // Call: JSON reply, cookies via a pre-response handler (HttpApi handlers run in the request fiber).
    .handle("githubStart", ({ payload }) =>
      Effect.gen(function* () {
        const fx = oauthPendingEffect(yield* startOAuth(payload, CALLBACK_URL))
        yield* withSetCookies(fx.setCookies)
        return fx.reply
      })
    )
    // Navigation: SAME Flow, SAME cookie effect, reply turned into a 302.
    .handle("githubAuthorize", ({ query }) =>
      startOAuth(query, CALLBACK_URL).pipe(
        Effect.flatMap((started) => {
          const fx = oauthPendingEffect(started)
          return HttpServerResponse.redirect(fx.reply.url, { status: 302 }).pipe(
            HttpServerResponse.mergeCookies(Cookies.fromSetCookie(fx.setCookies)),
            Effect.succeed
          )
        }),
        Effect.catch((e) => Effect.succeed(errorRedirect(e._tag)))
      )
    )
    .handle("githubCallback", ({ query }) =>
      Effect.gen(function* () {
        const req = yield* HttpServerRequest.HttpServerRequest
        const result = yield* finishOAuth(query, readPending(req.cookies)).pipe(Effect.result)
        const clear = Cookies.fromSetCookie([clearPendingCookie])
        if (result._tag === "Failure") return HttpServerResponse.mergeCookies(errorRedirect(result.failure), clear)
        return HttpServerResponse.redirect(result.success.returnTo, { status: 302 }).pipe(
          HttpServerResponse.mergeCookies(Cookies.fromSetCookie([clearPendingCookie, sessionCookie(result.success.token)]))
        )
      })
    )
)

const SessionLive = HttpApiBuilder.group(Contract, "session", (h) =>
  h.handle("me", () =>
    Effect.gen(function* () {
      const req = yield* HttpServerRequest.HttpServerRequest
      const token = readSessionToken(req.cookies)
      return Me.make({ userId: (token && sessions.get(token)) ?? null })
    })
  )
)

// Butter can export this LAYER as well as a web handler: an Effect app merges it into its own router.
export const ButterAuthRoutes = HttpApiBuilder.layer(Contract).pipe(
  Layer.provide([OAuthLive, SessionLive])
)

export const fetchHandler = HttpRouter.toWebHandler(
  ButterAuthRoutes.pipe(Layer.provide(HttpServer.layerServices)),
  { disableLogger: true } as any
).handler
