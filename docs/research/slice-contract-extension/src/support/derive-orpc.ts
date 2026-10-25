// PROTOTYPE — Checks 3 & 4 generator: HttpApi Contract -> oRPC contract (+ Butter meta plugin) and router.
import { defineMeta, oc, type InferSchemaOutput, type ProcedureContract, type Schema as OSchema } from "@orpc/contract"
import { openapi } from "@orpc/openapi"
import { implement, ORPCError } from "@orpc/server"
import { Effect, Schema } from "effect"
import { HttpApiEndpoint, HttpApiGroup } from "effect/http-api"
import { getButter, type IsNavigation, type Kind, type SessionEffect } from "./butter.ts"

// ---------- Butter's oRPC meta plugin (Decision 5) ----------
export interface ButterMeta {
  readonly id: string
  readonly kind: Kind
  readonly session: Readonly<Record<string, SessionEffect>>
}
export const [butterMeta, getButterMeta] = defineMeta("butter", (incoming: ButterMeta) => incoming)

// ---------- types ----------
// HttpApi stores JSON-codec'd schemas (Encoded = Json). oRPC must see the original schema's Encoded side.
type Unwrap<S> = S extends Schema.toCodecJson<infer Inner> ? Inner : S
type Std<S extends Schema.Top> = OSchema<Unwrap<S>["Encoded"], Unwrap<S>["Type"]>

type ErrorMapOf<Er0 extends Schema.Top, Er extends Schema.Constraint = Extract<Unwrap<Er0>, Schema.Constraint>> = {
  [T in Er["Type"] extends { readonly _tag: infer Tag extends string } ? Tag : never]: {
    readonly status: number
    readonly data: OSchema<Extract<Er["Encoded"], { readonly _tag: T }>, Extract<Er["Type"], { readonly _tag: T }>>
  }
}

type EndpointToProcedure<E> = E extends HttpApiEndpoint.HttpApiEndpoint<
  infer _Id, infer _M, infer _Path, infer _Params, infer _Query, infer P, infer _H, infer S, infer Er, infer _Mw, infer _MwS
>
  ? IsNavigation<E> extends true ? never // calls only in this prototype
  : ProcedureContract<Std<P>, Std<S>, ErrorMapOf<Er>>
  : never

type GroupToRouter<G> = G extends HttpApiGroup.HttpApiGroup<infer _GId, infer Es, infer _TL> ? {
    readonly [E in Es as IsNavigation<E> extends true ? never : HttpApiEndpoint.Identifier<E>]: EndpointToProcedure<E>
  }
  : never

export type ContractOf<Gs extends HttpApiGroup.HttpApiGroup<string, any, boolean>> = {
  readonly [G in Gs as HttpApiGroup.Identifier<G>]: GroupToRouter<G>
}

// ---------- runtime ----------
const unionOf = (schemas: ReadonlyArray<Schema.Top>): Schema.Top =>
  schemas.length === 1 ? schemas[0]! : Schema.Union(schemas)

const statusOf = (s: Schema.Top): number => (s.ast.annotations as any)?.httpApiStatus ?? 500
const tagOf = (s: Schema.Top): string => {
  const tag = (s.ast as any).fields?._tag ?? (s.ast as any).to?.propertySignatures?.find((p: any) => p.name === "_tag")
  // cheap & cheerful for the prototype: TaggedError schemas expose their tag via `identifier`/annotations
  return (s as any).identifier ?? (s.ast.annotations as any)?.identifier ?? String(tag)
}

export const toOrpcContract = <const Gs extends ReadonlyArray<HttpApiGroup.HttpApiGroup<string, any, boolean>>>(
  ...groups: Gs
): ContractOf<Gs[number]> => {
  const out: Record<string, Record<string, unknown>> = {}
  for (const group of groups) {
    const g: Record<string, unknown> = {}
    for (const ep of Object.values(group.endpoints as Record<string, HttpApiEndpoint.Top>)) {
      const butter = getButter(ep)
      if (butter?.kind !== "call") continue
      const errors: Record<string, { status: number; data: unknown }> = {}
      for (const e of butter.raw.error) errors[tagOf(e)] = { status: statusOf(e), data: Schema.toStandardSchemaV1(e as any) }
      g[ep.identifier] = oc
        .meta(
          butterMeta({ id: `${group.identifier}.${ep.identifier}`, kind: butter.kind, session: butter.session }),
          openapi({ method: ep.method as "POST", path: `/${group.identifier}${ep.path}` as `/${string}`, tags: [group.identifier] })
        )
        .errors(errors as any)
        .input(Schema.toStandardSchemaV1(butter.raw.payload as any))
        .output(Schema.toStandardSchemaV1(unionOf(butter.raw.success) as any))
    }
    out[group.identifier] = g
  }
  return out as any
}

// ---------- generated router: Flows in, oRPC router out ----------
type FlowsFor<C> = {
  readonly [G in keyof C]: {
    readonly [P in keyof C[G]]: C[G][P] extends ProcedureContract<infer I, infer O, infer EM>
      ? (input: InferSchemaOutput<I>) => Effect.Effect<
          InferSchemaOutput<O>,
          { [K in keyof EM]: EM[K] extends { data: infer D extends OSchema<any, any> } ? InferSchemaOutput<D> : never }[keyof EM]
        >
      : never
  }
}

export const toOrpcRouter = <C extends Record<string, Record<string, ProcedureContract<any, any, any>>>>(
  contract: C,
  flows: FlowsFor<C>
) => {
  const impl: any = implement(contract)
  const router: Record<string, Record<string, unknown>> = {}
  for (const [gk, procs] of Object.entries(contract)) {
    router[gk] = {}
    for (const pk of Object.keys(procs)) {
      const flow = (flows as any)[gk][pk]
      router[gk]![pk] = impl[gk][pk].handler(async ({ input, errors }: any) => {
        const exit = await Effect.runPromiseExit(flow(input))
        if (exit._tag === "Success") return Schema.encodeSync(Schema.Any)(exit.value) // decode-only bridge: return wire form
        const failure: any = (exit.cause as any).reasons?.[0]?.error ?? (exit.cause as any).failures?.[0]
        if (failure?._tag && errors[failure._tag]) throw errors[failure._tag]({ data: failure })
        throw new ORPCError("INTERNAL_SERVER_ERROR")
      })
    }
  }
  return impl.router(router) as ReturnType<ReturnType<typeof implement<C>>["router"]>
}
