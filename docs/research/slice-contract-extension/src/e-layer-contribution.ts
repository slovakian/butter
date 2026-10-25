// E. Context/Layer contribution: Slices PROVIDE additions as services; a composer collects them in an Effect.
import { Context, Effect, Layer, Option, Schema } from "effect"
import { HttpApi, HttpApiClient, HttpApiEndpoint, HttpApiGroup } from "effect/http-api"
import type { Equal, Expect } from "./support/type-test.ts"
import { CaptchaRequired, Credentials, SecondFactorRequired, SignedIn } from "./support/slices.ts"

// One service per contributing Slice. (One shared tag cannot collect: the last Layer providing it wins.)
class TwoFactorSignIn extends Context.Service<TwoFactorSignIn, { readonly success: ReadonlyArray<Schema.Top> }>()("TwoFactorSignIn") {}
class CaptchaSignIn extends Context.Service<CaptchaSignIn, { readonly success: ReadonlyArray<Schema.Top> }>()("CaptchaSignIn") {}

// The composer must name every tag it might read, so it already knows every contributing Slice.
const composeContract = Effect.gen(function* () {
  const extra: Array<Schema.Top> = []
  const tags: ReadonlyArray<Context.Key<any, { readonly success: ReadonlyArray<Schema.Top> }>> = [TwoFactorSignIn, CaptchaSignIn]
  for (const tag of tags) {
    const ext = yield* Effect.serviceOption(tag)
    if (Option.isSome(ext)) extra.push(...ext.value.success)
  }
  const signIn = HttpApiEndpoint.post("signIn", "/signIn", { payload: Credentials, success: [SignedIn, ...extra] })
  return HttpApi.make("butter").add(HttpApiGroup.make("password").add(signIn))
})

const installed = Layer.mergeAll(
  Layer.succeed(TwoFactorSignIn, { success: [SecondFactorRequired] }),
  Layer.succeed(CaptchaSignIn, { success: [CaptchaRequired] })
)
const api = await Effect.runPromise(composeContract.pipe(Effect.provide(installed)))
const ep = (api.groups.password.endpoints as any).signIn as HttpApiEndpoint.Top
console.log("E runtime success schemas:", ep.success.size) // 3: runtime composition works

// But the type is whatever the composer wrote: the contributions never reach it.
type SignIn = HttpApiEndpoint.WithIdentifier<HttpApiGroup.Endpoints<typeof api.groups.password>, "signIn">
export type E1 = Expect<Equal<Equal<HttpApiEndpoint.Success<SignIn>["Type"], SignedIn | SecondFactorRequired | CaptchaRequired>, false>>
export type E1Actual = Expect<Equal<HttpApiEndpoint.Success<SignIn>["Type"], unknown>> // erased to `unknown`

// And the browser client must run an Effect (with every Slice's Layer) before it has a Contract at all.
export const clientProgram = Effect.gen(function* () {
  const contract = yield* composeContract
  const client = yield* HttpApiClient.make(contract, { baseUrl: "http://x" })
  return client.password.signIn
}).pipe(Effect.provide(installed))
