# PROTOTYPE (throwaway): walking skeleton for the sessions Slice

For [Prototype: walking skeleton for the sessions Slice](https://github.com/slovakian/butter/issues/14). Never merged.

Versions: `effect@4.0.6`, `@electric-sql/pglite@0.5.11`, `vitest@3.2.7`, `typescript@5.9.3`, `Node 24.22.1`.

```sh
pnpm install
npx tsc -p .                              # Strict TypeScript typecheck (0 errors)
npx vitest run --config vitest.config.ts  # All 8 Flow Invariant tests pass on PGlite
npx tsx src/date-decoding-check.ts        # Empirical proof of driver date decoding
```

## Layout

- `src/primitives/token.ts`: pure primitives for unguessable bearer tokens (`id.secret` per Pilcrow), SHA-256 hashing, and constant-time comparison via `node:crypto.timingSafeEqual`.
- `src/sql/*.sql`: canonical Postgres statements (atomic per operation) rendered under the Rename Map (`logins` table):
  - `schema.sql`: tables and index (`logins`, foreign-keyed to `users`)
  - `insert_login.sql`: atomic insert returning created row
  - `get_login_with_user.sql`: single-statement join returning login credentials and user fields
  - `touch_login.sql`: atomic update of expiry timestamp for sliding window refresh
  - `delete_login.sql`: single-device revocation
  - `delete_user_logins.sql`: all-device revocation for a user
- `src/ports/login-store.ts`: Port interface `LoginStore` (`Context.Service<LoginStore, LoginStoreService>`), row schemas with flexible timestamp decoding, and domain entities (`Login`, `User`, `LoginWithUser`).
- `src/adapters/pglite-login-store.ts`: reference Adapter fulfilling `LoginStore` on PGlite using canonical SQL statements and decoding rows via Effect Schema at the Port boundary.
- `src/flows/login-flows.ts`: Flows written in Effect v4 against `LoginStore` (`createLogin`, `validateLogin` with 30-day sliding expiry refreshed within 15-day threshold, `revokeLogin`, `revokeAllUserLogins`).
- `src/composition/root.ts`: Composition Root assembling the Slice into the `Auth` service (`exposable.login` and `internal.login`) as an unfinished Layer via `composeAuth`.
- `tests/login-invariant.test.ts`: Vitest test suite asserting all 8 Flow Invariants through the `Auth` Effect API on PGlite.
- `src/date-decoding-check.ts`: isolated test demonstrating the `Schema.Date` vs `Schema.DateFromString` driver mismatch and its resolution.

---

## Results & Findings

### 1. Delivery Model & Rename Map: Holds Up Completely

- Under a Rename Map where `Session` is renamed to `Login`:
  - Storage table is `logins` (never `sessions`).
  - Port is `LoginStore` (never `SessionStore`).
  - Domain entity is `Login` (never `Session`).
  - Folders and API structure follow the rename: `auth.exposable.login` and `auth.internal.login`.
  - Protocol Vocabulary stays on spec: token generation (`id.secret`), SHA-256 hash, and constant-time verification remain unchanged, anchoring to Pilcrow's Auth Book.
- All 8 Flow Invariants pass on PGlite through the Effect `Auth` service with zero leaks of the word "session" in public types or tables.

### 2. Port Shape: Operation-Shaped Beats CRUD

- CRUD operations (`find` + `delete` or `find` + `update`) create multi-query Flow races.
- The operation-shaped Port contract maps directly to atomic SQL:
  - `create`: 1 query (`insert_login.sql` returning row)
  - `findWithUser`: 1 query joining `logins` and `users` (`get_login_with_user.sql`)
  - `touch`: 1 query (`touch_login.sql`)
  - `revoke`: 1 query (`delete_login.sql`)
  - `revokeAllForUser`: 1 query (`delete_user_logins.sql`)
- This makes concurrency and consistency guarantees inherent to the Adapter's SQL rather than dependent on application coordination.

### 3. Effect Schema Decoding at the Port Boundary: The Timestamp Trap

- **The Driver Discrepancy**:
  - PGlite (and `pg` with default parsers) returns native JavaScript `Date` instances for `TIMESTAMPTZ` columns (`typeof === "object"`, `instanceof Date === true`).
  - In contrast, Reylo (as documented in research ticket #18) and SQLite return ISO strings (never `Date`).
- **The Schema Failure**:
  - `Schema.Date` succeeds on PGlite, but throws `Expected Date` on Reylo/SQLite.
  - `Schema.DateFromString` succeeds on Reylo, but throws `Expected string, actual Date` on PGlite.
- **The Solution**:
  - At the Port boundary, timestamp decoders must be defined as `Schema.Union([Schema.Date, Schema.DateFromString])`.
  - This transparently decodes either native `Date` objects or ISO strings into a standard JavaScript `Date` instance.
  - **Effect v4 Syntax Note**: In Effect v4.0.6, `Schema.Union` requires an array `Schema.Union([A, B])` rather than variadic arguments `Schema.Union(A, B)`.

### 4. Test Seam Ergonomics: Clean and Reliable

- Flow Invariant tests interact exclusively with `Auth.exposable.login` and `Auth.internal.login`.
- Flow errors (`InvalidTokenError`, `StoreError`) are strongly typed Tagged Errors. In tests, `Effect.exit` inspects failure causes without unhandled rejections.
- Tests run against in-memory PGlite in ~4 seconds with complete isolation and zero external database dependencies.
