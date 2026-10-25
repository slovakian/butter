import { Schema } from "effect"
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "effect/http-api"
import { Hono } from "hono"
import type { Schema as HonoSchema } from "hono/types"
import { hc } from "hono/client"

// ---- A Butter-like Contract: two Slices, written once, no Hono anywhere ----
class InvalidCredentials extends Schema.TaggedError<InvalidCredentials>()("InvalidCredentials", {}) {}
const SignedIn = Schema.TaggedStruct("SignedIn", { userId: Schema.String })

const g = HttpApiGroup.make("g").add(
  HttpApiEndpoint.post("a0", "/g/a0", { payload: Schema.Struct({ email: Schema.String, n0: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a1", "/g/a1", { payload: Schema.Struct({ email: Schema.String, n1: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a2", "/g/a2", { payload: Schema.Struct({ email: Schema.String, n2: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a3", "/g/a3", { payload: Schema.Struct({ email: Schema.String, n3: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a4", "/g/a4", { payload: Schema.Struct({ email: Schema.String, n4: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a5", "/g/a5", { payload: Schema.Struct({ email: Schema.String, n5: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a6", "/g/a6", { payload: Schema.Struct({ email: Schema.String, n6: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a7", "/g/a7", { payload: Schema.Struct({ email: Schema.String, n7: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a8", "/g/a8", { payload: Schema.Struct({ email: Schema.String, n8: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a9", "/g/a9", { payload: Schema.Struct({ email: Schema.String, n9: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a10", "/g/a10", { payload: Schema.Struct({ email: Schema.String, n10: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a11", "/g/a11", { payload: Schema.Struct({ email: Schema.String, n11: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a12", "/g/a12", { payload: Schema.Struct({ email: Schema.String, n12: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a13", "/g/a13", { payload: Schema.Struct({ email: Schema.String, n13: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a14", "/g/a14", { payload: Schema.Struct({ email: Schema.String, n14: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a15", "/g/a15", { payload: Schema.Struct({ email: Schema.String, n15: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a16", "/g/a16", { payload: Schema.Struct({ email: Schema.String, n16: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a17", "/g/a17", { payload: Schema.Struct({ email: Schema.String, n17: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a18", "/g/a18", { payload: Schema.Struct({ email: Schema.String, n18: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a19", "/g/a19", { payload: Schema.Struct({ email: Schema.String, n19: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a20", "/g/a20", { payload: Schema.Struct({ email: Schema.String, n20: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a21", "/g/a21", { payload: Schema.Struct({ email: Schema.String, n21: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a22", "/g/a22", { payload: Schema.Struct({ email: Schema.String, n22: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a23", "/g/a23", { payload: Schema.Struct({ email: Schema.String, n23: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a24", "/g/a24", { payload: Schema.Struct({ email: Schema.String, n24: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a25", "/g/a25", { payload: Schema.Struct({ email: Schema.String, n25: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a26", "/g/a26", { payload: Schema.Struct({ email: Schema.String, n26: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a27", "/g/a27", { payload: Schema.Struct({ email: Schema.String, n27: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a28", "/g/a28", { payload: Schema.Struct({ email: Schema.String, n28: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a29", "/g/a29", { payload: Schema.Struct({ email: Schema.String, n29: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a30", "/g/a30", { payload: Schema.Struct({ email: Schema.String, n30: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a31", "/g/a31", { payload: Schema.Struct({ email: Schema.String, n31: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a32", "/g/a32", { payload: Schema.Struct({ email: Schema.String, n32: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a33", "/g/a33", { payload: Schema.Struct({ email: Schema.String, n33: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a34", "/g/a34", { payload: Schema.Struct({ email: Schema.String, n34: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a35", "/g/a35", { payload: Schema.Struct({ email: Schema.String, n35: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a36", "/g/a36", { payload: Schema.Struct({ email: Schema.String, n36: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a37", "/g/a37", { payload: Schema.Struct({ email: Schema.String, n37: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a38", "/g/a38", { payload: Schema.Struct({ email: Schema.String, n38: Schema.Number }), success: SignedIn, error: InvalidCredentials }),
  HttpApiEndpoint.post("a39", "/g/a39", { payload: Schema.Struct({ email: Schema.String, n39: Schema.Number }), success: SignedIn, error: InvalidCredentials })
)
const Contract = HttpApi.make("butter").add(g)
// ---- The generator's type half: Contract type -> Hono Schema type ----
type EndpointsOf<A> = A extends HttpApi.HttpApi<any, infer G>
  ? G extends HttpApiGroup.HttpApiGroup<any, infer E, any> ? E : never
  : never
type HonoPath<P extends string> = P // Hono and Effect both use :param syntax
type Wire<S> = S extends Schema.toCodecJson<infer Inner> ? Inner["Encoded"] : S extends Schema.Top ? S["Encoded"] : never
type Opt<S, K extends string> = [S] extends [never] ? {} : { [k in K]: Wire<S> }
type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never
type ToHono<E> = UnionToIntersection<
  E extends { readonly path: infer P extends string; readonly method: infer M extends string; readonly "~Params": infer Pa; readonly "~Query": infer Q; readonly "~Payload": infer Pl; readonly "~Success": infer S; readonly "~Error": infer Er }
    ? { [K in HonoPath<P>]: {
        [K2 in `$${Lowercase<M>}`]:
          | { input: Opt<Pl, "json"> & Opt<Q, "query"> & Opt<Pa, "param">; output: Wire<S>; outputFormat: "json"; status: 200 }
          | { input: Opt<Pl, "json"> & Opt<Q, "query"> & Opt<Pa, "param">; output: Wire<Er>; outputFormat: "json"; status: 400 | 401 | 403 | 404 | 409 | 429 }
      } }
    : never
>
type HonoSchemaOf<A> = ToHono<EndpointsOf<A>> extends infer S extends HonoSchema ? S : never

// ---- The generator's runtime half: loop the Contract, register routes ----
export function toHono<A extends HttpApi.HttpApi<string, any>>(api: A): Hono<{}, HonoSchemaOf<A>, "/"> {
  const app = new Hono()
  for (const group of Object.values((api as any).groups) as any[])
    for (const ep of Object.values(group.endpoints) as any[])
      app.on(ep.method, ep.path, (c) => c.json({ todo: ep.identifier })) // real impl: decode, run Flow, encode
  return app as any
}


const app = new Hono().route("/auth", toHono(Contract))
const client = hc<typeof app>("http://x")
export async function f() { const r = await client.auth.g.a39.$post({ json: { email: "", n39: 1 } }); if (r.ok) { const b = await r.json(); const t: "SignedIn" = b._tag } }
