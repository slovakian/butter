# Can PGlite exercise concurrency Invariants for real?

Research for slovakian/butter#23 (map: #5). Sources accessed 2026-10-24. Versions: `@electric-sql/pglite` 0.5.11 (Postgres 18.6 inside), `@electric-sql/pglite-socket` 0.2.14, `pg` 8.23.1, real Postgres 14.19 (Homebrew) and 18.4 (`embedded-postgres` 18.4.0-beta.17), Node 24.22.1 on macOS arm64. PGlite source read at commit [`e752dbe`](https://github.com/electric-sql/pglite/tree/e752dbe0a550ee74e5e175ae799e556758201682) (main, 2026-10-23).

## Question

The design tests concurrency Invariants (e.g. "verification codes are single-use": two simultaneous consumptions of one code must not both succeed) on PGlite. Can PGlite run interleaved transactions, so that a race in a user-written Adapter actually shows up? If not, what can, and at what cost to CI speed and to running the same tests in developer repos?

## Answer

**No, not for the race that matters most.** PGlite is one Postgres backend in single-user mode, and every transaction takes an exclusive mutex. So two transactions never overlap. pglite-socket's multi-connection mode multiplexes onto that same session and pins it to whichever connection has a transaction open. The upshot, measured below:

| Adapter for "consume this verification code" | In-process PGlite | pglite-socket (32 conns) | Real Postgres |
| --- | --- | --- | --- |
| A1 read, then write, as two autocommit statements (buggy) | **caught** (200/200) | **caught** (199/200) | caught |
| A2 read, then write, inside one transaction (buggy) | **missed** (0/200) | **missed** (0/200) | **caught** (200/200) |
| A3 `SELECT … FOR UPDATE`, then write, in a transaction (correct) | passes | passes | passes |
| A4 one atomic `UPDATE … WHERE consumed_at IS NULL RETURNING` (correct, canonical) | passes | passes | passes |

PGlite catches races *between statements* (A1), because each statement takes the mutex separately and the event loop interleaves them. It hides races *inside transactions* (A2), because the second transaction waits for the first to commit. On a real server, at READ COMMITTED, both A2 transactions read the unconsumed row, and both update it. A2 is the most plausible way an agent "makes it safe" when it breaks the canonical single statement into steps, and PGlite gives it a false pass. A false pass on a shipped Invariant is worse than having no test.

**What works: a real, multi-session Postgres, plus a lock barrier for determinism.** On real Postgres a plain `Promise.all` race already exposed A1 and A2 in 99–100% of trials locally, but that is timing-dependent. A barrier makes it deterministic. A third session takes `LOCK TABLE … IN EXCLUSIVE MODE`, which allows plain `SELECT` but blocks every write and every `FOR UPDATE`. It waits until `pg_locks` shows all N consumers blocked, then commits. That forces the worst-case interleaving every time: A1 and A2 failed 200/200 and A3 and A4 passed 200/200, on both PG 14 and PG 18. It costs about 2–15 ms per trial. It cannot work on PGlite or pglite-socket, because the holder's open transaction pins the only session (the barrier was never reached: 0/3).

## 1. Why PGlite serialises (sources)

