# Mechanisms in detail

This is the companion to [../slice-contract-extension.md](../slice-contract-extension.md). Each section opens with a plain-words summary, then the evidence. Source paths point into `node_modules/effect/src` (effect 4.0.6). Proofs are in `src/`.

## A. Rebuild after the fact (`extend()`)

**In plain words:** `HttpApi` endpoints can't be edited, so Butter reads the old endpoint, builds a new one with the extra pieces, and swaps it into a rebuilt group.

- **How it works.** Butter keeps its own copies of the original schemas in its annotation, because endpoints only store the JSON-codec-wrapped versions. Its types match `HttpApiEndpoint.HttpApiEndpoint<…11 params…>` with `infer` in every slot and rebuild the type. ExcludeIdentifier then swaps the endpoint into the group union. All of this lives in `src/support/butter.ts`, copied from the prototype.
- **Ordering.** Two Slices adding success variants commute: the types are equal in both orders (`A1`, `A2`).
- **Conflicts.** Two extensions that add the same field with different types produce **no error**. The field's type becomes `string & number = never` (`A3`), while the runtime decoder accepts the last one (a number). Types and runtime disagree, silently.
- **Reach.** Any endpoint built with Butter's `call()` can be extended. A plain `HttpApiEndpoint.post(...)` throws "has no Butter annotation", because there are no raw schemas to rebuild from.
- **Upkeep.** The type depends on the exact shape of the unstable `HttpApiEndpoint` interface (`http-api/HttpApiEndpoint.ts`, `interface HttpApiEndpoint`: 11 params, `in out Middleware`). The prototype already found that `any` placeholders silently fail to match. If a minor version adds or reorders a parameter, the result is `never`, not a compile error.

## B. Slices declare extension points

**In plain words:** the password Slice exports a *function* that builds its Contract and says which spots accept extras (`signIn`, `signUp`). The Contract Root calls it with what 2FA and the app contribute.

- **Proof.** `src/b-extension-points.ts`. `passwordContract({ signIn: merge(twoFactorSignIn, captchaSignIn), signUp: { fields: { displayName } } })`.
  - Handler, `HttpApiClient`, the derived Effect RPC group, the derived oRPC client and OpenAPI all show `SignedIn | SecondFactorRequired | CaptchaRequired` (`B1`–`B5` plus runtime).
  - The app's `displayName` is required on the client.
- **Only public constructors.** The endpoint is built once, by `HttpApiEndpoint.post` (via `call()`), so TypeScript infers the endpoint type from Effect's own constructor signature. No Effect type parameter is named anywhere.
- **Conflicts are loud.** Butter's `merge(a, b)` makes a same-name field a type error (`@ts-expect-error` line). Success and error variants concatenate, and unions are order-independent.
- **Can't reach the unanticipated.** `passwordContract({ verifyEmail: … })` is a compile error. A 2FA author can only extend the points a Slice author declared.
- **"Every sign-in".** This works by convention: Butter defines a standard `signIn` point kind, and each sign-in Slice (password, email-code, OAuth) declares it. The point's name is part of the Slice function's parameter type, so it is type-visible. Wiring is explicit in the Contract Root here. A `compose(slices)` that hands each contribution to every matching point automatically is a straightforward type-level fold, but it wasn't built.
- **Cost to authors.** Each Slice function spreads extras into tuples, with `as unknown as readonly [...]` casts. Butter's helpers would own that, so an agent writing a Slice writes `call("signIn", { …, extend: x.signIn })`.

## C. Effect Schema's own composition

**In plain words:** Schema can already make a bigger struct or a bigger union. But endpoints keep their own copies of the schemas, so this alone doesn't change any endpoint.

- These APIs are all `@stability stable`:
  - `Struct.mapFields(Struct.assign(…))`, which is what `Schema.fieldsAssign` is a shortcut for (`Schema.ts`, `fieldsAssign`);
  - `Union.mapMembers(Tuple.appendElements(…))`;
  - `Class.extend`.
