// PROTOTYPE — throwaway. Butter's thin helpers over Effect HttpApi.
// Answers: does HttpApi hold up as the Contract? (slovakian/butter#41)
import { Context, Schema } from "effect"
import { HttpApiEndpoint, HttpApiGroup, HttpApiSchema } from "effect/http-api"

// ---------- Butter annotations (HttpApi's native annotation mechanism) ----------

export type Kind = "call" | "navigation"
// Session effect per success variant, keyed by the success schema's _tag.
export type SessionEffect = "creates" | "pending" | "destroys" | "none"

export interface ButterAnnotation {
  readonly kind: Kind
  readonly session: Readonly<Record<string, SessionEffect>>
  // Raw (un-codec'd) schemas, kept so extensions can rebuild the endpoint.
  readonly raw: {
    readonly payload: Schema.Struct<Schema.Struct.Fields>
    readonly success: ReadonlyArray<Schema.Top>
    readonly error: ReadonlyArray<Schema.Top>
  }
}
export const Butter = Context.Service<ButterAnnotation>("butter/Contract")

export const getButter = (endpoint: HttpApiEndpoint.Top): ButterAnnotation | undefined =>
  Context.getOrUndefined(endpoint.annotations, Butter)

// ---------- call(): POST, path from the action id, all input in the body ----------

export const call = <
  const Id extends string,
  const F extends Schema.Struct.Fields,
  const S extends ReadonlyArray<Schema.Top>,
  const E extends ReadonlyArray<Schema.Top> = readonly []
>(
  id: Id,
  spec: {
    readonly payload: Schema.Struct<F>
    readonly success: S
    readonly error?: E
    readonly session?: Readonly<Record<string, SessionEffect>>
  }
) =>
  HttpApiEndpoint.post<Id, `/${Id}`, never, never, Schema.Struct<F>, never, S, E>(id, `/${id}`, {
    payload: spec.payload,
    success: spec.success,
    error: (spec.error ?? []) as any
  }).annotate(Butter, {
    kind: "call",
    session: spec.session ?? {},
    raw: { payload: spec.payload, success: spec.success, error: spec.error ?? [] }
  })

// ---------- navigation(): success is always a declared redirect ----------

export const Redirect = HttpApiSchema.WithHeaders(HttpApiSchema.Empty(302), { location: Schema.String })
export type Redirect = typeof Redirect

export const navigation = <const Id extends string, const Q extends Schema.Struct.Fields>(
  id: Id,
  spec: { readonly query: Q }
) =>
  HttpApiEndpoint.get(id, `/${id}`, { query: spec.query, success: Redirect }).annotate(Butter, {
    kind: "navigation",
    session: {},
    raw: { payload: Schema.Struct({}), success: [Redirect], error: [] }
  })

// ---------- Type-level helpers ----------

type AnyEndpoint = HttpApiEndpoint.Top
type AnyGroup = HttpApiGroup.HttpApiGroup<string, any, boolean>

export type EndpointsOf<G> = HttpApiGroup.Endpoints<G>
export type EndpointById<G, Id extends string> = HttpApiEndpoint.WithIdentifier<EndpointsOf<G>, Id>

// Navigations are visible at the type level through their success schema.
export type IsNavigation<E> = [HttpApiEndpoint.Success<E>["Type"]] extends [Redirect["Type"]] ? true : false

// ---------- extend(): one Slice (or the app) grows another Slice's endpoint ----------

type ExtendEndpoint<E, ExtraFields extends Schema.Struct.Fields, ExtraS extends Schema.Top, ExtraE extends Schema.Top> =
  E extends HttpApiEndpoint.HttpApiEndpoint<
    infer Id,
    infer M,
    infer P,
    infer Params,
    infer Query,
    infer Payload,
    infer Headers,
    infer Success,
    infer Error,
    infer Mw,
    infer MwS
  > ? HttpApiEndpoint.HttpApiEndpoint<
      Id,
      M,
      P,
      Params,
      Query,
      [keyof ExtraFields] extends [never] ? Payload
        : Payload extends Schema.toCodecJson<Schema.Struct<infer F>> ? Schema.toCodecJson<Schema.Struct<F & ExtraFields>>
        : never,
      Headers,
      Success | ([ExtraS] extends [never] ? never : Schema.toCodecJson<ExtraS>),
      Error | ([ExtraE] extends [never] ? never : Schema.toCodecJson<ExtraE>),
      Mw,
      MwS
    >
  : never

type ReplaceEndpoint<G, Id extends string, NewE> = G extends HttpApiGroup.HttpApiGroup<infer GId, infer Es, infer TL>
  ? HttpApiGroup.HttpApiGroup<GId, HttpApiEndpoint.ExcludeIdentifier<Es, Id> | Extract<NewE, HttpApiEndpoint.Constraint>, TL>
  : never

export const extend = <
  G extends AnyGroup,
  const Id extends HttpApiEndpoint.Identifier<EndpointsOf<G>> & string,
  const ExtraFields extends Schema.Struct.Fields = {},
  const ExtraS extends ReadonlyArray<Schema.Top> = readonly [],
  const ExtraE extends ReadonlyArray<Schema.Top> = readonly []
>(
  group: G,
  id: Id,
  ext: {
    readonly payloadFields?: ExtraFields
    readonly success?: ExtraS
    readonly error?: ExtraE
    readonly session?: Readonly<Record<string, SessionEffect>>
  }
): ReplaceEndpoint<G, Id, ExtendEndpoint<EndpointById<G, Id>, ExtraFields, ExtraS[number], ExtraE[number]>> => {
  const old = (group.endpoints as Record<string, HttpApiEndpoint.Top>)[id]
  const butter = getButter(old)
  if (!butter) throw new Error(`Endpoint ${id} has no Butter annotation`)
  const payload = Schema.Struct({ ...butter.raw.payload.fields, ...ext.payloadFields })
  const success = [...butter.raw.success, ...(ext.success ?? [])]
  const error = [...butter.raw.error, ...(ext.error ?? [])]
  let next: any = HttpApiEndpoint.make(old.method as "POST")(id, old.path as `/${string}`, {
    payload,
    success,
    error
  } as any)
    .annotateMerge(old.annotations)
    .annotate(Butter, {
      ...butter,
      session: { ...butter.session, ...ext.session },
      raw: { payload, success, error }
    })
  for (const mw of old.middlewares) next = next.middleware(mw)
  const others = Object.values(group.endpoints as Record<string, AnyEndpoint>).filter((e) => e.identifier !== id)
  return (HttpApiGroup.make(group.identifier) as any)
    .add(...others, next)
    .annotateMerge(group.annotations)
}