- **Single-user mode.** PGlite starts Postgres with `--single` ([pglite.ts L150](https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/packages/pglite/src/pglite.ts#L150)). Postgres's own docs say of single-user mode: "no realistic interprocess communication and locking will happen" ([postgres(1), PG 18](https://www.postgresql.org/docs/current/app-postgres.html)). PGlite's README: "PGlite is single user/connection" ([README](https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/README.md)).
- **Every transaction is exclusive.** `query()` and `exec()` run inside `_runExclusiveTransaction` "to ensure that only one query can be executed at a time and not concurrently with a transaction". `transaction()` holds that same mutex from `BEGIN` to `COMMIT`/`ROLLBACK` ([base.ts `query`/`exec`/`transaction`](https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/packages/pglite/src/base.ts#L192-L530); the mutexes are `async-mutex` instances in [pglite.ts L96-L97](https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/packages/pglite/src/pglite.ts#L96-L97)). A second `db.transaction()` therefore waits for the first to finish, and nothing inside the two can interleave.
- **Consequences on real-Postgres behaviour.** With only one session, these never happen: a row-lock wait, READ COMMITTED's re-check of the `WHERE` clause after a concurrent update, a deadlock, or a serialization failure (`40001`). A user [found this in 2024](https://github.com/electric-sql/pglite/issues/267) ("Isolation level / SELECT FOR UPDATE not working?"; closed by the reporter: "pglite doesn't have multiple connections / concurrency, so I am actually in a single transaction").
- **pglite-socket's multiplexer is the same session.** The `QueryQueueManager` queues messages from all connections onto one PGlite. While `db.isInTransaction()` is true, it only dequeues from the connection that opened the transaction ([pglite-socket index.ts L72-L131](https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/packages/pglite-socket/src/index.ts#L72-L131)). `maxConnections` defaults to 1 ([L623](https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/packages/pglite-socket/src/index.ts#L623)). Upstream docs: "PGlite is a single-connection database … multiplexer … not all use cases are guaranteed to work" ([pglite-socket README](https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/packages/pglite-socket/README.md)). In [#1046](https://github.com/electric-sql/pglite/issues/1046) (open), a maintainer (tdrz) confirms that a second connection's `SELECT 2` "hangs … because there is an ongoing transaction on the other connection" until it commits. The same issue reports that extended-protocol batches from two connections can interleave outside a transaction and clobber the unnamed prepared statement. [#985](https://github.com/electric-sql/pglite/issues/985) (open) reports that the queue deadlocks when a handler disconnects mid-transaction. In my runs, `pg` through the multiplexer produced no errors at 2 or 8 consumers, but upstream doesn't guarantee that.
- **`@electric-sql/pglite-node-postgres`** (new, "EXPERIMENTAL") gives `pg.Pool` an in-process PGlite, but hard-codes `poolSize = 1 // PGlite is single connection at the moment` ([source](https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/packages/pglite-node-postgres/src/pglite-node-postgres.ts)). It doesn't change the picture.

## 2. Why real Postgres catches A2, and why the barrier is deterministic (sources)

- **READ COMMITTED (Postgres's default).** "UPDATE, DELETE, SELECT FOR UPDATE … will only find target rows that were committed as of the command start time … the would-be updater will wait for the first updating transaction to commit … The search condition of the command (the WHERE clause) is re-evaluated to see if the updated version of the row still matches" ([13.2.1, PG 18](https://www.postgresql.org/docs/current/transaction-iso.html)).
  - A4 re-checks `consumed_at IS NULL` and gets 0 rows, so it's correct.
  - A3's `FOR UPDATE` returns the updated row, so it's correct.
  - A2's earlier plain `SELECT` already said "unconsumed", and its `UPDATE … WHERE id = $1` still matches, so both succeed.
- **The barrier's lock mode.** `EXCLUSIVE` "allows only concurrent ACCESS SHARE locks, i.e., only reads from the table can proceed in parallel". `UPDATE`/`DELETE`/`INSERT`/`MERGE` take ROW EXCLUSIVE, and `SELECT … FOR UPDATE` takes ROW SHARE, both of which conflict with it ([13.3.1, PG 18](https://www.postgresql.org/docs/current/explicit-locking.html)). So every consumer gets through its reads and parks at its first write or locking read. The harness polls `pg_locks WHERE NOT granted` until all N are parked, then releases. This is the worst case for any read-then-write Adapter, without instrumenting the Adapter.

## 3. Experiment

The code is in [`pglite-concurrency-experiment/`](./pglite-concurrency-experiment/) (throwaway). `race.mjs` has the four Adapters, written against a minimal `{ query, transaction }` shape, and three backends:

- `pglite`: `db.query`/`db.transaction`;
- `socket`: `PGLiteSocketServer` with `maxConnections: 32` and a `pg.Pool`;
- `postgres`: `pg.Pool` to `$DATABASE_URL`.

There are two modes, `naive` (`Promise.all`) and `barrier`. `start-postgres.sh` starts a throwaway cluster from local binaries. `embedded.mjs` times `embedded-postgres` and runs the race against it. Run `npm install`, then `node race.mjs pglite|socket|postgres [naive,barrier]` (env `TRIALS`, `CONSUMERS`).

Results, 2 consumers × 200 trials (8 consumers × 100 trials gave the same pattern):

| Backend / mode | A1 (buggy) | A2 (buggy) | A3 | A4 | ms/trial |
| --- | --- | --- | --- | --- | --- |
| PGlite in-process, naive | 200/200 | **0/200** | 0 | 0 | 0.3–0.6 |
| pglite-socket, naive | 199/200 | **0/200** | 0 | 0 | 0.2–0.5 |
| pglite-socket, barrier | barrier never reached (0/3): the holder pins the session | | | | 2000 (timeout) |
| PG 14.19, naive | 199/200 | 200/200 | 0 | 0 | 0.1–0.2 |
| PG 14.19, barrier | **200/200** | **200/200** | 0 | 0 | 2.0–2.3 |
| PG 18.4 (embedded-postgres), barrier, 100 trials | 100/100 | 100/100 | 0 | 0 | ~14 |

The naive real-Postgres race missed A1 once in 200 here. On a loaded CI runner, or with a heavier ORM between the statements, the miss rate is unknown. That's why the barrier matters: it makes the result deterministic, which matches the design's "CI (every push, deterministic)".

Startup and size, measured on this machine:

| Option | Cold start | Notes |
| --- | --- | --- |
| `PGlite.create()` | 0.65–0.72 s per instance | 27 MB in `node_modules` |
| Local `initdb` + `pg_ctl start` (PG 14) | ~1.0 s | needs Postgres binaries installed |
| `embedded-postgres` 18.4 | 0.39 s `initialise` + 0.04 s start (warm); 9.3 s on the very first run on macOS (one-off, likely first-exec verification of the new binaries) | 144 MB platform package; needs its postinstall approved under pnpm (README); every release is tagged `-beta` (`latest` = `18.4.0-beta.17`, 2026-06-05); MIT; ~843k downloads/week |
| Docker (`@testcontainers/postgresql` 12.2.1, or a GitHub Actions service container) | not measured (Docker daemon not running here) | needs Docker; Actions service containers are Linux-runner only ([GitHub docs](https://docs.github.com/en/actions/tutorials/use-containerized-services/create-postgresql-service-containers)); Testcontainers has `snapshot()`/`restoreSnapshot()` for fast resets ([docs](https://node.testcontainers.org/modules/postgresql/)) |

## 4. Implications for Butter (my inference, not sourced fact)

- **Split the Invariant suite by what the database must prove.**
  - Sequential Invariants (a consumed code fails the second time, expiry, hashing, binding to one User) can stay on PGlite: fast, and no Docker.
  - Concurrency Invariants must run on a multi-session Postgres. On PGlite, a concurrency Invariant test should **not pass at all**. It should fail or refuse to run, so that no Acceptance Check goes green on a backend that can't see the race.
- **Ship a lock-barrier helper with the concurrency Invariant tests.** It needs to know which tables to lock. The Rename Map gives the renamed canonical tables, but Adapters may use other layouts ("Pilcrow-style columns on the user table are an equally valid Adapter layout"). So the simplest general rule is to lock every table in the auth schema in `EXCLUSIVE` mode, with `lock_timeout` set so a test can never hang. It also needs the Adapter's pool to have at least N connections. A pool of `max: 1` serialises in the app and hides the race, even though production with several instances would still race. The test seam must let the test give the Adapter a multi-connection client.
- **Butter's CI:** a `postgres:18` service container on GitHub Actions (Linux), or `embedded-postgres`, for the concurrency job only. The design's "Invariant tests against reference Adapters on PGlite" stays true only for the sequential tier.
- **Developer repos:** every Butter user already runs Postgres, because the canonical SQL is Postgres. So the natural default is a test `DATABASE_URL` aimed at their dev or test Postgres. Their real driver config works unchanged, which also avoids having to point Prisma or `pg` Adapters at PGlite. `embedded-postgres` (no Docker, perpetual beta, 144 MB) or Testcontainers (Docker) can be the fallback when no database is available. The Setup Prompt and Reconcile need a Setup Task for "a test Postgres is reachable", and the Manifest should record which option was chosen (never the secret).
- **Agent Evals and the Grader** need the same real Postgres in the Fixture's worktree or container. Otherwise an agent's A2-shaped Adapter passes grading.
- **This strengthens ADR-0002's single-statement rule.** Run on real Postgres with the barrier, the tests accept both correct shapes, A3 and A4. So the Invariant really checks the property, not the SQL shape.

## What remains unverified

- Docker or Testcontainers startup time and the GitHub Actions service-container cold start (no Docker daemon here).
- Behaviour through real ORMs: Drizzle on `pg`, Prisma 8 interactive transactions, and Reylo's `.run(tx)`. The four Adapters used raw `pg`. ORMs add awaits between statements, which only widens the window, but I didn't test that.
- Parallel Vitest workers against one real server: isolation per worker, such as a database per worker cloned from a template, and its cost.
- Races that span two tables or two Store operations, such as rate-limit counters next to credential checks. The barrier logic generalises, but I only tested one table.
- Whether isolation levels stricter than READ COMMITTED, if a user sets them, need retry handling in the Invariant tests. On real Postgres A2 would then fail with `40001`, not double-consume.

## Sources

1. https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/packages/pglite/src/pglite.ts (L96-L97 mutexes, L150 `--single`, L1142 `isInTransaction`)
2. https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/packages/pglite/src/base.ts (`query`, `exec`, `transaction` take the transaction mutex)
3. https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/packages/pglite-socket/src/index.ts (`QueryQueueManager`, transaction affinity, `maxConnections ?? 1`)
4. https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/packages/pglite-socket/README.md and https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/README.md
5. https://github.com/electric-sql/pglite/blob/e752dbe0a550ee74e5e175ae799e556758201682/packages/pglite-node-postgres/src/pglite-node-postgres.ts
6. https://github.com/electric-sql/pglite/issues/267 (closed; last updated 2025-03-10), https://github.com/electric-sql/pglite/issues/1046 (open, last updated 2026-07-11), https://github.com/electric-sql/pglite/issues/985 (open)
7. https://www.postgresql.org/docs/current/app-postgres.html (single-user mode, PG 18.6 docs)
8. https://www.postgresql.org/docs/current/transaction-iso.html (13.2.1 Read Committed)
9. https://www.postgresql.org/docs/current/explicit-locking.html (13.3.1 table-level lock modes)
10. https://github.com/leinelissen/embedded-postgres (README in the 18.4.0-beta.17 tarball; repo last pushed 2026-06-05)
11. https://node.testcontainers.org/modules/postgresql/ (`@testcontainers/postgresql` 12.2.1, 2026-10-13)
12. https://docs.github.com/en/actions/tutorials/use-containerized-services/create-postgresql-service-containers
13. npm registry (`npm view`) and https://api.npmjs.org/downloads (week 2026-10-16 to 2026-10-22): pglite 17.1M, @testcontainers/postgresql 2.8M, embedded-postgres 843k
14. Experiment in [`pglite-concurrency-experiment/`](./pglite-concurrency-experiment/), run on 2026-10-24
