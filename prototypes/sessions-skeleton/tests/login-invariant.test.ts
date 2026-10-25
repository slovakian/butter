import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { PGlite } from "@electric-sql/pglite";
import { Effect, Exit } from "effect";
import { Auth, composeAuth, loginSlice } from "../src/composition/root.ts";

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS logins (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS logins_user_id_idx ON logins(user_id);
`.trim();

describe("Flow Invariants: Login Slice (Session renamed to Login)", () => {
  let db: PGlite;
  let authLayer: ReturnType<typeof composeAuth>;

  beforeEach(async () => {
    db = new PGlite();
    await db.exec(SCHEMA_SQL);
    await db.query("INSERT INTO users (id, email) VALUES ($1, $2)", [
      "user_1",
      "alice@example.com",
    ]);
    await db.query("INSERT INTO users (id, email) VALUES ($1, $2)", [
      "user_2",
      "bob@example.com",
    ]);

    authLayer = composeAuth({
      queryable: db,
      slices: [loginSlice()],
    });
  });

  it("Invariant: creating a login issues an authenticating token", async () => {
    const program = Effect.gen(function* () {
      const auth = yield* Auth;
      const created = yield* auth.internal.login.create("user_1");
      assert.match(created.token, /^[a-f0-9]{32}\.[a-zA-Z0-9_-]{43}$/);
      assert.strictEqual(created.login.userId, "user_1");

      const validated = yield* auth.exposable.login.validate(created.token);
      assert.strictEqual(validated.login.id, created.login.id);
      assert.strictEqual(validated.login.userId, "user_1");
      assert.strictEqual(validated.user.id, "user_1");
      assert.strictEqual(validated.user.email, "alice@example.com");
      assert.ok(validated.login.expiresAt instanceof Date);
      return validated;
    });

    const result = await Effect.runPromise(program.pipe(Effect.provide(authLayer)));
    assert.strictEqual(result.user.email, "alice@example.com");
  });

  it("Invariant: revoking a login permanently invalidates the token", async () => {
    const program = Effect.gen(function* () {
      const auth = yield* Auth;
      const created = yield* auth.internal.login.create("user_1");

      // Verify valid
      yield* auth.exposable.login.validate(created.token);

      // Revoke
      yield* auth.exposable.login.revoke(created.token);

      // Second validate must fail
      const exit = yield* Effect.exit(auth.exposable.login.validate(created.token));
      return exit;
    });

    const exit = await Effect.runPromise(program.pipe(Effect.provide(authLayer)));
    assert.ok(Exit.isFailure(exit));
    if (Exit.isFailure(exit)) {
      const defectOrError = exit.cause;
      assert.ok(defectOrError.toString().includes("InvalidTokenError"));
    }
  });

  it("Invariant: revokeAll revokes every login for the target user only", async () => {
    const program = Effect.gen(function* () {
      const auth = yield* Auth;
      const loginA1 = yield* auth.internal.login.create("user_1");
      const loginA2 = yield* auth.internal.login.create("user_1");
      const loginB = yield* auth.internal.login.create("user_2");

      // Revoke all for user_1
      yield* auth.internal.login.revokeAll("user_1");

      const exitA1 = yield* Effect.exit(auth.exposable.login.validate(loginA1.token));
      const exitA2 = yield* Effect.exit(auth.exposable.login.validate(loginA2.token));
      const exitB = yield* Effect.exit(auth.exposable.login.validate(loginB.token));

      return { exitA1, exitA2, exitB };
    });

    const { exitA1, exitA2, exitB } = await Effect.runPromise(
      program.pipe(Effect.provide(authLayer))
    );
    assert.ok(Exit.isFailure(exitA1));
    assert.ok(Exit.isFailure(exitA2));
    assert.ok(Exit.isSuccess(exitB));
  });

  it("Invariant: expired logins are rejected and cleaned up from storage", async () => {
    const program = Effect.gen(function* () {
      const auth = yield* Auth;
      // 10 ms maxAge
      const created = yield* auth.internal.login.create("user_1", {
        maxAgeMs: 10,
      });

      // Simulate validating in the future (5 seconds later)
      const futureDate = new Date(Date.now() + 5000);
      const exit = yield* Effect.exit(
        auth.exposable.login.validate(created.token, { now: futureDate })
      );

      return { exit, loginId: created.login.id };
    });

    const { exit, loginId } = await Effect.runPromise(
      program.pipe(Effect.provide(authLayer))
    );
    assert.ok(Exit.isFailure(exit));

    // Verify row was deleted from PGlite
    const dbRows = await db.query("SELECT * FROM logins WHERE id = $1", [loginId]);
    assert.strictEqual(dbRows.rows.length, 0);
  });

  it("Invariant: tampered secret in bearer token fails validation", async () => {
    const program = Effect.gen(function* () {
      const auth = yield* Auth;
      const created = yield* auth.internal.login.create("user_1");

      const [id] = created.token.split(".");
      // Tamper with the secret part
      const fakeSecret = "A".repeat(43);
      const tamperedToken = `${id}.${fakeSecret}`;

      const exit = yield* Effect.exit(auth.exposable.login.validate(tamperedToken));
      return exit;
    });

    const exit = await Effect.runPromise(program.pipe(Effect.provide(authLayer)));
    assert.ok(Exit.isFailure(exit));
  });

  it("Invariant: malformed token string is rejected immediately", async () => {
    const program = Effect.gen(function* () {
      const auth = yield* Auth;
      const exit1 = yield* Effect.exit(auth.exposable.login.validate("not-a-token"));
      const exit2 = yield* Effect.exit(auth.exposable.login.validate(""));
      const exit3 = yield* Effect.exit(auth.exposable.login.validate(".onlysecret"));
      return { exit1, exit2, exit3 };
    });

    const { exit1, exit2, exit3 } = await Effect.runPromise(
      program.pipe(Effect.provide(authLayer))
    );
    assert.ok(Exit.isFailure(exit1));
    assert.ok(Exit.isFailure(exit2));
    assert.ok(Exit.isFailure(exit3));
  });

  it("Invariant: sliding window extends expiry when within refresh threshold", async () => {
    const program = Effect.gen(function* () {
      const auth = yield* Auth;
      const created = yield* auth.internal.login.create("user_1");
      const initialExpiresAt = created.login.expiresAt;

      // Advance time by 20 days (out of 30 days total, leaving 10 days remaining: within 15 day threshold)
      const twentyDaysLater = new Date(Date.now() + 20 * 24 * 60 * 60 * 1000);
      const validated = yield* auth.exposable.login.validate(created.token, {
        now: twentyDaysLater,
      });

      // Expiry should have been slid forward to twentyDaysLater + 30 days
      assert.ok(validated.login.expiresAt.getTime() > initialExpiresAt.getTime());
      const expectedNewExpiry = twentyDaysLater.getTime() + 30 * 24 * 60 * 60 * 1000;
      assert.ok(
        Math.abs(validated.login.expiresAt.getTime() - expectedNewExpiry) < 1000
      );

      return validated;
    });

    await Effect.runPromise(program.pipe(Effect.provide(authLayer)));
  });

  it("Delivery Model: Rename Map holds cleanly with no domain leakage", async () => {
    const program = Effect.gen(function* () {
      const auth = yield* Auth;

      // The API is under 'login', NOT 'session'
      assert.strictEqual((auth.exposable as any).session, undefined);
      assert.ok(auth.exposable.login !== undefined);
      assert.strictEqual((auth.internal as any).session, undefined);
      assert.ok(auth.internal.login !== undefined);
    });

    await Effect.runPromise(program.pipe(Effect.provide(authLayer)));

    // Database tables reflect the rename
    const tableCheck = await db.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    const tableNames = tableCheck.rows.map((r: any) => r.table_name);
    assert.ok(tableNames.includes("logins"));
    assert.ok(!tableNames.includes("sessions"));
  });
});
