# Prisma 8: driver access, shared transactions, and raw SQL

Researched 2026-10-24 against primary sources: the prisma/orm repo (formerly prisma/prisma, which now redirects there) at tag `v8.0.0-rc.20`, commit `10b7bedcefafc63484b0ac9a9ae34fdedee54b30`; the published npm tarballs; prisma.io docs and blog; and a local run against PostgreSQL 14.19.

Evidence labels used below:

- **[src]** read in the source at the tag above.
- **[ran]** reproduced locally with `@prisma/orm-postgres@8.0.0-rc.20`, `pg@8.22.0`, Node 24.22.1, PostgreSQL 14.19.
- **[docs]** taken from Prisma's own docs, skill files or release notes.
- **[inferred]** my reasoning, not checked directly.

## Question

> "What does Prisma 8 expose about its underlying database driver and connections, and can code outside Prisma (Reylo, raw `pg`) take part in a Prisma 8 transaction? What raw-SQL facilities does Prisma 8 offer for the 'ORM raw SQL' Query Layer?"

## Answer

- **Prisma 8 is not final.** It is a release candidate and a ground-up TypeScript rewrite. It has no `PrismaClient`, no generator, no `$queryRaw` and no `@prisma/adapter-*` driver adapters. The latest ORM release is `8.0.0-rc.20` (2026-10-22). The latest stable release is Prisma `7.10.1` (npm 2026-10-15, GitHub release 2026-10-19). The README expects `8.0.0` final "in the next four to eight weeks".
- **You can hand Prisma 8 your own pool.** `postgres({ contract, pg: pool })` accepts a `pg.Pool` or a `pg.Client`, and Prisma runs its queries on that object. So the app, Reylo and Prisma can share one pool **[src][ran]**. The design doc's "separate `pg` pool" claim is wrong.
- **Inside `db.transaction(async (tx) => …)` there is no public way to reach the underlying `pg` connection.** `tx` exposes only `sql`, `orm`, `raw`, `prepare`, `query`, `execute`, `toSql`, `enums` and `nativeEnums`. The raw-connection accessor (`acquireRawConnection`) is `protected`, so only extension authors can reach it, and it returns Prisma's own `SqlConnection`, not a `pg` client **[src]**. Reylo cannot `.run()` on `tx`.
- **Prisma can partly join a transaction it did not open.** Check out a `PoolClient`, `BEGIN` on it, and build a short-lived `postgres({ contract, pg: client })`. Its `query`/`execute` calls (raw lane, SQL builder) then run inside your transaction **[ran]**. This breaks badly if anything on that client opens its own transaction: `db.transaction()` and ORM single-row updates. They COMMIT your outer transaction and call `release()` on your `PoolClient` **[ran]**. So this is not a general solution.
- **The reliable way to share a transaction is to send SQL through Prisma:** `tx.raw.sql\`…\``. It binds `$n` parameters, supports `RETURNING`, and decodes each declared column with the codec you name. Rows come back as plain objects: int8 as `bigint`, numeric as `string`, timestamptz as `Date` or `Temporal.Instant`, jsonb as a parsed value, bytea as `Uint8Array` **[ran]**.
- **Prisma 8 has no TypedSQL, `$queryRawUnsafe` or `Prisma.sql`** (scorecard ❌). Interactive transactions also have no `isolationLevel`, `timeout`, `maxWait` or savepoints (scorecard ❌; isolation level is open as issue #30807 and PR #30333).

## Findings

### 1. Release status, and how 8 differs from 7

- npm dist-tags on 2026-10-24 (from `npm view`):
  - `prisma` `latest` = `8.0.0-rc.27` (2026-10-23). This is the new CLI, built from `github.com/prisma/prisma-cli` and described as "one binary for the ORM, Composer, and the Prisma Developer Platform". `prisma` `prev` = `7.10.1`.
  - `@prisma/client` `latest` = `7.10.1`.
  - `@prisma/orm-postgres` `latest` = `8.0.0-rc.20`. This is the "one package a Postgres application installs".
  - So `npm i prisma` now installs the Prisma 8 RC CLI. **[npm]**
- GitHub releases: [v8.0.0-rc.20](https://github.com/prisma/orm/releases/tag/v8.0.0-rc.20) (2026-10-22, prerelease) and [7.10.1](https://github.com/prisma/orm/releases/tag/7.10.1) (2026-10-19). Prisma 7 lives on the `v7` branch. It gets fixes "for eighteen months after `8.0.0` final" ([README](https://github.com/prisma/orm/blob/v8.0.0-rc.20/README.md)). **[docs]**
- The [announcement post](https://www.prisma.io/blog/the-next-evolution-of-prisma-orm) (2026-03-04, Will Madden and Ankur Datta) describes Prisma 8 ("working name Prisma Next") as a full TypeScript rewrite. It adds a type-safe SQL builder and middleware, and makes migrations a graph. **[docs]**
- Shape of Prisma 8 **[docs][src]**:
  - You write a *contract* (PSL or TypeScript) and run `prisma contract emit` to produce `contract.json` and `contract.d.ts`. You then call a façade factory: `postgres({ contract, url | pg | binding })` from `@prisma/orm-postgres/runtime` ([runtime.md](https://github.com/prisma/orm/blob/v8.0.0-rc.20/skills/prisma-8/references/runtime.md)).
  - Query lanes: `db.orm.<ns>.<Model>`, `db.sql.<ns>.<table>` (the builder) and `db.raw.sql` (raw).
  - Packaging is ESM-only (`"type": "module"`, `.mjs` exports). `@prisma/orm-postgres` pins `pg` to `8.22.0`. `temporal-polyfill` is a peer dependency.
  - The Postgres runtime has no Rust engine and no driver-adapter layer. Its own `pg` driver lives in `packages/3-targets/postgres/3-driver`.
  - Accelerate is gone: "Prisma 8 has no Accelerate/Data Proxy surface" ([non-ported note](https://github.com/prisma/orm/blob/v8.0.0-rc.20/test/integration/test/ports/prisma/non-ported/functional/accelerate-bad-url-errors/accelerate-bad-url-errors.md)).
- For comparison, Prisma 7.0.0 ([release](https://github.com/prisma/orm/releases/tag/7.0.0), 2025-11-19) made the Rust-free ESM `prisma-client` generator the default. It also required either `adapter` (for example `new PrismaPg(...)`) or `accelerateUrl`. **[docs]**

### 2. Driver and pool ownership in Prisma 8

- Binding inputs are mutually exclusive: `{ url }`, `{ pg: Pool | Client }`, or `{ binding: { kind: 'url' | 'pgPool' | 'pgClient', … } }`. `pg` objects are recognised by shape, not class: a pool by `totalCount`/`idleCount`/`waitingCount`, a client by `escapeIdentifier`/`escapeLiteral`. A `PoolClient` therefore counts as a client ([binding.ts](https://github.com/prisma/orm/blob/v8.0.0-rc.20/packages/3-targets/postgres/9-facade/src/runtime/binding.ts)). **[src]**
- A `pgPool` binding runs each driver call on `pool.connect()` from *your* pool. A `pgClient` binding runs everything on that one client, with FIFO serialisation ([postgres-driver.ts](https://github.com/prisma/orm/blob/v8.0.0-rc.20/packages/3-targets/postgres/3-driver/src/postgres-driver.ts), `createBoundDriverFromBinding`). So the user holds the very pool Prisma uses. **[src]**
- `db.close()` ends only a pool that Prisma built from `url`. A caller's `pg.Pool` or `pg.Client` is left open ([postgres.ts](https://github.com/prisma/orm/blob/v8.0.0-rc.20/packages/3-targets/postgres/9-facade/src/runtime/postgres.ts), `ownsPool`). **[src][ran]**
- Pool tuning beyond `connectionTimeoutMillis`/`idleTimeoutMillis` means passing your own `pg.Pool` (runtime.md, "What Prisma 8 doesn't do yet"). **[docs]**
- The driver sets pg's type parser to return raw server text for every type (`serverTextTypes`). Prisma's codecs then decode values, not `pg` ([server-text-types.ts](https://github.com/prisma/orm/blob/v8.0.0-rc.20/packages/3-targets/postgres/3-driver/src/server-text-types.ts)). This applies only to Prisma's queries: a query made directly on the shared pool still uses pg's own parsers. **[src]**
- Serverless: `postgresServerless().connect({ url })` accepts only a URL and builds its own `pg.Client` per request ([postgres-serverless.ts](https://github.com/prisma/orm/blob/v8.0.0-rc.20/packages/3-targets/postgres/9-facade/src/runtime/postgres-serverless.ts)). That client is never exposed. **[src]**
- Prisma 7, for contrast: `new PrismaPg(pool | poolConfig | connectionString)`. An external `pg.Pool` is used as-is. `PrismaPgAdapter.underlyingDriver()` returns the pool (added in [PR #27727](https://github.com/prisma/orm/pull/27727), 2025-07-23). The adapter's `startTransaction` checks out a `PoolClient` and sends `BEGIN`, but there is no public API to get that client from a `tx` ([adapter-pg/src/pg.ts @7.10.1](https://github.com/prisma/orm/blob/7.10.1/packages/adapter-pg/src/pg.ts)). **[src]**

### 3. Can outside code take part in a Prisma 8 transaction?

**Prisma owns the transaction (`db.transaction(fn)`).** The answer is no for outside code:

- `tx` is built in `buildPostgresRuntimeBoundMembers`/`buildPostgresQueryMembers`. Its members are exactly `sql, orm, raw, prepare, query, execute, toSql, enums, nativeEnums` plus `invalidated`. It has no `runtime()`, `connection()` or driver handle ([postgres-members.ts](https://github.com/prisma/orm/blob/v8.0.0-rc.20/packages/3-targets/postgres/9-facade/src/runtime/postgres-members.ts); runtime.md: "`tx` has no `close`, `[Symbol.asyncDispose]`, `transaction` or `runtime()`"). **[src][docs]**
- `db.runtime().connection()` is public. It returns a `RuntimeConnection` that runs Prisma *plans* and can `transaction()`, `release()` and `destroy()`, but it hands out no `pg` client ([sql-runtime.ts](https://github.com/prisma/orm/blob/v8.0.0-rc.20/packages/2-sql-family/5-runtime/src/sql-runtime.ts) L150–188). **[src]**
- `SqlRuntimeBase.acquireRawConnection()` is `protected` and meant for extension authors. Supabase uses it. It returns Prisma's `SqlConnection` (`query({ sql, params })`, `beginTransaction`), which is still not a `pg` client. **[src]**
- `transaction(fn)` takes no options. The scorecard marks `isolationLevel`, `timeout`, `maxWait`, client-level defaults, savepoints and `P2034` as "❌ Not in 8.0" ([14-transactions.md](https://github.com/prisma/orm/blob/v8.0.0-rc.20/scorecard/14-transactions.md)). There is an open issue, [#30807](https://github.com/prisma/orm/issues/30807) (2026-10-21, "[Prisma 8] Transaction isolation level option on `db.transaction`"), and an open PR, [#30333](https://github.com/prisma/orm/pull/30333) (2026-09-17). **[src][docs]**
- A long-standing request to expose and accept a transaction object is still open: [#13004](https://github.com/prisma/orm/issues/13004) (2022, last updated 2025-10-07). I found no Prisma 8 issue asking for external-connection access. **[docs]**

**You own the transaction and Prisma joins it through a `pg.Client`/`PoolClient` binding** **[ran]** (script: `pool.connect()`, `BEGIN`, `postgres({ contract, pg: client, verifyMarker: false })`):

- Reads and writes through `scoped.query(...)` / `scoped.execute(...)` (raw lane) ran inside the outer transaction. They saw a row written directly on `client` (as Reylo would) and were undone by the outer `ROLLBACK`. `scoped.close()` left the client open.
- `scoped.transaction(fn)` on that client:
  - It sent a second `BEGIN` (notice: "there is already a transaction in progress").
  - Its `COMMIT` committed the *outer* transaction, so the caller's `ROLLBACK` got "there is no transaction in progress" and both rows stayed.
  - With a `PoolClient` it also called `release()` on the caller's client, so the caller's own `release()` threw "Release called on client which has already been released to the pool."
- An ORM single-row update (`scoped.orm.public.User.where({ id }).update(...)`) did the same: its change survived the outer `ROLLBACK`, and the `PoolClient` was released. The source explains why: such ORM operations ask for their own connection and transaction (runtime.md, serverless section). `PostgresConnectionImpl.release()` calls `conn.release()` whenever the object has one, and `beginTransaction` sends a plain `BEGIN`, not a `SAVEPOINT` (postgres-driver.ts). **[src]**
- The `cursor` option is also unsafe here **[inferred from src]**. With it, an autocommit stream wraps itself in `BEGIN…COMMIT` unless Prisma itself opened the transaction (`streamWithPortalProtection`). On a client the caller put in `BEGIN`, that wrap would commit the caller's transaction. Leave `cursor` unset (the default).

### 4. Sending outside SQL through Prisma (`tx.raw.sql`)

- API: ``tx.raw.sql`…`.returnsRow({ col: 'pg/int4@1', … }).build()`` returns a plan. `tx.query(plan)` gives rows. ``….affectedCount().build()`` with `tx.execute(plan)` gives `{ affectedRows }`. The same calls work on `db` (queries.md; [raw-query.ts](https://github.com/prisma/orm/blob/v8.0.0-rc.20/packages/2-sql-family/4-lanes/sql-builder/src/types/raw-query.ts)). **[docs][src]**
- Parameters:
  - Interpolations become bound parameters, rendered as `$1…$n`. A non-inferrable type gets a cast appended (`$3::jsonb`) ([sql-renderer.ts](https://github.com/prisma/orm/blob/v8.0.0-rc.20/packages/3-targets/postgres/2-adapter/src/core/sql-renderer.ts) `renderTypedParam`). **[src][ran]**
  - Bare values may only be `number | bigint | string | boolean | Uint8Array`, with the codec inferred (`string` → `pg/text@1`, `bigint` → `pg/int8@1`, …).
  - `null`, `Date` and JSON values need `param(value, { codecId })` from `@prisma/orm-postgres/relational-core/expression`. A bare `Date` throws `RUNTIME.RAW_SQL_UNSUPPORTED_INTERPOLATION`. **[src][ran]**
- There is no `$queryRawUnsafe(text, ...params)` equivalent. The scorecard marks `Prisma.sql`/`join`/`raw`/`empty` and TypedSQL as ❌ ([13-raw-and-typed-sql.md](https://github.com/prisma/orm/blob/v8.0.0-rc.20/scorecard/13-raw-and-typed-sql.md)). **[docs]**
  - The tag does not check that its strings array is a real template literal. Calling it with `Object.assign([...parts], { raw: [...parts] })` and `param(...)` values, split at each `$n`, turned `insert … values ($1, $2, $3) returning id, name, email` into the same SQL. `tx.toSql(plan)` returned the original text and `[10, "ret", "r@x"]`. **[ran]**
  - This works but nothing documents it **[inferred]**: it relies on implementation behaviour.
- `RETURNING` works: an `INSERT … RETURNING` under `.returnsRow` returned the row inside `db.transaction`, and a thrown error rolled it back. **[ran]**
- Row decoding [decoding.ts](https://github.com/prisma/orm/blob/v8.0.0-rc.20/packages/2-sql-family/5-runtime/src/codecs/decoding.ts) **[src][ran]**:
  - Only the columns named in the row spec are returned; any others are dropped.
  - A declared column missing from the result raises `RUNTIME.RAW_ROW_COLUMN_MISSING`.
  - Rows are plain objects. Values observed by codec:

| Codec | JS value |
| --- | --- |
| `pg/int8@1` | `bigint` (9007199254740993 came back exact) |
| `pg/int8number@1` | `number` |
| `pg/numeric@1` | `string` ("1.50") |
| `pg/timestamptz-date@1` | `Date` |
| `pg/timestamptz-temporal@1` | `Temporal.Instant` |
| `pg/timestamptz-string@1` | `string` |
| `pg/jsonb@1` | parsed JSON value |
| `pg/bytea@1` | `Uint8Array` |

- Temporal codecs throw `RUNTIME.TEMPORAL_UNAVAILABLE` unless a global `Temporal` exists. Load `temporal-polyfill/global`, or use the `*-date`/`*-string` codecs **[ran]**. The full codec-to-JS table is in [scalar-types.md](https://github.com/prisma/orm/blob/v8.0.0-rc.20/docs/reference/scalar-types.md). **[docs]**
- Prepared statements: by default the driver uses server-side named statements only for `db.prepare(...)` handles, and retries when a cached plan goes stale. Ad-hoc raw plans are not named. `preparedStatements: false` exists at driver level for transaction-mode PgBouncer (postgres-driver.ts). **[src]**
- The scorecard marks `client.raw` as 🟡 "Untested": reachable, but no integration test proves it yet. **[docs]**

### 5. Raw-SQL facilities for the "ORM raw SQL" Query Layer

- **Prisma 8:**
  - Whole-statement raw SQL: `db.raw.sql` / `tx.raw.sql`.
  - Raw fragments inside builder queries: `fns.raw` / `rawSql` (✅ tested).
  - Reusable statements: `db.prepare(decl, cb)`.
  - TypedSQL (`.sql` files) is "Not implemented" (queries.md). There is no `$queryRaw` family.
  - `db.toSql(plan)` renders SQL and params with no database. A client "loads without a database" ([PR #30802](https://github.com/prisma/orm/pull/30802)). **[docs][src]**
- **Prisma 7** (for users who stay on it) **[docs]**:
  - `$queryRaw`/`$executeRaw` take tagged templates. `$queryRawUnsafe`/`$executeRawUnsafe` take `$1, $2` on PostgreSQL.
  - Mapping: int8 → `BigInt`, numeric → `Decimal`, Json → object, Bytes → `Uint8Array`, DateTime → `Date`.
  - JS integers are sent as `INT8`, Prisma does no implicit casts, and only one statement runs per call ([raw queries v7](https://www.prisma.io/docs/orm/v7/prisma-client/using-raw-sql/raw-queries)).
  - TypedSQL (`prisma generate --sql`, `.sql` files in `prisma/sql`, `$queryRawTyped`) "requires an active database connection". Parameters are typed with `-- @param {Type} $N:alias`, and the "?" suffix marks one optional. Manual types are not supported for array arguments ([TypedSQL v7](https://www.prisma.io/docs/orm/v7/prisma-client/using-raw-sql/typedsql)).
  - Interactive transactions take `maxWait` (2000 ms), `timeout` (5000 ms) and `isolationLevel` ([transactions v7](https://www.prisma.io/docs/orm/v7/prisma-client/queries/transactions)).

### 6. Other load-bearing facts

- **`$extends` is gone** in Prisma 8: result and client components, `$allModels` and `defineExtension` are all ❌ ([18-extensions.md](https://github.com/prisma/orm/blob/v8.0.0-rc.20/scorecard/18-extensions.md)). Cross-cutting behaviour is now `middleware: [...]` with lifecycle hooks, and those hooks also see raw-lane statements (runtime.md). A user's `lints()` middleware may therefore refuse Butter SQL. For example, `deleteWithoutWhere` or `noLimit` set to `'error'` would refuse a `DELETE`/`SELECT` that has no `WHERE`/`LIMIT`. Whether these lints inspect raw-lane SQL text or only builder ASTs is not verified. **[docs]**
- **No Accelerate, and no non-`pg` Postgres transport.** The Postgres runtime always speaks TCP through `pg`, as `pg.Pool` or as a per-request `pg.Client` on serverless/Hyperdrive. Prisma Postgres is reached as ordinary Postgres ([Serverless Deployment Guide](https://github.com/prisma/orm/blob/v8.0.0-rc.20/docs/Serverless%20Deployment%20Guide.md)). **[docs][src]**
- **Schema Owner impact.** Prisma 7's `prisma migrate dev/deploy/status/diff/reset/resolve` now "exit with `CLI.COMMAND_MOVED`" in favour of `prisma migration …` / `prisma db …` (rc.20 notes). Every RC ships breaking changes, each with an upgrade recipe. **[docs]**
- **Reylo** (npm `reylo@0.5.0`, [github.com/colinhacks/reylo](https://github.com/colinhacks/reylo)) is bring-your-own-driver. `query.run(client, params)` takes anything structurally matching `{ query(text, values): PromiseLike<{ rows }> }`: a `pg` Pool, Client or PoolClient, postgres.js, PGlite, a Drizzle db or a Drizzle tx. It has no Prisma integration, and it needs TypeScript 7.1 `contentMappers` plus a live dev DB at typecheck time (README and `src/execute.d.ts` in the tarball). **[src]**

## What this means for Butter

- **The design-doc sentence is half wrong.** Proposed wording for design.md and ADR-0002: "Prisma 8 + Reylo can share the app's `pg.Pool`, because Prisma 8 accepts it via `postgres({ pg: pool })`. Reylo cannot run inside `db.transaction(...)`, because Prisma 8 exposes no driver connection on `tx`. Store operations that must be atomic with app Prisma code use Prisma's raw lane as the Query Layer." Strike the open fact in design.md §"Open facts" ("Whether Prisma 8 exposes its underlying driver…"): as of 8.0.0-rc.20 it does not, inside a transaction.
- **An Adapter for Prisma 8 as the Query Layer ("ORM raw SQL") fits ADR-0002.**
  - Each Store operation's canonical statement becomes a `q.raw.sql` call, where `q` is the `db | tx` the Composition Root passes in. Its `.returnsRow` spec names a codec for each `RETURNING` column, and the rows go straight to Effect Schema at the Port boundary.
  - Pick codecs to match the Schema: `pg/timestamptz-date@1` (or `-string@1`) avoids needing a Temporal polyfill. int8 → `bigint`, numeric → `string`, jsonb → `unknown`. Use `param(v, { codecId })` for `null`, `Date` and JSON.
  - Atomicity with app code: the app calls `db.transaction(async (tx) => { …app…; await auth.session.revoke(id, { via: tx }) })`. The Port then needs an optional "run on this queryable" parameter. That is a Port design question, not a Prisma limitation.
  - The Skill should have the agent write each statement as a literal `` tx.raw.sql`…` `` template. A runtime `$n` splitter works today **[ran]** but uses undocumented behaviour.
  - Invariant/concurrency tests: one statement per Store operation means Prisma's missing isolation-level and savepoint support doesn't matter. No Flow needs a multi-statement transaction owned by Butter.
- **Prisma 8 + Reylo Adapter: three options.**
  1. Shared pool: Reylo `.run(pool)` and `postgres({ pg: pool })`. It works, but auth statements commit on their own.
  2. App-owned transaction: `pool.connect()`, `BEGIN`, Reylo `.run(client)`, and `postgres({ contract, pg: client })` for app work. It works only if that scoped client never calls `.transaction()` and never runs ORM writes that open their own transaction (single-row update/delete, nested writes), and `cursor` stays unset **[ran]**. Too fragile to recommend as an Invariant-backed Adapter. At most, document it as an escape hatch for SQL-builder and raw-lane code.
  3. Inside `db.transaction`, run Reylo statements through `tx.raw` with a shim that implements Reylo's `{ query(text, values) }` client on top of `tx`. I have not built this **[inferred]**. Each column would need a Prisma codec chosen from Reylo's column kinds, and Reylo's runtime decoder would then receive Prisma-decoded values, not `pg`-parsed ones. Not recommended without a prototype.
- **Prisma 7 users (likely the majority until 8.0.0 ships plus a migration window).** The same conclusion holds there: `PrismaPg` takes the user's `pg.Pool`, but `tx` exposes no connection, so the raw-SQL route is `tx.$queryRawUnsafe(sql, ...params)` with `$1…$n`. That is the closest match to canonical SQL. Rows decode to `BigInt`/`Decimal`/`Date`/object/`Uint8Array`, which the Port-boundary Effect Schemas must accept.

## Open / unverified

- The 8.x API is an RC, and every RC so far has shipped breaking changes. Re-check `db.raw.sql`, the `pg:` binding and the members of `tx` at `8.0.0` final.
- Not tested: whether ORM single-row `create`, `first` and `all` stay inside an external transaction on a `PoolClient` binding. runtime.md says they use the connection directly. Only update was tested (it escaped). The per-transaction cost of constructing `postgres()` was not measured.
- The `client.raw` lane is 🟡 in Prisma's scorecard. The calls I ran worked, but upstream has no integration test for it.
- Whether `lints()`/`budgets()` middleware inspects raw-lane SQL text (and so might refuse a Butter statement) was not checked.
- `verifyMarker` defaults to running a marker check on first use. It runs inside whatever connection is bound. I disabled it in tests and did not check its effect inside an external transaction.
- Reylo-through-`tx.raw` shim: not prototyped. Reylo's decoding of `pg` values was not examined.
- `@prisma/adapter-pg` has a `dev` dist-tag of `8.1.0-dev.9` even though Prisma 8 has no driver adapters. I did not investigate what it is.
- Prisma 7 type mapping is from the generic docs table. It was not re-verified against `@prisma/adapter-pg@7.10.1` for numeric and timestamptz.
