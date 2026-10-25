// I (cont.). The 2FA Slice augments the registry. The TYPE applies program-wide the moment this file
// is in the TS program; the RUNTIME schema applies only if this module is imported BEFORE signInCall runs.
import { HttpApiEndpoint } from "effect/http-api"
import { registerSignInResult, signInCall } from "./i-registry.ts"
import type { Equal, Expect } from "./support/type-test.ts"
import { SecondFactorRequired, type SignedIn } from "./support/slices.ts"

declare module "./i-registry.ts" {
  interface SignInResults {
    readonly twoFactor: typeof SecondFactorRequired
  }
}

const early = signInCall("emailCode.signIn") // built before registration: runtime lacks the variant
registerSignInResult(SecondFactorRequired)
const late = signInCall("password.signIn")

export type I1 = Expect<Equal<HttpApiEndpoint.Success<typeof early>["Type"], SignedIn | SecondFactorRequired>>
console.log("I runtime success variants: early =", early.success.size, ", late =", late.success.size) // 1 vs 2: types lie for `early`
