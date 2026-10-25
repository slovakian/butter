// PROTOTYPE — Check 4: an oRPC client plugin reads Butter's meta at call time (refresh session state).
import { getProcedureContractOrThrow, minifyRouterContract, type ContractRouterClient, type RouterContract } from "@orpc/contract"
import { createORPCClient, type ORPCClientInterceptor } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import { RPCHandler } from "@orpc/server/fetch"
import { getButterMeta, type ButterMeta } from "./derive/orpc.ts"
import { appContract, appRouter } from "./check3-orpc-nest.ts"

// What the browser ships: the minified contract (schemas stripped, meta kept).
const browserContract = minifyRouterContract(appContract)
console.log("minified signIn keeps meta:", JSON.stringify(getButterMeta(getProcedureContractOrThrow(browserContract, ["auth", "password", "signIn"]))))
console.log("minified signIn schemas   :", JSON.stringify(getProcedureContractOrThrow(browserContract, ["auth", "password", "signIn"])["~orpc"].inputSchemas))

// Butter's client plugin: after a call, look up the procedure's Butter meta and the success variant's Session effect.
const butterSession = <E = unknown>(
  contract: RouterContract,
  onSession: (effect: string, meta: ButterMeta) => void
): ORPCClientInterceptor<object, unknown, unknown, E> =>
  async ({ next, path }) => {
    const result = await next()
    let meta: ButterMeta | undefined
    try {
      meta = getButterMeta(getProcedureContractOrThrow(contract, path))
    } catch {
      return result // not a Butter procedure (app's own todos)
    }
    const tag = (result as { _tag?: string })?._tag
    const effect = tag ? meta?.session[tag] : undefined
    if (meta && effect && effect !== "none") onSession(effect, meta)
    return result
  }

const events: Array<string> = []
const rpc = new RPCHandler(appRouter)
const client: ContractRouterClient<typeof appContract> = createORPCClient(
  new RPCLink({
    url: "/rpc",
    fetch: async (url, init) => (await rpc.handle(new Request(`http://x${url}`, init), { prefix: "/rpc", context: {} })).response!
  }),
  { interceptors: [butterSession(browserContract, (effect, meta) => events.push(`${meta.id} -> session ${effect}`))] }
)

await client.auth.password.signIn({ email: "a@b", password: "p" })
await client.auth.password.signIn({ email: "2fa@b", password: "p" })
await client.auth.twoFactor.verify({ code: "123456" })
await client.todos.list({})
await client.auth.password.signIn({ email: "a@b", password: "wrong" }).catch(() => events.push("signIn failed -> no session event"))
console.log("session events:", events)
