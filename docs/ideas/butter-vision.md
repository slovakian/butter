# Butter

Effect-native authentication with honest composition.

## Problem Statement

How might we let TypeScript apps compose authentication as an additive Effect layer — with renamable models and methods, and first-class override/augment — without Better Auth’s plugin-inference tax?

## Recommended Direction

**Capability graph under a thin builder, with a shared contract module, proven first on a session-kernel MVP.**

Better Auth got several product truths right:

- A stable internal auth model (identity, session, account, verification, …)
- Bring-your-own database adapter
- Every capability addressable through an API surface
- Extensions (plugins) that add capabilities to that surface

What it got wrong is the **composition substrate**. Auth is assembled as one config object plus a plugins array, then TypeScript is asked to infer a merged world from that array. That works for shallow cases and breaks when extensions mutually extend the same types. The docs and issues show the symptoms clearly: `customSession` does not infer fields from other plugins; `inferAdditionalFields` exists to paper over client drift; plugin order becomes load-bearing; server and client `$Infer` diverge.

Butter keeps the product truths and changes the substrate:

1. **Capabilities, not a god-object.** Auth is a graph of named capabilities (`session.get`, `credential.signIn`, `organization.invite`, …). Extensions contribute nodes, schemas, and handlers. They do not mutate one inferred bag of options.
2. **Model alias = public namespace.** Core keeps stable internal model ids. Aliasing a model renames the public type **and** the client/RPC namespace (`organization` → `publication` ⇒ `client.publication.*`). Method aliases rename only the leaf (`inviteMember` → `invite`). DB table / Prisma delegate names are a separate adapter mapping.
3. **Override and augment are core.** Replace a capability, or wrap it to enrich the result. Custom session is not a special plugin — it is the normal composition story.
4. **One contract module.** Server, client, and RPC all project from the same built contract. No parallel client plugin list just to keep types aligned.
5. **Config is composed across files.** Adapter, aliases, extensions, and session rules are modules. `auth.ts` only assembles. The ultimate DX is *not* a single clustered config object.
6. **Adapters and RPC at the edge.** Prisma and Drizzle adapters first. oRPC first as the RPC projection (tRPC later). Apps reuse the RPC layer they already have.
7. **Agent-native tooling later.** A CLI that emits instructions for schema/RPC changes agents should make — not a silent schema rewriter.

Effect is the engine: Services, Layers, and Schema. Day-1 DX is a thin builder that compiles to that engine. Authors should not need deep Effect literacy to set up auth; the composition underneath stays honest so Effect users (and agents) can drop down when they need to.

### Why this is plausible

| Bet | Why it can work | Hard part |
|-----|-----------------|-----------|
| Builder → Layers | Effect already models dependency graphs; the builder is sugar that emits a Layer | Keeping sugar from becoming another opaque config object |
| Additive type composition | Each extension returns typed contributions; the build step intersects/unions them explicitly | TypeScript UX for rename + override without cleverness overload |
| Shared contract | One schema/procedure artifact projected three ways | Package boundaries when server and client live apart |
| Model alias = namespace | One public rename drives types and client grouping; methods stay leaves | Field-level rename / input key aliasing later |
| Multi-file config | Contributions are importable modules; assembly is a thin pipe | Preserving inference when slices live in separate files |
| Override / augment | Middleware-shaped handlers over capability IDs | Defining safe defaults so overrides cannot silently break auth invariants |

Better Auth’s limitations are evidence that the *composition model* is wrong, not proof that Effect magically fixes auth. Effect helps only if Butter refuses to recreate “array of plugins mutates one inferred type.”

## Key Assumptions to Validate

- [ ] A thin builder can compile to Layers and stay readable after 2–3 extensions
- [ ] Model alias (= namespace) + method leaf rename flows to client and RPC without leaking core names
- [ ] Multi-file contributions preserve types as well as a single-file builder chain
- [ ] Override and augment compose without plugin-order bugs
- [ ] A shared contract removes server/client type drift (the `inferAdditionalFields` class of hacks)
- [ ] Session-kernel docs/examples are enough to prove the bet before chasing feature parity
- [ ] Agents can edit modular setup files more reliably than they can navigate Better Auth plugin inference

