# Canonical SQL is the data contract; ORMs are supported through SQL and Skills, not adapter code

Butter does not ship per-ORM adapter code. Every Store operation is defined in its Port as one atomic operation and ships as one canonical Postgres statement, rendered with the user's Rename Map. The Schema Owner (Prisma 8, Drizzle, or plain SQL migrations) and the Query Layer (Reylo, the ORM's raw SQL, or the ORM's query API) are independent choices; Reylo is the default Query Layer and never required. Correctness is enforced by Invariant tests, including concurrency checks, and by decoding rows with Effect Schema at the Port boundary, so it does not depend on which Query Layer the user picks.

## Considered Options

- Per-ORM adapter code (the Better Auth approach): rejected because it multiplies shipped code per ORM and recreates a central adapter abstraction.
- Reylo as the only Query Layer: rejected because most users already have an ORM and should be able to keep it.
- CRUD-shaped Ports (`find` + `delete`): rejected because they force multi-query Flows with races between them, wasting what raw SQL does best and making security Invariants depend on the Adapter author's care.

## Consequences

- Prisma 8 + Reylo runs Reylo on a separate `pg` pool, so auth queries cannot share a transaction with the app's Prisma code unless Prisma 8 exposes its driver. Drizzle + Reylo has no such limit.
- Users who need a fused operation (e.g. validate session and load membership in one query) add a new Port operation with its own SQL.
- Supporting another ORM means writing a Skill section, not code.
