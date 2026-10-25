// Shared toy schemas for the proofs. Successes are TaggedStruct (see c-schema.ts for why).
import { Schema } from "effect"

export const SignedIn = Schema.TaggedStruct("SignedIn", { userId: Schema.String })
export type SignedIn = typeof SignedIn.Type
export const SecondFactorRequired = Schema.TaggedStruct("SecondFactorRequired", {
  methods: Schema.Array(Schema.Literals(["totp", "email"]))
})
export type SecondFactorRequired = typeof SecondFactorRequired.Type
export const CaptchaRequired = Schema.TaggedStruct("CaptchaRequired", { siteKey: Schema.String })
export type CaptchaRequired = typeof CaptchaRequired.Type

export class InvalidCredentials extends Schema.TaggedError<InvalidCredentials>()(
  "InvalidCredentials",
  {},
  { httpApiStatus: 401 }
) {}
export class EmailTaken extends Schema.TaggedError<EmailTaken>()("EmailTaken", {}, { httpApiStatus: 409 }) {}

export const Credentials = Schema.Struct({ email: Schema.String, password: Schema.String })
