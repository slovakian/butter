// PROTOTYPE — Check 1 generator: HttpApi group -> Effect RPC group (calls only).
import { Schema } from "effect"
import { HttpApiEndpoint, HttpApiGroup } from "effect/http-api"
import { Rpc, RpcGroup } from "effect/rpc"
import { getButter, type IsNavigation } from "./butter.ts"

type UnionOf<S extends Schema.Top> = [S] extends [never] ? typeof Schema.Never : Schema.Union<ReadonlyArray<S>>

type EndpointToRpc<GId extends string, E> = E extends HttpApiEndpoint.HttpApiEndpoint<
  infer Id, infer _M, infer _Path, infer _Params, infer _Query, infer P, infer _H, infer S, infer Er, infer _Mw, infer _MwS
>
  ? IsNavigation<E> extends true ? never
  : Rpc.Rpc<`${GId}.${Id}`, P, UnionOf<S>, UnionOf<Er>>
  : never

export type GroupToRpcs<G> = G extends HttpApiGroup.HttpApiGroup<infer GId, infer Es, any> ? EndpointToRpc<GId, Es> : never

const unionOf = (schemas: ReadonlyArray<Schema.Top>): Schema.Top =>
  schemas.length === 0 ? Schema.Never : schemas.length === 1 ? schemas[0]! : Schema.Union(schemas)

export const toRpcGroup = <const Gs extends ReadonlyArray<HttpApiGroup.HttpApiGroup<string, any, boolean>>>(
  ...groups: Gs
): RpcGroup.RpcGroup<GroupToRpcs<Gs[number]>> => {
  const rpcs: Array<Rpc.Any> = []
  for (const group of groups) {
    for (const ep of Object.values(group.endpoints as Record<string, HttpApiEndpoint.Top>)) {
      if (getButter(ep)?.kind !== "call") continue // navigations and raw endpoints: HTTP-shaped doors only
      const payload = ep.payload.get("application/json")?.schemas[0] ?? Schema.Void
      rpcs.push(
        Rpc.make(`${group.identifier}.${ep.identifier}`, {
          payload,
          success: unionOf([...ep.success]),
          error: unionOf([...ep.error])
        }).annotateMerge(ep.annotations)
      )
    }
  }
  return RpcGroup.make(...rpcs) as any
}
