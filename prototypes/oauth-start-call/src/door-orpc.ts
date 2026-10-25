// PROTOTYPE — door 3: oRPC v2, derived from the Contract (Calls only), nested in the APP's router.
//
// Setting cookies is easy here (`context.resHeaders` from ResponseHeadersPlugin), BUT the plugin lives
// on the APP's `RPCHandler`, which is user-owned code. If the app forgets it, `resHeaders` is
// undefined and the cookie silently isn't set. Butter's procedures must fail closed (Defect) instead.
// Again: true of every sign-in Call (Session cookie), not just the OAuth start Call.
import { oc, type ProcedureContract, type Schema as OSchema } from "@orpc/contract"
import { implement, ORPCError } from "@orpc/server"
import { Effect, Exit, Schema } from "effect"
import { HttpApiEndpoint, HttpApiGroup } from "effect/http-api"
import { Contract, getButter, Me } from "./contract.ts"
import { CALLBACK_URL, oauthPendingEffect, parseCookieHeader, readSessionToken } from "./edge.ts"
import { sessions, startOAuth } from "./flows.ts"

// ---------- generator: Contract → oRPC contract (Calls only) ----------
type Unwrap<S> = S extends Schema.toCodecJson<infer Inner> ? Inner : S
type Std<S extends Schema.Top> = OSchema<Unwrap<S>["Encoded"], Unwrap<S>["Type"]>
type ErrorMapOf<Er0 extends Schema.Top, Er extends Schema.Constraint = Extract<Unwrap<Er0>, Schema.Constraint>> = {
  [T in Er["Type"] extends { readonly _tag: infer Tag extends string } ? Tag : never]: {
    readonly status: number
    readonly data: OSchema<Extract<Er["Encoded"], { readonly _tag: T }>, Extract<Er["Type"], { readonly _tag: T }>>
  }
}
type IsCall<E> = E extends HttpApiEndpoint.HttpApiEndpoint<infer _Id, infer M, infer _P, infer _Pa, infer _Q, infer _Pl, infer _H, infer _S, infer _Er, infer _Mw, infer _MwS> ? M extends "POST" ? true : false : false
type EndpointToProcedure<E> = E extends HttpApiEndpoint.HttpApiEndpoint<infer _Id, infer _M, infer _P, infer _Pa, infer _Q, infer P, infer _H, infer S, infer Er, infer _Mw, infer _MwS> ? ProcedureContract<Std<P>, Std<S>, ErrorMapOf<Er>> : never
// NOTE: `any` in these 11 slots silently fails to match (invariant Middleware slot): only `infer` works.
type GroupToRouter<G> = G extends HttpApiGroup.HttpApiGroup<infer _GId, infer Es, infer _TL>
  ? { readonly [E in Es as IsCall<E> extends true ? HttpApiEndpoint.Identifier<E> : never]: EndpointToProcedure<E> }
  : never
type ContractOf<Gs extends HttpApiGroup.HttpApiGroup<string, any, boolean>> = { readonly [G in Gs as HttpApiGroup.Identifier<G>]: GroupToRouter<G> }

const unionOf = (s: ReadonlyArray<Schema.Top>): Schema.Top => (s.length === 1 ? s[0]! : Schema.Union(s))
const toOrpcContract = <const Gs extends ReadonlyArray<HttpApiGroup.HttpApiGroup<string, any, boolean>>>(...groups: Gs): ContractOf<Gs[number]> => {
  const out: Record<string, Record<string, unknown>> = {}
  for (const g of groups) {
    const procs: Record<string, unknown> = {}
    for (const ep of Object.values(g.endpoints as Record<string, HttpApiEndpoint.Top>)) {
      const b = getButter(ep)
      if (b?.kind !== "call") continue
      const errors: Record<string, unknown> = {}
      for (const e of b.error) errors[(e as any).identifier] = { status: (e.ast.annotations as any)?.httpApiStatus ?? 500, data: Schema.toStandardSchemaV1(e as any) }
      procs[ep.identifier] = oc.errors(errors as any).input(Schema.toStandardSchemaV1(b.payload as any)).output(Schema.toStandardSchemaV1(unionOf(b.success) as any))
    }
    out[g.identifier] = procs
  }
  return out as any
}

export const butterOrpcContract = toOrpcContract(Contract.groups.oauth, Contract.groups.session)

// The APP's contract: Butter's subtree under `auth`, next to the app's own procedures.
export const appContract = {
  auth: butterOrpcContract,
  todos: { list: oc.output(Schema.toStandardSchemaV1(Schema.Array(Schema.String))) }
}

// Context Butter's procedures need from the app's RPCHandler plugins.
export interface ButterOrpcContext {
  reqHeaders?: Headers | undefined // RequestHeadersPlugin
  resHeaders?: Headers | undefined // ResponseHeadersPlugin
}

const os = implement(appContract).$context<ButterOrpcContext>()

const run = async <A, E extends { _tag: string }>(eff: Effect.Effect<A, E>, errors: any) => {
  const exit = await Effect.runPromiseExit(eff)
  if (Exit.isSuccess(exit)) return exit.value
  const failure: any = (exit.cause as any).reasons?.[0]?.error
  if (failure?._tag && errors[failure._tag]) throw errors[failure._tag]({ data: failure })
  throw new ORPCError("INTERNAL_SERVER_ERROR")
}

const setCookies = (ctx: ButterOrpcContext, cookies: ReadonlyArray<string>) => {
  if (!ctx.resHeaders) throw new Error("Defect: Butter needs ResponseHeadersPlugin on the RPCHandler") // fail closed
  for (const c of cookies) ctx.resHeaders.append("set-cookie", c)
}

export const appRouter = os.router({
  auth: {
    oauth: {
      githubStart: os.auth.oauth.githubStart.handler(async ({ input, context, errors }) => {
        const fx = await run(Effect.map(startOAuth(input, CALLBACK_URL), oauthPendingEffect), errors)
        setCookies(context, fx.setCookies)
        return fx.reply
      })
    },
    session: {
      me: os.auth.session.me.handler(({ context }) => {
        const token = readSessionToken(parseCookieHeader(context.reqHeaders?.get("cookie")))
        return Me.make({ userId: (token && sessions.get(token)) ?? null })
      })
    }
  },
  todos: { list: os.todos.list.handler(() => ["the app's own procedure"]) }
})
