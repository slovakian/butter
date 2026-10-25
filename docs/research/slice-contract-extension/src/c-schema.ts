// C. Effect Schema's own composition (stable API), and the Class-vs-TaggedStruct question on oRPC.
import { Schema, Struct, Tuple } from "effect"
import { oc, type ContractRouterClient } from "@orpc/contract"
import { createORPCClient } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import { implement } from "@orpc/server"
import { RPCHandler } from "@orpc/server/fetch"
import type { Equal, Expect } from "./support/type-test.ts"
import { CaptchaRequired, Credentials, SecondFactorRequired, SignedIn } from "./support/slices.ts"

// Input fields: Struct.mapFields + Struct.assign (== Schema.fieldsAssign). Same-name fields REPLACE.
const SignUp = Credentials.mapFields(Struct.assign({ displayName: Schema.String }))
export type C1 = Expect<Equal<typeof SignUp.Type, { readonly email: string; readonly password: string; readonly displayName: string }>>
const Replaced = SignUp.mapFields(Struct.assign({ displayName: Schema.Number }))
export type C2 = Expect<Equal<typeof Replaced.Type["displayName"], number>> // last writer wins, silently

// Success variants: Union.mapMembers appends members.
const Out = Schema.Union([SignedIn]).mapMembers(Tuple.appendElements([SecondFactorRequired, CaptchaRequired]))
export type C3 = Expect<Equal<typeof Out.Type, SignedIn | SecondFactorRequired | CaptchaRequired>>

// Class.extend: a NEW class. The base Slice's code still names the old class, so nothing upstream changes.
class SignUpInput extends Schema.Class<SignUpInput>("SignUpInput")({ email: Schema.String }) {}
class AppSignUpInput extends SignUpInput.extend<AppSignUpInput>("AppSignUpInput")({ displayName: Schema.String }) {}
export type C4 = Expect<Equal<AppSignUpInput extends SignUpInput ? true : false, true>>

// ---- Class vs TaggedStruct through oRPC (Effect Schema as Standard Schema; oRPC never decodes on the client) ----
class SignedInClass extends Schema.TaggedClass<SignedInClass>()("SignedIn", { userId: Schema.String }) {}
const contract = {
  asClass: oc.output(Schema.toStandardSchemaV1(SignedInClass)),
  asStruct: oc.output(Schema.toStandardSchemaV1(SignedIn))
}
const impl = implement(contract)
const router = impl.router({
  asClass: impl.asClass.handler(() => Schema.encodeSync(SignedInClass)(new SignedInClass({ userId: "u" })) as any),
  asStruct: impl.asStruct.handler(() => SignedIn.make({ userId: "u" }))
})
const rpc = new RPCHandler(router)
const client: ContractRouterClient<typeof contract> = createORPCClient(
  new RPCLink({ url: "/rpc", fetch: async (url, init) => (await rpc.handle(new Request(`http://x${url}`, init), { prefix: "/rpc", context: {} })).response! })
)
const a = await client.asClass()
export type C5 = Expect<Equal<typeof a, SignedInClass>> // typed as a class instance...
console.log("C oRPC class  :", JSON.stringify(a), "instanceof:", a instanceof SignedInClass) // ...but a plain object
const s = await client.asStruct()
export type C6 = Expect<Equal<typeof s, SignedIn>> // typed as a plain object, and it is one
console.log("C oRPC struct :", JSON.stringify(s), "decodes:", Schema.is(SignedIn)(s))
