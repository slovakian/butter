// PROTOTYPE — the Contract Root: browser-safe, the one Slices list + app extensions.
import { Schema } from "effect"
import { HttpApi } from "effect/http-api"
import { extend } from "./butter.ts"
import { PasswordContract } from "./slices/password.contract.ts"
import { TwoFactorContract, withSecondFactor } from "./slices/two-factor.contract.ts"

// App extension: a required display name on sign-up.
const password = extend(withSecondFactor(PasswordContract), "signUp", {
  payloadFields: { displayName: Schema.String }
})

export const Contract = HttpApi.make("butter").add(password, TwoFactorContract)
export type Contract = typeof Contract
