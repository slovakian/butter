// PROTOTYPE — Check 3: Butter's generated oRPC contract nested in the app's own contract;
// Butter's generated router fills that subtree.
import { oc, type ContractRouterClient } from "@orpc/contract"
import { createORPCClient } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import { implement } from "@orpc/server"
import { RPCHandler } from "@orpc/server/fetch"
import { OpenAPIHandler } from "@orpc/openapi/fetch"
import { Effect, Schema } from "effect"
import { Contract } from "./contract-root.ts"
import { toOrpcContract, toOrpcRouter } from "./derive/orpc.ts"
import { InvalidCredentials, SignedIn } from "./slices/password.contract.ts"
import { SecondFactorRequired } from "./slices/two-factor.contract.ts"
import type { Equal, Expect } from "./type-test.ts"

// Butter-generated (browser-safe, from the Contract Root)
export const authContract = toOrpcContract(Contract.groups.password, Contract.groups.twoFactor)

// The app's own contract, nesting Butter's under `auth`
export const appContract = {
  todos: {
    list: oc.input(Schema.toStandardSchemaV1(Schema.Struct({}))).output(Schema.toStandardSchemaV1(Schema.Array(Schema.String)))
  },
  auth: authContract
}

// Butter-generated router (server half): Flows in
export const authRouter = toOrpcRouter(authContract, {
  password: {
    signIn: (i) =>
      i.password === "wrong"
        ? Effect.fail(new InvalidCredentials())
        : i.email.startsWith("2fa")
          ? Effect.succeed(new SecondFactorRequired({ methods: ["totp"] }))
          : Effect.succeed(new SignedIn({ userId: i.email })),
    signUp: (i) => Effect.succeed(new SignedIn({ userId: i.displayName }))
  },
  twoFactor: { verify: () => Effect.succeed(new SignedIn({ userId: "u" })) }
})

// The app implements its contract and drops Butter's router into the subtree
const app = implement(appContract)
export const appRouter = app.router({
  todos: { list: app.todos.list.handler(() => ["milk"]) },
  auth: authRouter
})

// Negative: a router for the wrong subtree must not type-check
app.router({
  todos: { list: app.todos.list.handler(() => ["milk"]) },
  // @ts-expect-error auth subtree must be Butter's router
  auth: { password: {} }
})

// ---- types on the client ----
type Client = ContractRouterClient<typeof appContract>
type SignInOut = Awaited<ReturnType<Client["auth"]["password"]["signIn"]>>
export type _1 = Expect<Equal<SignInOut, SignedIn | SecondFactorRequired>>
type SignUpIn = Parameters<Client["auth"]["password"]["signUp"]>[0]
export type _2 = Expect<Equal<SignUpIn, { readonly email: string; readonly password: string; readonly displayName: string }>>

// ---- runtime ----
const rpc = new RPCHandler(appRouter)
const rest = new OpenAPIHandler(appRouter)
const client: Client = createORPCClient(
  new RPCLink({
    url: "/rpc",
    fetch: async (url, init) => (await rpc.handle(new Request(`http://x${url}`, init), { prefix: "/rpc", context: {} })).response!
  })
)
const ok = await client.auth.password.signIn({ email: "a@b", password: "p" })
console.log("rpc signIn ok        ", JSON.stringify(ok), "instanceof SignedIn?", ok instanceof SignedIn)
console.log("rpc signIn 2fa       ", JSON.stringify(await client.auth.password.signIn({ email: "2fa@b", password: "p" })))
try {
  await client.auth.password.signIn({ email: "a@b", password: "wrong" })
} catch (e: any) {
  console.log("rpc signIn wrong     ", JSON.stringify({ code: e.code, status: e.status, defined: e.defined, data: e.data }))
}
console.log("rpc todos            ", JSON.stringify(await client.todos.list({})))
const r = await rest.handle(
  new Request("http://x/api/auth/password/signIn", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "a@b", password: "p" }) }),
  { prefix: "/api/auth", context: {} }
)
console.log("openapi POST signIn  ", r.matched, r.response?.status, await r.response?.text())