- Proved in `src/c-schema.ts` (`C1`–`C4`).
- **Same-name fields replace, silently** (`C2`). The `Class.extend` docs say Effect "does not check compatibility".
- `Class.extend` makes a *new* class. The base Slice's handlers still name the old one, so nothing upstream changes.
- **Verdict:** these are the right tools *inside* B or H to build the bigger schema. They are not a way to extend an existing endpoint.

## D. Class-style declarations and re-adding

**In plain words:** you can write `class Password extends HttpApiGroup.make(...).add(...) {}`, but a class only gives the value a name. Re-adding an endpoint under the same name overwrites it at runtime, but not in the types.

- **Class style.** Groups and APIs declare `new(_: never): {}` so they can be extended as classes (`HttpApiGroup.ts`, comment on `identifier`). The only methods are the builder's own: `add`, `prefix`, `middleware`, `annotate*`. None of them edits an endpoint.
- **Runtime.** `add()` uses `assignProperty(endpoints, endpoint.identifier, endpoint)`, so the same name replaces the old endpoint (`Proto.add`).
- **Types.** The type is `Endpoints | A[number]`, so both versions stay (`D2`). The typed client accepts the *old* sign-up payload, which the server rejects with a 400 (`clientProgram` compiles).
- **Verdict:** unsafe.

## E. `Context`/`Layer` contribution

**In plain words:** each Slice provides "here's what I add" as an Effect service, and a composer Effect reads them and builds the API.

- **Runtime works.** The composed endpoint has 3 success schemas.
- **Types erase.** The success type is `unknown` (`E1`, `E1Actual`). The contributions live in the runtime Context, which never reaches the type of the built `HttpApi`.
- **Collecting is awkward.**
  - One shared tag can't collect contributions, because the last Layer providing it wins. So it takes one tag per contributor, and the composer must name every tag, which means it already knows every Slice.
  - The browser would have to run an Effect, with every Slice's Layer, before it even has a Contract.
