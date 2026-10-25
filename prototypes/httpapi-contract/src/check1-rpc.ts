// PROTOTYPE — Check 1: HttpApi group translated into an Effect RPC group, with correct types.
import { Effect, Layer } from "effect"
import { FetchHttpClient, HttpRouter, HttpServer } from "effect/http"
import { RpcClient, RpcSerialization, RpcServer } from "effect/rpc"
import { Contract } from "./contract-root.ts"
import { toRpcGroup } from "./derive/rpc.ts"
import { InvalidCredentials, SignedIn } from "./slices/password.contract.ts"
import { SecondFactorRequired } from "./slices/two-factor.contract.ts"
import type { Equal, Expect } from "./type-test.ts"

const groups = Contract.groups
export const AuthRpcs = toRpcGroup(groups.password, groups.twoFactor)

// ---- server: toLayer demands exactly the calls (navigation verifyEmail is absent) ----
const Handlers = AuthRpcs.toLayer({
  "password.signIn": (p) =>
    p.password === "wrong"
      ? Effect.fail(new InvalidCredentials())
      : p.email.startsWith("2fa")
        ? Effect.succeed(new SecondFactorRequired({ methods: ["totp"] }))
        : Effect.succeed(new SignedIn({ userId: p.email })),
  "password.signUp": (p) => Effect.succeed(new SignedIn({ userId: p.displayName })),
  "twoFactor.verify": () => Effect.succeed(new SignedIn({ userId: "u" }))
})

// The navigation verifyEmail never becomes an Rpc.
type Tags = typeof AuthRpcs extends import("effect/rpc").RpcGroup.RpcGroup<infer R extends import("effect/rpc").Rpc.Any> ? R["_tag"] : never
export type _Tags = Expect<Equal<Tags, "password.signIn" | "password.signUp" | "twoFactor.verify">>

const { handler, dispose } = HttpRouter.toWebHandler(
  RpcServer.layerHttp({ group: AuthRpcs, path: "/rpc", protocol: "http" }).pipe(
    Layer.provide(Handlers),
    Layer.provide(RpcSerialization.layerJson),
    Layer.provide(HttpServer.layerServices)
  ),
  { disableLogger: true } as any
)

// ---- typed client, talking to the in-process handler through a custom fetch ----
const program = Effect.gen(function* () {
  const client = yield* RpcClient.make(AuthRpcs)
  const ok = yield* client["password.signIn"]({ email: "a@b", password: "p" })
  type _1 = Expect<Equal<typeof ok, SignedIn | SecondFactorRequired>>
  const twoFa = yield* client["password.signIn"]({ email: "2fa@b", password: "p" })
  const wrong = yield* client["password.signIn"]({ email: "a@b", password: "wrong" }).pipe(Effect.flip)
  type _2 = Expect<Equal<Exclude<typeof wrong, import("effect/rpc").RpcClientError.RpcClientError>, InvalidCredentials>>
  const up = yield* client["password.signUp"]({ email: "a@b", password: "p", displayName: "Ada" })
  // @ts-expect-error navigations are not on the RPC client
  client["password.verifyEmail"]
  return { ok, twoFa, wrong: wrong._tag, up, instanceOfClass: ok instanceof SignedIn }
})

const result = await Effect.runPromise(
  program.pipe(
    Effect.scoped,
    Effect.provide(RpcClient.layerProtocolHttp({ url: "http://x/rpc" })),
    Effect.provide(RpcSerialization.layerJson),
    Effect.provide(FetchHttpClient.layer),
    Effect.provideService(FetchHttpClient.Fetch, ((input: RequestInfo, init?: RequestInit) => handler(new Request(input, init))) as typeof fetch)
  )
)
console.log("Effect RPC over generated group:", JSON.stringify(result))
console.log("Rpc tags:", [...AuthRpcs.requests.keys()])
await dispose()
