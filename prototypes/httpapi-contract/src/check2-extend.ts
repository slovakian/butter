// PROTOTYPE — Check 2: one Slice extends another Slice's endpoint; the app adds a sign-up field.
import { Effect, Layer } from "effect"
import { HttpRouter, HttpServer } from "effect/http"
import { HttpApiBuilder, HttpApiClient, HttpApiEndpoint, HttpApiGroup, HttpApiSchema } from "effect/http-api"
import { Contract } from "./contract-root.ts"
import { getButter } from "./butter.ts"
import { InvalidCredentials, SignedIn } from "./slices/password.contract.ts"
import { SecondFactorRequired } from "./slices/two-factor.contract.ts"
import type { Equal, Expect } from "./type-test.ts"

// ---- types: the composed Contract ----
type Groups = typeof Contract extends import("effect/http-api").HttpApi.HttpApi<any, infer G extends HttpApiGroup.Constraint> ? G : never
type Password = HttpApiGroup.WithIdentifier<Groups, "password">
type SignIn = HttpApiEndpoint.WithIdentifier<HttpApiGroup.Endpoints<Password>, "signIn">
type SignUp = HttpApiEndpoint.WithIdentifier<HttpApiGroup.Endpoints<Password>, "signUp">

export type T1 = Expect<Equal<HttpApiEndpoint.Success<SignIn>["Type"], SignedIn | SecondFactorRequired>>
export type T2 = Expect<Equal<HttpApiEndpoint.Error<SignIn>["Type"], InvalidCredentials>>
export type T3 = Expect<
  Equal<HttpApiEndpoint.Payload<SignUp>["Type"], { readonly email: string; readonly password: string; readonly displayName: string }>
>
// signIn payload is untouched by the sign-up extension
export type T4 = Expect<Equal<HttpApiEndpoint.Payload<SignIn>["Type"], { readonly email: string; readonly password: string }>>

// ---- server: handlers must honour the extended types ----
const PasswordHandlers = HttpApiBuilder.group(Contract, "password", (h) =>
  Effect.succeed(
    h
      .handle("signIn", ({ payload }) =>
        payload.password === "wrong"
          ? Effect.fail(new InvalidCredentials())
          : payload.email.startsWith("2fa")
            ? Effect.succeed(new SecondFactorRequired({ methods: ["totp"] }))
            : Effect.succeed(new SignedIn({ userId: payload.email }))
      )
      .handle("signUp", ({ payload }) => Effect.succeed(new SignedIn({ userId: payload.displayName })))
      .handle("verifyEmail", ({ query }) =>
        Effect.succeed(HttpApiSchema.withHeaders({ body: undefined, headers: { location: `/app?verified=${query.token}` } }))
      )
  )
)
const TwoFactorHandlers = HttpApiBuilder.group(Contract, "twoFactor", (h) =>
  Effect.succeed(h.handle("verify", () => Effect.succeed(new SignedIn({ userId: "u" }))))
)

// ---- client: the typed HttpApi client sees the extended types ----
export const clientProgram = Effect.gen(function* () {
  const client = yield* HttpApiClient.make(Contract, { baseUrl: "http://x" })
  const r = yield* client.password.signIn({ payload: { email: "a", password: "b" } })
  type _C1 = Expect<Equal<typeof r, SignedIn | SecondFactorRequired>>
  // @ts-expect-error displayName is required by the app extension
  yield* client.password.signUp({ payload: { email: "a", password: "b" } })
})

// ---- runtime ----
const { handler, dispose } = HttpRouter.toWebHandler(
  HttpApiBuilder.layer(Contract, { openapiPath: "/openapi.json" }).pipe(
    Layer.provide([PasswordHandlers, TwoFactorHandlers]),
    Layer.provide(HttpServer.layerServices)
  )
)
const post = async (path: string, body: unknown) => {
  const res = await handler(new Request(`http://x${path}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }))
  return { status: res.status, body: await res.text() }
}
console.log("signIn plain   ", await post("/signIn", { email: "a@b", password: "p" }))
console.log("signIn 2fa     ", await post("/signIn", { email: "2fa@b", password: "p" }))
console.log("signIn wrong   ", await post("/signIn", { email: "a@b", password: "wrong" }))
console.log("signUp no name ", await post("/signUp", { email: "a@b", password: "p" }))
console.log("signUp w/ name ", await post("/signUp", { email: "a@b", password: "p", displayName: "Ada" }))
const signIn = (Contract.groups as any).password.endpoints.signIn
console.log("signIn Butter annotation", JSON.stringify({ kind: getButter(signIn)?.kind, session: getButter(signIn)?.session }))
const openapi = await (await handler(new Request("http://x/openapi.json"))).json()
console.log("openapi signIn 200 schema", JSON.stringify(openapi.paths["/signIn"].post.responses["200"].content["application/json"].schema))
await dispose()