## MVP Scope (this define stage)

Docs only — no production library implementation yet.

- This vision narrative
- Illustrative TypeScript examples under [`docs/examples/`](../examples/)
- Explicit non-goals
- Plausibility notes for the next design pass

## Not Doing (and Why)

- **Working auth library code** — still validating the composition story
- **Full Better Auth feature parity** — composition bet first; OAuth matrix and org surface come after the kernel is right
- **Schema-mutating CLI** — prefer agent instruction output over silent rewrites
- **tRPC + oRPC on day one** — oRPC first; tRPC as a second projection
- **Raw Layer-only public API** — builder sugar is required for adoption
- **Cards-on-the-table “Effect required to understand your auth”** — Effect is the engine; literacy is optional at the builder layer
- **Separate `namespaces` map** — model alias *is* the namespace; DB names are adapter `tables`

### Alias design (decided for vision)

Capabilities are addressed internally as `model.method` (e.g. `organization.create`).

| Map | Where | Renames | Example |
|-----|-------|---------|---------|
| `models` | `alias()` | Public type **and** client/RPC namespace | `organization` → `publication` |
| `methods` | `alias()` | Method leaf only | `organization.inviteMember` → `invite` |
| `tables` | adapter options | Internal model → DB/Prisma delegate | `organization` → `publication` (Prisma key) |

Projection:

```txt
publicPath = (models[ns] ?? ns) + "." + (methods[id] ?? methodLeaf)
organization.create → publication.create
```

`tables` can match public aliases, Prisma model names, or neither — that is storage, not API surface.

### Config shape (decided for vision)

Config is **modular by default**:

| Module | Responsibility |
|--------|----------------|
| `adapter.ts` | Prisma/Drizzle bridge + `tables` map |
| `aliases.ts` | Public `models` + `methods` |
| `*.extension.ts` | Extension contributions |
| `session.ts` (etc.) | Augment / override slices |
| `auth.ts` | Thin assembly + export `contract` |
| `client.ts` / `rpc.ts` | Projections of `contract` |

See [`docs/examples/07-prisma-multifile-setup/`](../examples/07-prisma-multifile-setup/) for the walkthrough.

## Open Questions

- Exact builder API: fluent chain vs declarative manifest vs both (manifest preferred for agents)?
- Best TypeScript pattern for multi-file slices so inference survives (`withX(builder)` vs `defineAuthSlice`)?
- Do public HTTP paths always follow model alias + method leaf, or are routes independently aliasable?
- Is the contract a separate export (`auth.contract`) or only inferred from the built instance?
- How much invariant protection do overrides get (can you replace `session.get` with something that drops `userId`)?
- First extension after session kernel: organizations-like, or credentials/email-password?

## Illustrative Examples

See [`docs/examples/`](../examples/) for conceptual TypeScript that shows the intended DX. These files are **not executable library code**; they document the shape we intend to build toward.

| File | Shows |
|------|--------|
| [`01-builder-setup.ts`](../examples/01-builder-setup.ts) | Thin builder → built auth + contract |
| [`02-rename-models-and-methods.ts`](../examples/02-rename-models-and-methods.ts) | Model alias = namespace; method = leaf |
| [`03-override-and-augment.ts`](../examples/03-override-and-augment.ts) | Replace vs wrap a capability |
| [`04-extension-contribution.ts`](../examples/04-extension-contribution.ts) | Extension adds models + capabilities |
| [`05-contract-client-rpc.ts`](../examples/05-contract-client-rpc.ts) | One contract → client + oRPC |
| [`06-adapter-boundary.ts`](../examples/06-adapter-boundary.ts) | Prisma/Drizzle + `tables` map |
| [`07-prisma-multifile-setup/`](../examples/07-prisma-multifile-setup/) | Full Prisma setup split across files |

## Next Step After This Doc

Run a focused design pass on the capability ID vocabulary and the builder → contract → projection pipeline, still without implementing the library. Only then write a real spec (`spec-driven-development`) for the session kernel.
