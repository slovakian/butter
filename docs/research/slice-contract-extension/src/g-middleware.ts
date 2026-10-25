// G. Annotations + middleware. Annotations are runtime-only; middleware is TYPE-VISIBLE on the endpoint
// and can add ERROR variants (not successes, not input fields) to every endpoint that carries it.
import { Context, Effect, Layer, Schema } from "effect"
import { HttpRouter, HttpServer } from "effect/http"
import { HttpApi, HttpApiBuilder, HttpApiClient, HttpApiEndpoint, HttpApiGroup, HttpApiMiddleware } from "effect/http-api"
import type { Equal, Expect } from "./support/type-test.ts"
import { Credentials, InvalidCredentials, SignedIn } from "./support/slices.ts"

// Annotations: a Context key on the endpoint. Readable at runtime, invisible to the type system.
const Butter = Context.Service<{ readonly kind: "call" | "navigation" }>("butter/Contract")
const annotated = HttpApiEndpoint.post("x", "/x").annotate(Butter, { kind: "call" })
export type G0 = Expect<Equal<typeof annotated.annotations, Context.Context<never>>>

// A Butter-owned marker middleware that every sign-in Slice puts on its sign-in endpoint (anticipated by authors).
// Its error is fixed where the marker is DECLARED, so it must be generic ("a further step is required").
export class SignInStepRequired extends Schema.TaggedError<SignInStepRequired>()(
  "SignInStepRequired",
  { step: Schema.String },
  { httpApiStatus: 403 }
) {}
export class SignInStep extends HttpApiMiddleware.Service<SignInStep>()("butter/SignInStep", { error: SignInStepRequired }) {}

const Password = HttpApiGroup.make("password").add(
  HttpApiEndpoint.post("signIn", "/signIn", { payload: Credentials, success: SignedIn, error: InvalidCredentials }).middleware(SignInStep),
  HttpApiEndpoint.post("signUp", "/signUp", { payload: Credentials, success: SignedIn })
)
const EmailCode = HttpApiGroup.make("emailCode").add(
  HttpApiEndpoint.post("signIn", "/emailCode/signIn", { payload: Schema.Struct({ code: Schema.String }), success: SignedIn }).middleware(SignInStep)
)
const Api = HttpApi.make("butter").add(Password, EmailCode)

// "Every sign-in" by TYPE: select endpoints whose middleware includes the marker, across groups.
type AllEndpoints = HttpApiGroup.Endpoints<typeof Password | typeof EmailCode>
type SignIns<E> = E extends unknown ? ([SignInStep] extends [HttpApiEndpoint.Middleware<E>] ? E : never) : never
export type G1 = Expect<Equal<HttpApiEndpoint.Identifier<SignIns<AllEndpoints>>, "signIn">>
export type G2 = Expect<Equal<HttpApiEndpoint.Errors<HttpApiEndpoint.WithIdentifier<HttpApiGroup.Endpoints<typeof Password>, "signIn">>,
  InvalidCredentials | SignInStepRequired>>

// The typed client sees the middleware's error on exactly those endpoints.
export const clientProgram = Effect.gen(function* () {
  const client = yield* HttpApiClient.make(Api, { baseUrl: "http://x" })
  return yield* client.password.signIn({ payload: { email: "a", password: "b" } }).pipe(
    Effect.catchTag("SignInStepRequired", (e) => Effect.succeed(e.step))
  )
})

// The 2FA Slice PROVIDES the behaviour as a Layer (without 2FA, Butter would provide a no-op Layer).
const TwoFactorStep = Layer.succeed(SignInStep, (httpEffect) =>
  Effect.flatMap(httpEffect, () => Effect.fail(new SignInStepRequired({ step: "totp" }))))
const Handlers = HttpApiBuilder.group(Api, "password", (h) =>
  Effect.succeed(h.handle("signIn", () => Effect.succeed(SignedIn.make({ userId: "u" }))).handle("signUp", () => Effect.succeed(SignedIn.make({ userId: "u" })))))
const EmailHandlers = HttpApiBuilder.group(Api, "emailCode", (h) => Effect.succeed(h.handle("signIn", () => Effect.succeed(SignedIn.make({ userId: "u" })))))
const { handler, dispose } = HttpRouter.toWebHandler(
  HttpApiBuilder.layer(Api, { openapiPath: "/openapi.json" }).pipe(
    Layer.provide([Handlers, EmailHandlers]), Layer.provide(TwoFactorStep), Layer.provide(HttpServer.layerServices))
)
const res = await handler(new Request("http://x/signIn", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "a", password: "p" }) }))
console.log("G signIn with 2FA layer:", res.status, await res.text())
const openapi = await (await handler(new Request("http://x/openapi.json"))).json()
console.log("G openapi signIn statuses:", Object.keys(openapi.paths["/signIn"].post.responses))
await dispose()