- **Verdict:** Layers are the right tool for the *server half* (implementations, and G's middleware behaviour), not for Contracts.

## F. `Rpc.custom` and Effect RPC's edit API

**In plain words:** Effect RPC lets you edit a finished `Rpc` and build "custom constructors" that transform outputs. `HttpApi` has neither.

- **Setters.** `Rpc` has `setSuccess`, `setPayload` and `setError` (`rpc/Rpc.ts`, interface `Rpc`), and `RpcGroup` has `omit` and replace-by-tag `add`/`merge` (`rpc/RpcGroup.ts`). All are typed correctly (`F1`–`F3`). `ai/Tool.ts` has the same setters.
- **`Rpc.custom`.** This is a constructor whose output schemas go through a type-level function, a higher-kinded type written with `this["success"]` (`F4`). It customises everything built *with* it, at declaration time.
- **What it means for Butter.** Butter's `call()` could adopt the same pattern (e.g. a `signInCall` constructor). But that's B with extra machinery: it doesn't help with after-the-fact extension. Deriving the `HttpApi` Contract *from* RPC was rejected because RPC can't describe navigations (see [Is every Exposure derived from a runtime contract on exposable?](https://github.com/slovakian/butter/issues/39)).

## G. Annotations and middleware

**In plain words:** annotations carry facts the type checker can't see. Middleware is different: it shows up in the endpoint's type, and it can add *errors*.

- **Annotations.** `annotations: Context.Context<never>` (`G0`), so they're runtime-only, as the prototype found.
- **Middleware.**
  - Middleware sits in the endpoint type as `~Middleware`. `HttpApiEndpoint.Errors` includes `HttpApiMiddleware.Error<Middleware>`, and `getErrorSchemas` adds every middleware's `error` set. That set feeds `HttpApi.reflect`, then the client and OpenAPI.
  - **Proof** (`src/g-middleware.ts`): a Butter-owned marker, `SignInStep`, sits on password and email-code `signIn`.
    - "Every sign-in" is selected **by type** across groups (`G1`).
    - The client's error union includes `SignInStepRequired` (`G2`, `catchTag` compiles).
    - The 2FA Slice supplies the behaviour as a `Layer`, which returns 403, and OpenAPI lists `200`, `401` and `403`.
- **Limits.**
  1. It can add errors and provided services only, never success variants or input fields.
  2. The error schema is fixed where the marker is *declared*, so Butter declares a generic `SignInStepRequired`, not 2FA's own type.
  3. "Second factor needed" becomes a failure (403), not a success variant, which changes the semantics.
  4. The marker exists only if the Slice author attached it.
  5. The prototype's RPC and oRPC generators read `endpoint.error` only. They'd have to add each middleware's `.error`.
  6. `group.middleware()` misses endpoints added later (a known trap).
  7. The 2FA *decision* still belongs in the Flow, through Slice Services (per [How does the Auth service compose across Slices?](https://github.com/slovakian/butter/issues/13)).

## H. Butter's own format, data first

**In plain words:** a Slice writes its Contract as a plain object (schemas, kind, Session effect, `marks`). Extensions are ordinary functions over that object. Butter turns the result into `HttpApi` at the very end, and every door is derived from that.

- **Proof.** `src/h-data-first.ts`.
  - `addSuccessTo("signIn", [SecondFactorRequired])` reaches **every action marked `signIn`** in password *and* email-code, while unmarked `signUp` stays untouched.
  - `addFields(p, "signUp", { displayName })` targets by name.
  - Client, derived Effect RPC and derived oRPC types are all exact (`H1`, `H2`, `clientProgram`). A deliberately wrong expectation fails to compile, so the assertions are real.
- **Type-visible facts.** Because a Contract is a plain `as const` object, `marks`, `kind` and `session` are **in the type**. The prototype's `Context<never>` problem disappears, and a generator could type the session-refresh plugin from them.
- **Narrow Effect surface.** The compile step names `HttpApiGroup.HttpApiGroup<Id, Endpoints>` (3 params) and gets each endpoint type as `ReturnType<typeof call<Id, F, S, E>>`, a TypeScript instantiation expression over Butter's helper, which wraps Effect's public constructor. No `infer` over the 11 endpoint parameters.
- **Costs.**
  - It's a Butter format that agents and third-party authors must learn: the objection that made it the runner-up in [Is every Exposure derived from a runtime contract on exposable?](https://github.com/slovakian/butter/issues/39).
  - Navigations (query, redirect), raw endpoints and access aren't modelled in the proof.
  - Field clashes last-win unless Butter adds B's check.
- It shares B's property of building endpoints once, late.

## I. Declaration merging (not Effect)

**In plain words:** Butter declares an empty TypeScript interface, and each Slice adds an entry to it. The types update everywhere at once. The runtime list only updates when the Slice's file is imported.

- **Proof.** `src/i-registry.ts` and `src/i-registry-2fa.ts`. The type says `SignedIn | SecondFactorRequired` for an endpoint built before registration, which at runtime has 1 variant (`early = 1, late = 2`).
- The registry is global to the TypeScript program, so it leaks across apps in a monorepo.
- **Verdict:** unsafe for a security Contract.

## Effect-ecosystem patterns

- **Merging by key is everywhere; editing is rare.**
  - `HttpApi.add`/`addHttpApi` replace a group by identifier.
  - `RpcGroup.add`/`merge` replace an `Rpc` by tag.
  - `Toolkit.merge` replaces a tool by name.
  - All are last-wins, with no conflict error.
- **Setters exist** on `Rpc` and `Tool`, but **not** on `HttpApiEndpoint`.
- **Cluster.** `Entity` builds on RPC groups and adds `annotateRpcs`, with no extension story beyond that.
- **No Effect-native auth or plugin framework** with plugin-extends-plugin turned up in a search.
