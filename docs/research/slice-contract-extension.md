# How can Effect express one Slice extending another Slice's Contract?

Research for [How can Effect express one Slice extending another Slice's Contract?](https://github.com/slovakian/butter/issues/44). It feeds the grilling ticket [How does one Slice extend another Slice's Contract?](https://github.com/slovakian/butter/issues/45), where the choice is made. **Nothing here is decided.**

The per-mechanism detail is in [slice-contract-extension/mechanisms.md](slice-contract-extension/mechanisms.md). Runnable proofs are in [slice-contract-extension/src](slice-contract-extension/src).

## The question in plain words

A **Contract** says what an `exposable` action takes in, what it can return, and how it affects the Session. Sometimes another party has to grow a Contract they didn't write:

- the 2FA Slice adds a "second factor needed" result to password sign-in (an **added success variant**);
- the app adds a `displayName` field to sign-up (an **added input field**);
- 2FA's new result *pends* the Session instead of creating it (a **changed annotation**, here the Session effect).

Effect `HttpApi` has no way to edit an endpoint once it's built. This document looks at every way around that.

## Setup

`effect@4.0.6`, `@orpc/{contract,server,client,openapi,effect}@2.0.0-beta.46`, TypeScript 5.9.3, Node 24. The sources are the Effect source shipped in `node_modules/effect/src` (the `http-api`, `rpc`, `ai` and `Schema` modules) and the oRPC published packages.

```sh
cd docs/research/slice-contract-extension
pnpm install --config.strict-dep-builds=false
pnpm run check     # every Expect<Equal<…>> and @ts-expect-error in src/
pnpm run run-all   # the runtime half of each proof
```

`src/support/` holds the [Does Effect HttpApi hold up as the Contract?](https://github.com/slovakian/butter/issues/41) prototype's `butter.ts` (`call()`, annotation, `extend()`) and its RPC and oRPC generators, copied unchanged. A proof marked "derived" was run through those generators.

## The mechanisms, in one line each

| | Mechanism | In plain words |
|---|---|---|
| **A** | Rebuild after the fact (`extend()`) | Take the finished endpoint apart and build a bigger copy. |
| **B** | Slices declare extension points | Each Slice's Contract is a function. The Contract Root passes in the extras. |
| **C** | Effect Schema composition | Schema's own tools for adding fields or variants. They grow *schemas*, not endpoints. |
| **D** | Class-style groups and re-adding an endpoint | Re-add an endpoint under the same name and let it overwrite the old one. |
| **E** | `Context`/`Layer` contribution | Each Slice *provides* its additions as a service, and an Effect collects them. |
| **F** | `Rpc.custom` and Effect RPC's setters | Effect RPC lets you edit an `Rpc`. `HttpApi` has no equivalent. |
| **G** | Annotations and middleware | Add behaviour, or extra *errors*, without changing the schemas. |
| **H** | Butter's own data format, compiled to `HttpApi` last | Slices write plain data. Extensions edit that data, and Butter builds `HttpApi` from it at the end. |
| **I** | TypeScript declaration merging (not Effect) | Slices add entries to a global type registry, the way TanStack Router's `Register` works. |

## Comparison

"✓ proved" means a type assertion or runtime check in `src/` passes. The columns are the ticket's yardsticks.

| | Correct types end to end | Unstable surface touched | Can target what the author didn't anticipate | Targets by name or by type-visible marker | Two extenders on one endpoint | How it reads to an agent | Cost when Effect ships a minor |
|---|---|---|---|---|---|---|---|
| **A** rebuild | ✓ handler, client, RPC, oRPC, OpenAPI (prototype) | **Heavy.** Re-infers all 11 `HttpApiEndpoint` type params, keeps raw-schema copies | Yes, but only for endpoints built with `call()` (a plain endpoint throws) | Name only | Variants commute. **Field clash: type becomes `never`, runtime last-wins** (proved) | One call, but how it works is hidden | **Highest.** A new or reordered type param silently yields `never` |
| **B** extension points | ✓ handler, client, RPC, oRPC, OpenAPI (proved) | Public constructors only. No Effect type is named | **No.** An undeclared point is a compile error (proved) | Point name. "Every sign-in" works if every sign-in Slice declares a standard `signIn` point | Explicit `merge`. A field clash is a type error (proved) | Plain. Slice authors write generic plumbing (Butter can hide it) | Low |
| **C** Schema composition | Schemas only (proved) | None (`Schema`/`Struct`/`Tuple` are stable) | n/a | n/a | `Struct.assign`: last-wins **silently** (proved) | Familiar Effect | None. It's an *ingredient* of B or H, not a mechanism |
| **D** re-add | ✗ the type keeps both versions, so the client accepts the old payload (proved) | Low | Yes | Name | Runtime last-wins | Looks innocent, which is the danger | Low, but the types are wrong |
| **E** Layer | ✗ the success type erases to `unknown` (proved) | Low | Only for tags the composer reads | Tag | Composer-defined | Familiar, wrong place | Low, but no types |
| **F** Rpc setters / `custom` | ✓ for the RPC door only (proved) | `effect/rpc` (unstable) | Yes (RPC) | Name | `omit`+`add` replaces | Clear | n/a for `HttpApi`. There is no equivalent |
| **G** middleware | ✓ handler, client, OpenAPI (proved). The prototype's RPC/oRPC generators ignore middleware errors today | `HttpApiMiddleware` (unstable, public) | No. The author must attach the marker | **Type-visible marker** (proved: "every sign-in" picked by type) | Each middleware adds its own errors | Effect-idiomatic | Low–medium |
| **H** data first | ✓ handler, client, RPC, oRPC (proved). OpenAPI goes the same way as B | Public `call()` constructor via `ReturnType<typeof call<…>>`, plus the 3-param `HttpApiGroup` type | **Yes**, by name or by marker | **Both.** `marks: ["signIn"]` is type-visible; so are kind and Session effect | Variants commute. Field clash as in C unless Butter adds B's check (not proved here) | A Butter format to learn (the objection in [Is every Exposure derived from a runtime contract on exposable?](https://github.com/slovakian/butter/issues/39)) | Low. One compile step |
| **I** registry | ✓ types, ✗ runtime depends on import order (proved: types lie) | None | Yes | Registry key | Global, program-wide | Surprising | Low, but unsafe |

## Which look strongest (not a decision)

- **B (extension points)** is the most conservative fix. Slices keep writing `HttpApi`. Endpoints are built once through public constructors, so nothing re-infers Effect's type parameters. Field clashes are type errors. The price is that extensions can only go where the Slice author left a point. "Every sign-in" needs a Butter-wide convention: each sign-in Slice declares a standard `signIn` point.
- **H (data first)** is the most capable. It can target anything, by name or by a type-visible marker, and it is the only option where Butter's own facts (call vs navigation, Session effect, marks) are visible to the type checker. The price is reopening part of Decision 2 in [Is every Exposure derived from a runtime contract on exposable?](https://github.com/slovakian/butter/issues/39): Slices would author Butter data that compiles to `HttpApi`, instead of authoring `HttpApi` directly. Navigations aren't modelled in the proof.
- **G (middleware markers)** is a strong *complement* to either. It is Effect's only type-visible per-endpoint marker, and it adds error variants that the handler, client and OpenAPI all see. It can't add success variants or input fields.
- **A** works but carries the highest upkeep risk. **C** is an ingredient. **D, E, I** give wrong types. **F** only helps the RPC door.

## Class vs `TaggedStruct`

`Schema.Class`/`TaggedClass` results reach the **oRPC** client as plain objects while being typed as class instances (proved, C5). The Effect `HttpApi` and Effect RPC clients decode them to real instances. This affects **every mechanism**, because the oRPC door is derived from whatever schemas the Contract uses. `TaggedStruct` is typed as a plain object and is one on all three clients (proved, C6).

So it looks right for Contract success variants to prefer `TaggedStruct`. Errors are a separate question: `TaggedError` is what lets an Effect handler `yield*` an error. Its oRPC `data` has the same mismatch per the prototype generator's typing, which a generator can fix by typing error data as the encoded form (not proved).

## Surprises

- `HttpApiGroup.add` **replaces** an endpoint with the same name at runtime, but the type keeps both, so the typed client accepts the old payload (D).
- **Effect RPC has an edit API** (`setSuccess`, `setPayload`, `RpcGroup.omit`). `HttpApiEndpoint` has none. Effect's other "plugin" collections (`HttpApi.add`/`addHttpApi`, `RpcGroup.merge`, `Toolkit.merge`) all merge by key, last-wins, with no edit step.
- **Middleware is type-visible** on endpoints (`~Middleware`), and its declared errors flow into handler types, client types and OpenAPI responses (G).
- `HttpApiEndpoint` has a `disableCodecs: true` mode that stores schemas without the JSON-codec wrapping. That could remove A's raw-schema copy. **Not verified.**
- A web search turned up no Effect-native auth library with a plugin-extends-plugin system. Better Auth (not Effect) is the reference in [Is every Exposure derived from a runtime contract on exposable?](https://github.com/slovakian/butter/issues/39): it targets plugins by path strings plus `additionalFields`.
