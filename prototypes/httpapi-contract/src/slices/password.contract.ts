// PROTOTYPE — the password Slice's Contract, written as plain Effect HttpApi + Butter helpers.
import { Schema } from "effect"
import { HttpApiGroup } from "effect/http-api"
import { call, navigation } from "../butter.ts"

export class SignedIn extends Schema.TaggedClass<SignedIn>()("SignedIn", { userId: Schema.String }) {}
export class InvalidCredentials extends Schema.TaggedError<InvalidCredentials>()(
  "InvalidCredentials",
  {},
  { httpApiStatus: 401 }
) {}
export class EmailTaken extends Schema.TaggedError<EmailTaken>()("EmailTaken", {}, { httpApiStatus: 409 }) {}

export const PasswordContract = HttpApiGroup.make("password").add(
  call("signIn", {
    payload: Schema.Struct({ email: Schema.String, password: Schema.String }),
    success: [SignedIn],
    error: [InvalidCredentials],
    session: { SignedIn: "creates" }
  }),
  call("signUp", {
    payload: Schema.Struct({ email: Schema.String, password: Schema.String }),
    success: [SignedIn],
    error: [EmailTaken],
    session: { SignedIn: "creates" }
  }),
  // An email link: a navigation, so RPC doors must skip it.
  navigation("verifyEmail", { query: { token: Schema.String } })
)
