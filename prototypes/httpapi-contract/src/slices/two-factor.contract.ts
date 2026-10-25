// PROTOTYPE — the 2FA Slice's Contract: its own group, plus an extension of password sign-in.
import { Schema } from "effect"
import { HttpApiEndpoint, HttpApiGroup } from "effect/http-api"
import { call, extend } from "../butter.ts"
import { SignedIn } from "./password.contract.ts"

export class SecondFactorRequired extends Schema.TaggedClass<SecondFactorRequired>()("SecondFactorRequired", {
  methods: Schema.Array(Schema.Literals(["totp", "email"]))
}) {}
export class InvalidCode extends Schema.TaggedError<InvalidCode>()("InvalidCode", {}, { httpApiStatus: 401 }) {}

export const TwoFactorContract = HttpApiGroup.make("twoFactor").add(
  call("verify", {
    payload: Schema.Struct({ code: Schema.String }),
    success: [SignedIn],
    error: [InvalidCode],
    session: { SignedIn: "creates" }
  })
)

// 2FA does not import the password Contract: it only needs *a* group with a signIn endpoint.
export const withSecondFactor = <G extends HttpApiGroup.HttpApiGroup<string, HttpApiEndpoint.WithIdentifier<any, "signIn"> | any, boolean>>(
  group: G & ("signIn" extends HttpApiEndpoint.Identifier<HttpApiGroup.Endpoints<G>> ? unknown : { error: "group has no signIn" })
) => extend(group as G, "signIn" as "signIn" & HttpApiEndpoint.Identifier<HttpApiGroup.Endpoints<G>>, { success: [SecondFactorRequired], session: { SecondFactorRequired: "pending" } })
