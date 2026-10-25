import { Schema } from "effect"
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "effect/http-api"
import { Elysia } from "elysia"
import type { CreateEden } from "elysia/types"

import { treaty } from "@elysiajs/eden"

class InvalidCredentials extends Schema.TaggedError<InvalidCredentials>()("InvalidCredentials", {}) {}
const SignedIn = Schema.TaggedStruct("SignedIn", { userId: Schema.String })
const password = HttpApiGroup.make("password").add(
  HttpApiEndpoint.post("signIn", "/password/sign-in", {
    payload: Schema.Struct({ email: Schema.String, password: Schema.String }),
    success: SignedIn, error: InvalidCredentials,
  }),
)
const oauth = HttpApiGroup.make("oauth").add(
  HttpApiEndpoint.get("callback", "/oauth/:provider/callback", {
    params: { provider: Schema.String }, query: { code: Schema.String, state: Schema.String },
  }),
)
const Contract = HttpApi.make("butter").add(password).add(oauth)

// ---- type half: Contract -> Elysia Routes tree ----
type EndpointsOf<A> = A extends HttpApi.HttpApi<any, infer G> ? G extends HttpApiGroup.HttpApiGroup<any, infer E, any> ? E : never : never
type Wire<S> = S extends Schema.toCodecJson<infer Inner> ? Inner["Encoded"] : S extends Schema.Top ? S["Encoded"] : never
type Or<S, D> = [S] extends [never] ? D : Wire<S>
type U2I<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never
type Deep<T> = T extends object ? { [K in keyof T]: Deep<T[K]> } : T
type ToElysia<E> = U2I<
  E extends { readonly path: infer P extends string; readonly method: infer M extends string; readonly "~Params": infer Pa; readonly "~Query": infer Q; readonly "~Payload": infer Pl; readonly "~Success": infer S; readonly "~Error": infer Er }
    ? CreateEden<P, { [K in Lowercase<M>]: {
        body: Or<Pl, unknown>; params: Or<Pa, {}>; query: Or<Q, unknown>; headers: unknown
        response: { 200: Or<S, null>; 401: Or<Er, never> }
      } }>
    : never
>
type RoutesOf<A> = ToElysia<EndpointsOf<A>> extends infer R extends Record<string, any> ? R : never

// ---- runtime half: the existing fetch handler behind a catch-all ----
const butterFetchHandler = async (req: Request) => Response.json({ _tag: "SignedIn", userId: "u1", seen: new URL(req.url).pathname })
function toElysia<A extends HttpApi.HttpApi<string, any>>(_api: A) {
  const base = new Elysia().all("/*", ({ request }) => butterFetchHandler(request))
  type Base = typeof base
  type Retyped = Base extends Elysia<infer B, infer S, infer D, infer M, any, infer E, infer V> ? Elysia<B, S, D, M, RoutesOf<A>, E, V> : never
  return base as unknown as Retyped
}

// ---- user ----
const app = new Elysia().group("/auth", (g) => g.use(toElysia(Contract))).get("/hello", () => ({ hi: true }))
export type App = typeof app

// ---- browser ----
const api = treaty<App>("http://localhost", { fetcher: ((input: RequestInfo | URL, init?: RequestInit) => app.handle(new Request(input, init))) as any })
const r1 = await api.auth.password["sign-in"].post({ email: "a@b.c", password: "x" })
if (r1.data) { const t: "SignedIn" = r1.data._tag; const id: string = r1.data.userId }
if (r1.error) { const t: "InvalidCredentials" = r1.error.value._tag }
// @ts-expect-error missing field
await api.auth.password["sign-in"].post({ email: "a@b.c" })
// @ts-expect-error unknown route
await api.auth.password["sign-out"].post({})
const r2 = await api.auth.oauth({ provider: "github" }).callback.get({ query: { code: "c", state: "s" } })
const h = await api.hello.get(); const hi: boolean | undefined = h.data?.hi
console.log("sign-in", r1.status, JSON.stringify(r1.data))
console.log("callback", r2.status, JSON.stringify(r2.data))
