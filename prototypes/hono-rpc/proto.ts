import { Schema } from "effect"
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "effect/http-api"
import { Hono } from "hono"
import type { Schema as HonoSchema } from "hono/types"
import { hc } from "hono/client"

// ---- A Butter-like Contract: two Slices, written once, no Hono anywhere ----
class InvalidCredentials extends Schema.TaggedError<InvalidCredentials>()("InvalidCredentials", {}) {}
const SignedIn = Schema.TaggedStruct("SignedIn", { userId: Schema.String })

const password = HttpApiGroup.make("password").add(
  HttpApiEndpoint.post("signIn", "/password/sign-in", {
    payload: Schema.Struct({ email: Schema.String, password: Schema.String }),
    success: SignedIn,
    error: InvalidCredentials,
  }),
)
const oauth = HttpApiGroup.make("oauth").add(
  HttpApiEndpoint.get("callback", "/oauth/:provider/callback", {
    params: { provider: Schema.String },
    query: { code: Schema.String, state: Schema.String },
  }),
)
const Contract = HttpApi.make("butter").add(password).add(oauth)

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

// ---- What the user writes ----
const authRoutes = toHono(Contract)
const app = new Hono().route("/auth", authRoutes).get("/hello", (c) => c.json({ hi: true }))
export type AppType = typeof app

// ---- Browser ----
const client = hc<AppType>("http://localhost")
async function demo() {
  const res = await client.auth.password["sign-in"].$post({ json: { email: "a@b.c", password: "x" } })
  if (res.ok) {
    const body = await res.json()
    const tag: "SignedIn" = body._tag
    const id: string = body.userId
  } else {
    const err = await res.json()
    const tag: "InvalidCredentials" = err._tag
  }
  // @ts-expect-error wrong input field
  await client.auth.password["sign-in"].$post({ json: { email: "a@b.c" } })
  // @ts-expect-error route that doesn't exist in the Contract
  await client.auth.password["sign-out"].$post({})
  const url = client.auth.oauth[":provider"].callback.$url({ param: { provider: "github" }, query: { code: "c", state: "s" } })
  const hello = await (await client.hello.$get()).json()
  const h: boolean = hello.hi
}
const live = hc<AppType>("http://localhost", { fetch: (input: RequestInfo | URL, init?: RequestInit) => app.request(input, init) })
const r1 = await live.auth.password["sign-in"].$post({ json: { email: "a@b.c", password: "x" } })
console.log("sign-in", r1.status, await r1.text())
const r2 = await live.auth.oauth[":provider"].callback.$get({ param: { provider: "github" }, query: { code: "c", state: "s" } })
console.log("callback", r2.status, await r2.text())
console.log("url", live.auth.oauth[":provider"].callback.$url({ param: { provider: "github" }, query: { code: "c", state: "s" } }).href)
