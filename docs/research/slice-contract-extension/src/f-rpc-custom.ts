// F. Rpc.custom-style constructor customisation, and Effect RPC's own edit API (which HttpApi lacks).
import { Schema } from "effect"
import { Rpc, RpcGroup } from "effect/rpc"
import type { Equal, Expect } from "./support/type-test.ts"
import { Credentials, SecondFactorRequired, SignedIn } from "./support/slices.ts"

// Rpc has setters: setPayload / setSuccess / setError return a new, correctly typed Rpc.
const signIn = Rpc.make("signIn", { payload: Credentials, success: SignedIn })
const extended = signIn
  .setSuccess(Schema.Union([SignedIn, SecondFactorRequired]))
  .setPayload(Credentials.mapFields((f) => ({ ...f, captchaToken: Schema.optionalKey(Schema.String) })))
export type F1 = Expect<Equal<Rpc.Success<typeof extended>, SignedIn | SecondFactorRequired>>
export type F2 = Expect<Equal<Rpc.Payload<typeof extended>, { readonly email: string; readonly password: string; readonly captchaToken?: string }>>

// RpcGroup can drop and re-add by tag, and the types follow (omit removes the old member from the union).
const group = RpcGroup.make(signIn, Rpc.make("signOut"))
const replaced = group.omit("signIn").add(extended)
type SignInIn<G> = Extract<RpcGroup.Rpcs<G>, { readonly _tag: "signIn" }>
export type F3 = Expect<Equal<Rpc.Success<SignInIn<typeof replaced>>, SignedIn | SecondFactorRequired>>

// Rpc.custom: a constructor whose output schemas are transformed by a type-level function (HKT via `this`).
// It customises everything built WITH it, at declaration time. Nothing comparable exists in HttpApi.
interface WithSecondFactor extends Rpc.Custom {
  readonly out: Rpc.Custom.Out<Schema.Union<readonly [this["success"], typeof SecondFactorRequired]>, this["error"]>
}
const signInStep = Rpc.custom<WithSecondFactor>((s) => ({ ...s, success: Schema.Union([s.success, SecondFactorRequired]) }))
const passwordSignIn = signInStep("password.signIn", { payload: Credentials, success: SignedIn })
export type F4 = Expect<Equal<Rpc.Success<typeof passwordSignIn>, SignedIn | SecondFactorRequired>>
console.log("F custom success schema members:", (passwordSignIn.successSchema as any).members.length)
