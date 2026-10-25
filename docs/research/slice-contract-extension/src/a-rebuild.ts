// A. Rebuild after the fact: the prototype's extend() (support/butter.ts, copied unchanged).
// Probes ordering and conflicts when two Slices (or a Slice and the app) extend the same endpoint.
import { Schema } from "effect"
import { HttpApiEndpoint, HttpApiGroup } from "effect/http-api"
import { call, extend } from "./support/butter.ts"
import type { Equal, Expect } from "./support/type-test.ts"
import { CaptchaRequired, Credentials, EmailTaken, InvalidCredentials, SecondFactorRequired, SignedIn } from "./support/slices.ts"

const Password = HttpApiGroup.make("password").add(
  call("signIn", { payload: Credentials, success: [SignedIn], error: [InvalidCredentials], session: { SignedIn: "creates" } }),
  call("signUp", { payload: Credentials, success: [SignedIn], error: [EmailTaken], session: { SignedIn: "creates" } })
)

// Two Slices extend signIn, in both orders.
const twoFaFirst = extend(extend(Password, "signIn", { success: [SecondFactorRequired] }), "signIn", { success: [CaptchaRequired] })
const captchaFirst = extend(extend(Password, "signIn", { success: [CaptchaRequired] }), "signIn", { success: [SecondFactorRequired] })
type SuccessOf<G> = HttpApiEndpoint.Success<HttpApiEndpoint.WithIdentifier<HttpApiGroup.Endpoints<G>, "signIn">>["Type"]
export type A1 = Expect<Equal<SuccessOf<typeof twoFaFirst>, SuccessOf<typeof captchaFirst>>>
export type A2 = Expect<Equal<SuccessOf<typeof twoFaFirst>, SignedIn | SecondFactorRequired | CaptchaRequired>>

// Two extensions add the same field with different types: no error, the type silently becomes `never`...
const clash = extend(extend(Password, "signUp", { payloadFields: { nickname: Schema.String } }), "signUp", {
  payloadFields: { nickname: Schema.Number }
})
type SignUpPayload = HttpApiEndpoint.Payload<HttpApiEndpoint.WithIdentifier<HttpApiGroup.Endpoints<typeof clash>, "signUp">>["Type"]
export type A3 = Expect<Equal<SignUpPayload["nickname"], never>>

// ...while at runtime the last extension wins (the field is a number).
const signUp = (clash.endpoints as unknown as Record<string, HttpApiEndpoint.Top>)["signUp"]!
const payload = signUp.payload.get("application/json")!.schemas[0]!
console.log("A clash, runtime decode of nickname=1:", JSON.stringify(Schema.decodeUnknownSync(payload as any)({ email: "e", password: "p", nickname: 1 })))

// An endpoint written without Butter's call() helper cannot be extended at all (no raw schemas kept).
const plain = HttpApiGroup.make("plain").add(HttpApiEndpoint.post("signIn", "/signIn", { payload: Credentials, success: SignedIn }))
try {
  extend(plain, "signIn", { success: [SecondFactorRequired] })
} catch (e) {
  console.log("A plain HttpApiEndpoint:", (e as Error).message)
}
