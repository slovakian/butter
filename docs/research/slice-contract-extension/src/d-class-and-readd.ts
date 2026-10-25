// D. HttpApiGroup/HttpApi class-style declarations, and "re-add an endpoint under the same name".
import { Effect, Schema } from "effect"
import { HttpApi, HttpApiClient, HttpApiEndpoint, HttpApiGroup } from "effect/http-api"
import type { Equal, Expect } from "./support/type-test.ts"
import { Credentials, SecondFactorRequired, SignedIn } from "./support/slices.ts"

const signIn = HttpApiEndpoint.post("signIn", "/signIn", { payload: Credentials, success: SignedIn })
const signUp = HttpApiEndpoint.post("signUp", "/signUp", { payload: Credentials, success: SignedIn })

// Class style: allowed (groups/APIs are `new(_: never): {}`), but a class only names a value.
// The only "methods" are the builder's own (add, prefix, middleware, annotate*): nothing edits an endpoint.
export class PasswordGroup extends HttpApiGroup.make("password").add(signIn, signUp) {}

// The 2FA Slice / app re-adds signIn and signUp with bigger schemas. At RUNTIME, add() replaces by identifier.
const signIn2 = HttpApiEndpoint.post("signIn", "/signIn", { payload: Credentials, success: [SignedIn, SecondFactorRequired] })
const signUp2 = HttpApiEndpoint.post("signUp", "/signUp", {
  payload: Credentials.mapFields((f) => ({ ...f, displayName: Schema.String })),
  success: SignedIn
})
export class Extended extends PasswordGroup.add(signIn2, signUp2) {}
console.log("D runtime endpoints:", Object.keys(Extended.endpoints), "replaced:", Extended.endpoints.signIn === (signIn2 as any))

// At the TYPE level both versions stay: the group's endpoint union has two `signIn`s and two `signUp`s.
type Es = HttpApiGroup.Endpoints<typeof Extended>
export type D1 = Expect<Equal<HttpApiEndpoint.Identifier<Es>, "signIn" | "signUp">>
type SignUps = HttpApiEndpoint.WithIdentifier<Es, "signUp">
export type D2 = Expect<Equal<HttpApiEndpoint.Payload<SignUps>["Type"],
  { readonly email: string; readonly password: string } | { readonly email: string; readonly password: string; readonly displayName: string }>>

// So the typed client accepts the OLD payload, which the server now rejects (400) at runtime.
export const clientProgram = Effect.gen(function* () {
  const client = yield* HttpApiClient.make(HttpApi.make("api").add(Extended), { baseUrl: "http://x" })
  yield* client.password.signUp({ payload: { email: "a", password: "b" } }) // compiles: the type lies
})
