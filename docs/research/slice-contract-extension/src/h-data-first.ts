// H. Butter's own Schema-based format (the fallback), done "data first, HttpApi last":
// Slices write plain data with Effect Schemas; extensions edit the data; HttpApi is compiled at the end.
import { Effect, Schema } from "effect"
import { HttpApi, HttpApiClient, HttpApiGroup } from "effect/http-api"
import type { ContractRouterClient } from "@orpc/contract"
import type { Rpc, RpcGroup } from "effect/rpc"
import { call, type SessionEffect } from "./support/butter.ts"
import { toRpcGroup } from "./support/derive-rpc.ts"
import { toOrpcContract } from "./support/derive-orpc.ts"
import type { Equal, Expect } from "./support/type-test.ts"
import { CaptchaRequired, Credentials, EmailTaken, InvalidCredentials, SecondFactorRequired, SignedIn } from "./support/slices.ts"

// ---- the format: plain data; `marks` is a type-visible marker ("this is a sign-in") ----
interface Action {
  readonly payload: Schema.Struct<Schema.Struct.Fields>
  readonly success: ReadonlyArray<Schema.Top>
  readonly error: ReadonlyArray<Schema.Top>
  readonly marks: ReadonlyArray<string>
  readonly session: Readonly<Record<string, SessionEffect>>
}
interface Slice { readonly id: string; readonly actions: Readonly<Record<string, Action>> }

// ---- extension: by marker, across every Slice; pure data + mapped types, no Effect types touched ----
type AddSuccess<S extends Slice, M extends string, X extends ReadonlyArray<Schema.Top>> = {
  readonly id: S["id"]
  readonly actions: { readonly [K in keyof S["actions"]]: M extends S["actions"][K]["marks"][number]
    ? Omit<S["actions"][K], "success"> & { readonly success: readonly [...S["actions"][K]["success"], ...X] }
    : S["actions"][K] }
}
const addSuccessTo = <const M extends string, const X extends ReadonlyArray<Schema.Top>>(mark: M, extra: X) =>
  <const Ss extends ReadonlyArray<Slice>>(...slices: Ss): { readonly [I in keyof Ss]: AddSuccess<Ss[I], M, X> } =>
    slices.map((s) => ({ ...s, actions: Object.fromEntries(Object.entries(s.actions).map(([k, a]) =>
      [k, a.marks.includes(mark) ? { ...a, success: [...a.success, ...extra] } : a])) })) as any

// App extension by name: add input fields to one action.
type AddFields<S extends Slice, A extends keyof S["actions"], F extends Schema.Struct.Fields> = {
  readonly id: S["id"]
  readonly actions: { readonly [K in keyof S["actions"]]: K extends A
    ? Omit<S["actions"][K], "payload"> & { readonly payload: Schema.Struct<S["actions"][K]["payload"]["fields"] & F> }
    : S["actions"][K] }
}
const addFields = <const S extends Slice, const A extends keyof S["actions"] & string, const F extends Schema.Struct.Fields>(
  s: S, action: A, fields: F
): AddFields<S, A, F> => ({ ...s, actions: { ...s.actions, [action]: { ...s.actions[action]!, payload: Schema.Struct({ ...s.actions[action]!.payload.fields, ...fields }) } } }) as any

// ---- compile late, to HttpApi, through the PUBLIC constructor's own signature (instantiation expression) ----
type EndpointOf<Id extends string, A extends Action> = A["payload"] extends Schema.Struct<infer F>
  ? ReturnType<typeof call<Id, F, A["success"], A["error"]>> : never
type GroupOf<S extends Slice> = HttpApiGroup.HttpApiGroup<S["id"], { [K in keyof S["actions"] & string]: EndpointOf<K, S["actions"][K]> }[keyof S["actions"] & string]>
const toGroup = <const S extends Slice>(s: S): GroupOf<S> =>
  (HttpApiGroup.make(s.id) as any).add(...Object.entries(s.actions).map(([id, a]) => call(id, a)))

// ---- Slices ----
const password = { id: "password", actions: {
  signIn: { payload: Credentials, success: [SignedIn], error: [InvalidCredentials], marks: ["signIn"], session: { SignedIn: "creates" } },
  signUp: { payload: Credentials, success: [SignedIn], error: [EmailTaken], marks: [], session: { SignedIn: "creates" } }
} } as const satisfies Slice
const emailCode = { id: "emailCode", actions: {
  signIn: { payload: Schema.Struct({ code: Schema.String }), success: [SignedIn], error: [], marks: ["signIn"], session: { SignedIn: "creates" } }
} } as const satisfies Slice

// ---- Contract Root: 2FA targets "every sign-in" by marker; captcha too; order-independent unions ----
const [p, e] = addSuccessTo("signIn", [CaptchaRequired])(...addSuccessTo("signIn", [SecondFactorRequired])(password, emailCode))
const Password = toGroup(addFields(p, "signUp", { displayName: Schema.String }))
const EmailCode = toGroup(e)
export const Contract = HttpApi.make("butter").add(Password, EmailCode)

// ---- types end to end ----
type Out = SignedIn | SecondFactorRequired | CaptchaRequired
export const clientProgram = Effect.gen(function* () {
  const client = yield* HttpApiClient.make(Contract, { baseUrl: "http://x" })
  const a = yield* client.password.signIn({ payload: { email: "a", password: "b" } })
  const b = yield* client.emailCode.signIn({ payload: { code: "c" } })
  const c = yield* client.password.signUp({ payload: { email: "a", password: "b", displayName: "Ada" } })
  // @ts-expect-error the app's displayName is required
  yield* client.password.signUp({ payload: { email: "a", password: "b" } })
  type _ = Expect<Equal<[typeof a, typeof b, typeof c], [Out, Out, SignedIn]>> // signUp has no mark: untouched
})
const rpcs = toRpcGroup(Password, EmailCode)
export type H1 = Expect<Equal<Rpc.Success<Extract<RpcGroup.Rpcs<typeof rpcs>, { readonly _tag: "emailCode.signIn" }>>, Out>>
type OClient = ContractRouterClient<ReturnType<typeof toOrpcContract<[typeof Password, typeof EmailCode]>>>
export type H2 = Expect<Equal<Awaited<ReturnType<OClient["emailCode"]["signIn"]>>, Out>>
console.log("H compiled endpoints:", Object.keys(Contract.groups.password.endpoints), Object.keys(Contract.groups.emailCode.endpoints))
