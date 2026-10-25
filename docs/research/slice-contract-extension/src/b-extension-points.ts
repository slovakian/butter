// B. Slices declare extension points: a Slice's Contract is a function of the extensions it accepts.
// Only public constructors (HttpApiEndpoint.post via call(), HttpApiGroup.make) build the endpoint, once.
import { Effect, Layer, Schema } from "effect"
import { HttpRouter, HttpServer } from "effect/http"
import { HttpApi, HttpApiBuilder, HttpApiClient, HttpApiEndpoint, HttpApiGroup } from "effect/http-api"
import { call, type SessionEffect } from "./support/butter.ts"
import { toRpcGroup } from "./support/derive-rpc.ts"
import { toOrpcContract } from "./support/derive-orpc.ts"
import type { ContractRouterClient } from "@orpc/contract"
import type { Rpc, RpcGroup } from "effect/rpc"
import type { Equal, Expect } from "./support/type-test.ts"
import { CaptchaRequired, Credentials, EmailTaken, InvalidCredentials, SecondFactorRequired, SignedIn } from "./support/slices.ts"

// ---- Butter: what an extension point accepts, and how two contributions merge ----
export interface Point {
  readonly success?: ReadonlyArray<Schema.Top>
  readonly error?: ReadonlyArray<Schema.Top>
  readonly fields?: Schema.Struct.Fields
  readonly session?: Readonly<Record<string, SessionEffect>>
}
type Succ<P> = P extends { readonly success: infer S extends ReadonlyArray<Schema.Top> } ? S : readonly []
type Errs<P> = P extends { readonly error: infer E extends ReadonlyArray<Schema.Top> } ? E : readonly []
type Fields<P> = P extends { readonly fields: infer F extends Schema.Struct.Fields } ? F : {}
type Clash<A, B> = Extract<keyof Fields<A>, keyof Fields<B>>

export const merge = <const A extends Point, const B extends Point>(
  a: A,
  b: B & ([Clash<A, B>] extends [never] ? unknown : { readonly "field defined twice": Clash<A, B> })
): { success: [...Succ<A>, ...Succ<B>]; error: [...Errs<A>, ...Errs<B>]; fields: Fields<A> & Fields<B> } => ({
  success: [...(a.success ?? []), ...(b.success ?? [])],
  error: [...(a.error ?? []), ...(b.error ?? [])],
  fields: { ...a.fields, ...b.fields },
  session: { ...a.session, ...b.session }
}) as any

// ---- password Slice: declares `signIn` and `signUp` as extension points ----
export const passwordContract = <const X extends { readonly signIn?: Point; readonly signUp?: Point } = {}>(
  x: X = {} as X
) =>
  HttpApiGroup.make("password").add(
    call("signIn", {
      payload: Schema.Struct({ ...Credentials.fields, ...x.signIn?.fields } as typeof Credentials.fields & Fields<X["signIn"]>),
      success: [SignedIn, ...(x.signIn?.success ?? [])] as unknown as readonly [typeof SignedIn, ...Succ<X["signIn"]>],
      error: [InvalidCredentials, ...(x.signIn?.error ?? [])] as unknown as readonly [typeof InvalidCredentials, ...Errs<X["signIn"]>],
      session: { SignedIn: "creates", ...x.signIn?.session }
    }),
    call("signUp", {
      payload: Schema.Struct({ ...Credentials.fields, ...x.signUp?.fields } as typeof Credentials.fields & Fields<X["signUp"]>),
      success: [SignedIn] as const,
      error: [EmailTaken] as const,
      session: { SignedIn: "creates" }
    })
  )

// ---- 2FA and captcha Slices: contributions, no import of the password Slice ----
export const twoFactorSignIn = { success: [SecondFactorRequired], session: { SecondFactorRequired: "pending" } } as const
export const captchaSignIn = { success: [CaptchaRequired], fields: { captchaToken: Schema.optionalKey(Schema.String) } } as const

// ---- Contract Root: wiring is explicit; two Slices extend the same point ----
const password = passwordContract({
  signIn: merge(twoFactorSignIn, captchaSignIn),
  signUp: { fields: { displayName: Schema.String } }
})
export const Contract = HttpApi.make("butter").add(password)

// @ts-expect-error two contributions defining the same field is a type error, not a silent intersection
merge({ fields: { a: Schema.String } }, { fields: { a: Schema.Number } })

// @ts-expect-error an extension the Slice author did not declare is rejected (loudly, but it is rejected)
passwordContract({ verifyEmail: { fields: { x: Schema.String } } })

// ---- types end to end ----
type SignIn = HttpApiEndpoint.WithIdentifier<HttpApiGroup.Endpoints<typeof password>, "signIn">
export type B1 = Expect<Equal<HttpApiEndpoint.Success<SignIn>["Type"], SignedIn | SecondFactorRequired | CaptchaRequired>>
export type B2 = Expect<Equal<HttpApiEndpoint.Payload<SignIn>["Type"], { readonly email: string; readonly password: string; readonly captchaToken?: string }>>

const rpcs = toRpcGroup(password)
type SignInRpc = Extract<RpcGroup.Rpcs<typeof rpcs>, { readonly _tag: "password.signIn" }>
export type B3 = Expect<Equal<Rpc.Success<SignInRpc>, SignedIn | SecondFactorRequired | CaptchaRequired>>

const orpc = toOrpcContract(password)
type OClient = ContractRouterClient<typeof orpc>
export type B4 = Expect<Equal<Awaited<ReturnType<OClient["password"]["signIn"]>>, SignedIn | SecondFactorRequired | CaptchaRequired>>
export type B5 = Expect<Equal<Parameters<OClient["password"]["signUp"]>[0], { readonly email: string; readonly password: string; readonly displayName: string }>>

export const clientProgram = Effect.gen(function* () {
  const client = yield* HttpApiClient.make(Contract, { baseUrl: "http://x" })
  const r = yield* client.password.signIn({ payload: { email: "a", password: "b" } })
  type _ = Expect<Equal<typeof r, SignedIn | SecondFactorRequired | CaptchaRequired>>
  // @ts-expect-error displayName is required by the app's extension
  yield* client.password.signUp({ payload: { email: "a", password: "b" } })
})

// ---- runtime: handler + OpenAPI ----
const Handlers = HttpApiBuilder.group(Contract, "password", (h) =>
  Effect.succeed(
    h
      .handle("signIn", ({ payload }) =>
        payload.captchaToken === undefined
          ? Effect.succeed(CaptchaRequired.make({ siteKey: "k" }))
          : Effect.succeed(SecondFactorRequired.make({ methods: ["totp"] })))
      .handle("signUp", ({ payload }) => Effect.succeed(SignedIn.make({ userId: payload.displayName })))
  )
)
const { handler, dispose } = HttpRouter.toWebHandler(
  HttpApiBuilder.layer(Contract, { openapiPath: "/openapi.json" }).pipe(
    Layer.provide(Handlers),
    Layer.provide(HttpServer.layerServices)
  )
)
const post = async (body: unknown) =>
  (await handler(new Request("http://x/signIn", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }))).text()
console.log("B signIn no captcha:", await post({ email: "a", password: "p" }))
console.log("B signIn captcha   :", await post({ email: "a", password: "p", captchaToken: "t" }))
const openapi = await (await handler(new Request("http://x/openapi.json"))).json()
console.log("B openapi signIn 200:", JSON.stringify(openapi.paths["/signIn"].post.responses["200"].content["application/json"].schema))
await dispose()
