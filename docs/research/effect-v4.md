# Research: Effect v4 release status, versioning, Schema and RPC

Researched 2026-10-24 from primary sources only (npm registry, GitHub `Effect-TS/effect` and `Effect-TS/effect-smol`, the published `effect@4.0.6` tarball, effect.website blog). "Verified" means read directly from the source cited; "Inferred" is marked as such.

## Answer

- **Effect 4.0 is stable.** `effect@4.0.0` was published to npm on 2026-10-01 and is the `latest` dist-tag; the current version is `4.0.6` (2026-10-22). The release notes call it "the first stable release of Effect v4" [npm-time, gh-4.0.0]. Effect 4.x is an LTS line with at least 3 years of support [readme, blog-40].
- **Versioning policy is per-API, not per-package.** Every module and export carries `@stability stable | unstable | experimental`. Stable (and untagged) APIs follow strict semver. Unstable APIs may break in **minor** releases. Experimental APIs may break in **patch** releases [migration, readme]. All Effect packages share one version and release together [migration].
- **`effect/Schema` is stable.** The core `Schema` module and its companions (`SchemaAST`, `SchemaGetter`, `SchemaIssue`, `SchemaParser`, `SchemaTransformation`, most of `SchemaRepresentation`) are tagged `@stability stable`. The `effect/schema/*` area (`Model`, `VariantSchema`, the JIT/AOT compilers) is unstable [tarball].
- **Effect RPC lives at `effect/rpc` and is unstable.** Every RPC module is `@stability unstable`, and so are the `effect/http` modules it runs over [tarball, migration]. The `effect/unstable/*` paths were **removed** in `4.0.0-rc.118` (2026-09-28), three days before 4.0.0, with no compatibility exports [changelog, migration].
- **For Butter:** we can pin Flows and Port-boundary row decoding to `effect@^4` with semver confidence. The Effect RPC Exposure style should be documented as tracking an unstable API: pin it to a minor version (`~4.0.x`) and expect changes in minor releases.

## Release status

**Verified:**

- npm dist-tags for `effect` (2026-10-24): `latest: 4.0.6`, `staging: 4.0.6`, `rc: 4.0.0-rc.118`, `beta: 4.0.0-beta.107`, `prev: 3.22.4` [npm-tags].
- Timeline from `npm view effect time` [npm-time]:
  - `4.0.0-beta.0`: 2026-02-18 (blog "Effect v4 Beta", Feb 18 2026 [blog-index])
  - `4.0.0-beta.107`, the last beta: 2026-08-10
  - `4.0.0-rc.108`, the first RC: 2026-08-12 (blog "We think this is it ...", Aug 12 2026 [blog-index])
  - `4.0.0-rc.118`, the last RC: 2026-09-28
  - `4.0.0`: 2026-10-01T03:11Z (GitHub release published 2026-10-01T01:47Z [gh-4.0.0]; blog "Effect 4.0" dated Sep 30 2026 [blog-40])
  - `4.0.1` through `4.0.6`: 2026-10-05 to 2026-10-22, all patch releases
