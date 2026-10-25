# PROTOTYPE (throwaway): does Effect `HttpApi` hold up as the Contract?

For [Does Effect HttpApi hold up as the Contract?](https://github.com/slovakian/butter/issues/41). Never merged.

Versions: `effect@4.0.6`, `@orpc/{contract,server,client,openapi}@2.0.0-beta.46`, TypeScript 5.9.3, Node 24.22.1.

```sh
pnpm install && npx tsc -p .          # all type assertions (Expect<Equal<…>>, @ts-expect-error)
npx tsx src/check1-rpc.ts             # and check2-extend / check3-orpc-nest / check4-orpc-meta-plugin
```

## Layout

- `src/butter.ts`: Butter's thin helpers: `call()` (POST, path from id, body-only input), `navigation()` (GET, success is a declared 302), the Butter annotation (kind, Session effect per success `_tag`, raw schemas), and `extend()`.
- `src/slices/*.contract.ts`: toy `password` (signIn, signUp, navigation verifyEmail) and `twoFactor` (verify + `withSecondFactor` extending password signIn) Contracts, written as plain `HttpApiGroup`s.
- `src/contract-root.ts`: the Contract Root: 2FA extension + app extension (`displayName` on signUp) → `HttpApi`.
- `src/derive/rpc.ts`, `src/derive/orpc.ts`: generators.

## Results: all four checks pass, types and runtime

1. **HttpApi group → Effect RPC group.** `toRpcGroup(...groups)` makes `Rpc`s tagged `group.endpoint`, calls only; navigations are dropped at the type level too (tag union is exactly the three calls). Typed `RpcClient` round-trips through `RpcServer` over HTTP: success union, typed error, decoded class instances.
2. **Slice extends Slice; app adds a field.** `extend(group, "signIn", { success: [SecondFactorRequired] })` and `extend(group, "signUp", { payloadFields: { displayName } })`. Handler, `HttpApiClient` and OpenAPI all see `SignedIn | SecondFactorRequired`; missing `displayName` is a type error and a runtime 400; Session-effect annotations merge.
3. **oRPC nesting.** `toOrpcContract` output nests under `auth` in an app contract; `toOrpcRouter(contract, flows)` output fills the subtree in `implement(appContract).router({...})`; a wrong subtree is a type error. RPCHandler and OpenAPIHandler both serve it.
4. **Client plugin reads meta.** `minifyRouterContract` drops schemas, keeps Butter meta; a client interceptor maps path → meta → Session effect of the success `_tag` (signIn → creates / pending, verify → creates, failures and app procedures → nothing).

## Findings (things that bit)

- **No edit API on `HttpApi` endpoints or groups.** `extend()` rebuilds the endpoint and the group. It needs the *original* schemas, because endpoints store JSON-codec-wrapped ones (`toCodecJson`), so Butter keeps them in its annotation. Its types re-infer all 11 type parameters of `HttpApiEndpoint` (an `@stability unstable` type); `any` placeholders silently fail to match, only `infer` works.
- **Butter annotations are runtime-only.** `annotations: Context<never>`: kind / Session effect / access never reach the type level. Navigations are recognised at type level by their redirect success type instead.
- **2FA targets signIn by endpoint name.** Typed (rename = compile error), but "every sign-in" can't be expressed by type without a type-visible marker.
- **Class schemas lie on the oRPC client.** Types say `SignedIn` (class), runtime gives a plain object (`instanceof` false). Effect RPC and HttpApi clients do decode to instances.
- **oRPC needs the un-codec'd schemas**, otherwise the client input type becomes the JSON type (`any`-like).
- **`payload: { ...fields }` (not `Schema.Struct`) silently means form-urlencoded** in `HttpApiEndpoint`; helpers must take `Schema.Struct`.
- `RpcGroup.toLayer` does not reject extra handler keys; oRPC v2 `RPCLink` `url` is a path, not an absolute URL.