- The `effect@4.0.0` changeset (#8633) says: "Effect 4.0 is the first stable release of Effect v4. It replaces the 4.0.0 beta and release-candidate series" [gh-4.0.0].
- **Repository move.** v4 now lives on `main` of `github.com/Effect-TS/effect`, and v3 is on the `v3` branch [readme]. The `effect-smol` README says "Effect V4 Has Moved ... This repository is archived and read-only" [smol-readme]. However, the GitHub API reports `archived: false` for it (last push 2026-07-14). The README is the authoritative statement; the archive flag just hasn't been set.
- **LTS** [readme, blog-40]: at least three years of support. Bug fixes until September 2029 or one year after 5.0 ships, whichever is later. Security fixes until September 2029 or two years after 5.0 ships, whichever is later.
- **v3 is still maintained.** `3.22.4` was published 2026-10-22 under the `prev` tag [npm-time]. The 4.0 post does not state an end date for 3.x [blog-40].
- **Requirements:** TypeScript 5.9 or newer, with TypeScript 7 recommended. `effect` has no runtime dependencies [gh-4.0.0].

## Versioning / breaking-change policy

**Verified:**

- One version number for the whole ecosystem: "if you use `effect@4.0.0`, the matching SQL package is `@effect/sql-pg@4.0.0`" [migration]. `@effect/platform`, `@effect/rpc`, `@effect/cluster`, `@effect/sql`, `@effect/schema` and others were merged into `effect` [migration, gh-4.0.0].
- Stability tiers [migration]:
  - "`@stability unstable` means an API may receive breaking changes in minor releases."
  - "`@stability experimental` means it may receive breaking changes across patch versions."
  - "`@stability stable` and APIs without a stability tag follow strict semver."
  - The README says the same: "Stable APIs reserve breaking changes for major releases" [readme].
- "Modules in packages other than `effect` are currently `@stability unstable`", which covers `@effect/platform-*`, `@effect/sql-*` and `@effect/vitest` [migration]. APIs that expose a third-party dependency are also unstable [migration, gh-4.0.0].
- Unstable modules: `ai`, `cli`, `cluster`, `devtools`, `eventlog`, `http`, `http-api`, `jsonschema`, `observability`, `persistence`, `process`, `reactivity`, `rpc`, `schema`, `socket`, `sql`, `workflow`, `workers`. "Moving these modules does not stabilize their APIs" [migration].
- Tag counts in the `effect@4.0.6` sources: 6,749 stable, 5,806 unstable and 353 experimental [tarball].
- **Post-release correction (surprise).** In 4.0.0, some modules meant to be unstable shipped without a tag, so they implicitly promised semver. 4.0.2 (2026-10-07, #8770) added an explicit tag to every module and export [changelog]. The team acknowledges that "narrowing a promise after a release is a breaking change in itself", and says no behavior, signatures or types changed [blog-week1].
- **Why tags instead of an `unstable/` directory:** promoting a module out of a directory would itself be a breaking import change [blog-week1].
- Not yet published: "We'll share the full policy and our release process in a follow-up post" [blog-40].

**Observed (verified facts, inferred significance):** 4.0.6, a patch release, changed the RPC NDJSON content type from `application/ndjson` to `application/x-ndjson` (#9562) [changelog]. That is wire-observable for custom integrations. It is framed as a fix, but it shows that unstable modules can change behavior in patches, not only in minors.

## Effect Schema in v4

**Verified:**

- **Location:** `import { Schema } from "effect"` / `effect/Schema`. The old `@effect/schema` package is deprecated on npm ("this package has been merged into the main effect package") [npm-schema].
- **Stability** [tarball]:
  - `Schema.ts`: 470 stable tags, 149 unstable, 46 experimental. The unstable and experimental exports are domain helpers: `Cookie`/`Headers`/`UrlParams`, IP/MAC/network-address schemas, `ByteSize*`, `SemVer*`, `toCodecGoJson`, DNS records, `Host`/`Port`/`DomainName`. Core combinators (`Struct`, `Class`, `Union`, `decodeUnknownEffect`, `toStandardSchemaV1`, and so on) are stable.
  - `SchemaAST`, `SchemaGetter`, `SchemaIssue`, `SchemaParser`: fully stable. `SchemaTransformation`: 50 stable, 3 unstable. `SchemaRepresentation`: 148 stable, 2 unstable.
  - `effect/schema` (`Model`, `VariantSchema`, `SchemaCompiler`, `SchemaJITCompiler`, `SchemaAOTCompiler`) is unstable. The JIT/AOT compilers are described as "experimental modules" in the release notes [gh-4.0.0].
- **It is a rewrite:** "Schema v4 is a new implementation with faster parsing, class-based schemas, `make` constructors on every schema, and effectful decoding with services" [gh-4.0.0].
- **Breaking changes vs v3** [schema-mig]:
  - `decodeUnknown` became `decodeUnknownEffect`, and `decodeUnknownEither` became `decodeUnknownExit`.
  - `Union(A, B)` became `Union([A, B])`, and `Literal("a","b")` became `Literals([...])`.
  - `filter` became `check(...)`/`refine`, and all filters gained an `is` prefix. `positive`/`nonNegative` were removed.
  - `transform` became `decodeTo(to, SchemaTransformation.transform(...))`.
  - `pick`/`omit`/`partial`/`extend` became `mapFields(Struct.*)`.
  - `validate*` and `Data(schema)` were removed.
  - **Silent trap:** `Schema.Date` now expects a `Date` as its encoded value (it is the old `DateFromSelf`). Use `Schema.DateFromString` for ISO strings: "Existing code can still type-check after upgrading while no longer accepting the same input."
- Schema is still changing within 4.0.x patches, as bug fixes and type relaxations. In 4.0.0 itself, `Schema.brand` became type-only (#8628) [gh-4.0.0, changelog].

## Effect RPC in v4

**Verified:**

- **Location:** `effect/rpc` (`Rpc`, `RpcGroup`, `RpcServer`, `RpcClient`, `RpcMiddleware`, `RpcSerialization`, `RpcSchema`, `RpcMessage`, `RpcTest`, `RpcWorker`, ...). From `4.0.0-beta.0` to `4.0.0-rc.117` it was `effect/unstable/rpc`. `rc.118` removed every `./unstable/*` export (#8354), with "no compatibility exports for the old paths" [npm exports per version, changelog, migration].
- **Stability:** every RPC module export is `@stability unstable` (13 module tags in `rpc/index.ts`, all unstable). It may break in minor releases [tarball, migration].
- **Dependencies:** `RpcServer` imports `effect/http` (`HttpRouter`, `HttpServerRequest`, `HttpServerResponse`), `effect/socket` and `effect/workers`, all unstable [tarball]. The HTTP surface (`RpcServer.layerHttp`, `toHttpEffect`, `toHttpEffectWebsocket`, `RpcClient.layerProtocolHttp`) and the web-handler adapters (`effect/http` `HttpEffect.toWebHandler`, `HttpRouter.toWebHandler`) are also unstable.
- **Activity:** RPC is actively changing. Changes since 4.0.0 include client stall and retention fixes, socket ping and `onPingTimeout` options, an opt-in HTTP `batch` option (#9656), `Rpc.ParseOptions` (#9665), OpenTelemetry span kinds, and the NDJSON content-type change (#9562) [changelog]. 4.0 added schema-aware serialization and server-originated requests and notifications [gh-4.0.0].
- **Install trap:** the `@effect/rpc` npm package's `latest` tag is still `0.76.2`, the v3-era line, and it is not deprecated [npm-rpc]. `@effect/platform` is likewise `0.97.2`. With v4, import from `effect/rpc` instead of installing those packages.

**Inferred:** there is no published timeline for stabilizing RPC. "Our first priority is stabilizing more of the ecosystem" [blog-40] is the only forward-looking statement found.

## Implications for Butter

- **Open question resolved:** "Whether Effect 4.0 has an official stable release" is answered: yes, `4.0.0` on 2026-10-01, with LTS through at least September 2029. (Per the map, the closed ticket overrides the design doc; the doc itself is not edited.)
- **Flows and Ports:** core `Effect`, `Layer`, `Context.Service` and `Schema` are stable, so the Flows in each Slice can target `effect@^4.0`. Only two exports in `Effect.ts` are unstable (`withErrorReporting`, `withExecutionPlan`) [tarball]. Flows should avoid them, and a lint/check could reject imports of `@stability unstable` exports in shipped Slice code.
- **Port-boundary row decoding:** use stable `effect/Schema` (`Struct`, `Class`, `decodeUnknownEffect`). Avoid `effect/schema/Model` (`Model.Class`), which is unstable, and the unstable HTTP/Cookie schemas. Shipped Slice code is copied in and then diverges, so a stable surface keeps Advisories from colliding with Effect upgrades. Watch the `Schema.Date` trap on timestamp columns: use `DateFromString` or the right transformation for the Adapter's driver output.
- **Effect RPC as an Exposure style:** this is the only part of Butter's Effect usage on an unstable API, and its HTTP layer (`effect/http`) and `@effect/platform-*` are unstable too. The Effect RPC Exposure reference file in `butter-customize` should tell agents to:
  1. import from `effect/rpc`, never `effect/unstable/rpc` (removed) or `@effect/rpc` (v3-era);
  2. pin `effect` and every `@effect/*` package to the same version, using `~4.x.y` rather than `^4` for RPC users;
  3. rely on the Exposure Invariant tests run through the Exposure Driver to catch minor-version breaks.

  ADR-0003 already keeps Exposure out of shipped code, so RPC instability never reaches a Slice.
- **oRPC and other Exposures:** `Schema.toStandardSchemaV1` is stable [tarball]. An oRPC or Hono Exposure can reuse Flow input schemas through Standard Schema without depending on any unstable Effect module.
- **Promise facade:** `Effect.runPromise` and `ManagedRuntime` are stable [tarball], so a facade over the Composition Root's `Auth` service can sit on stable APIs.
- **Adapters:** `effect/sql` and the `@effect/sql-*` drivers (including `@effect/sql-pglite`) are unstable [migration]. Reference Adapters built on Reylo or ORMs are unaffected. Any reference Adapter on Effect SQL inherits minor-version risk.
- **"Removing Effect" (butter-customize):** unchanged by these findings.

## Sources

All accessed 2026-10-24.

- [npm-tags] `npm view effect dist-tags`: https://registry.npmjs.org/effect
- [npm-time] `npm view effect time --json` (registry `modified` 2026-10-22T20:49:57Z): https://registry.npmjs.org/effect
- [npm-rpc] `npm view @effect/rpc dist-tags` (latest 0.76.2), and `@effect/platform` (latest 0.97.2): https://registry.npmjs.org/@effect/rpc
- [npm-schema] `npm view @effect/schema deprecated`: https://registry.npmjs.org/@effect/schema
- npm exports per version (`npm view effect@<v> exports`), checked for beta.0, beta.107, rc.108, rc.112, rc.113, rc.115, rc.116, rc.117 (all have `./unstable/*`) and rc.118 and 4.0.6 (none).
- [tarball] `effect@4.0.6` package source (`npm pack effect@4.0.6`), `src/**/*.ts` `@stability` tags; published 2026-10-22.
- [gh-4.0.0] GitHub release `effect@4.0.0`, published 2026-10-01: https://github.com/Effect-TS/effect/releases/tag/effect%404.0.0
- [changelog] `packages/effect/CHANGELOG.md` on `main`: https://github.com/Effect-TS/effect/blob/main/packages/effect/CHANGELOG.md (entries #8354 in rc.118, #8770 in 4.0.2, #9562/#9656/#9665 in 4.0.6)
- [migration] `MIGRATION.md` on `main`: https://github.com/Effect-TS/effect/blob/main/MIGRATION.md
- [schema-mig] Schema v4 migration guide: https://github.com/Effect-TS/effect/blob/main/migration/schema.md
- [readme] `README.md` on `main` (LTS and stability statements): https://github.com/Effect-TS/effect/blob/main/README.md
- [smol-readme] `effect-smol` README ("Effect V4 Has Moved"): https://github.com/Effect-TS/effect-smol
- [blog-index] Effect blog index: https://effect.website/blog
- [blog-40] "Effect 4.0", last updated 2026-09-30: https://effect.website/blog/releases/effect/40
- [blog-week1] "Effect 4.0: The First Week", 2026-10-08: https://effect.website/blog/effect-4-first-week
