// Throwaway experiment for slovakian/butter#23.
//
// Four Adapters for one Store operation, "consume this verification code",
// raced against each other on three backends:
//
//   node race.mjs pglite            in-process PGlite (db.query / db.transaction)
//   node race.mjs socket            PGlite behind PGLiteSocketServer, pg.Pool over TCP
//   node race.mjs postgres          real Postgres at $DATABASE_URL, pg.Pool
//
// Each trial inserts one unconsumed code, fires CONSUMERS concurrent
// consumptions, and counts how many reported success. More than one success
// is the Invariant violation ("verification codes are single-use").
//
// Two race modes:
//   naive    Promise.all of the consumers, no coordination (what a plain test does)
//   barrier  a holder session takes LOCK TABLE ... IN EXCLUSIVE MODE (blocks
//            writes and locking reads, allows plain SELECT), waits until every
//            consumer is blocked in pg_locks, then commits. This forces the
//            worst-case interleaving for read-then-write Adapters, deterministically.

import { PGlite } from "@electric-sql/pglite";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";
import pg from "pg";

const TRIALS = Number(process.env.TRIALS ?? 200);
const CONSUMERS = Number(process.env.CONSUMERS ?? 2);
const BARRIER_TIMEOUT_MS = 2000;

const SCHEMA = `
  DROP TABLE IF EXISTS verification_codes;
  CREATE TABLE verification_codes (
    id integer PRIMARY KEY,
    consumed_at timestamptz
  );
`;

// ---------- Adapters (what a user's agent might write) ----------

const adapters = {
  "A1 read-then-write, autocommit (buggy)": async (db, id) => {
    const { rows } = await db.query(
      "SELECT consumed_at FROM verification_codes WHERE id = $1",
      [id],
    );
    if (rows.length === 0 || rows[0].consumed_at !== null) return false;
    await db.query("UPDATE verification_codes SET consumed_at = now() WHERE id = $1", [id]);
    return true;
  },
  "A2 read-then-write in a transaction (buggy)": (db, id) =>
    db.transaction(async (tx) => {
      const { rows } = await tx.query(
        "SELECT consumed_at FROM verification_codes WHERE id = $1",
        [id],
      );
      if (rows.length === 0 || rows[0].consumed_at !== null) return false;
      await tx.query("UPDATE verification_codes SET consumed_at = now() WHERE id = $1", [id]);
      return true;
    }),
  "A3 SELECT ... FOR UPDATE in a transaction (correct)": (db, id) =>
    db.transaction(async (tx) => {
      const { rows } = await tx.query(
        "SELECT consumed_at FROM verification_codes WHERE id = $1 FOR UPDATE",
        [id],
      );
      if (rows.length === 0 || rows[0].consumed_at !== null) return false;
      await tx.query("UPDATE verification_codes SET consumed_at = now() WHERE id = $1", [id]);
      return true;
    }),
  "A4 one atomic UPDATE ... RETURNING (correct, Butter's canonical shape)": async (db, id) => {
    const { rows } = await db.query(
      "UPDATE verification_codes SET consumed_at = now() WHERE id = $1 AND consumed_at IS NULL RETURNING id",
      [id],
    );
    return rows.length === 1;
  },
};

// ---------- Backends, normalised to { query, transaction, holder?, close } ----------

const fromPool = (pool) => ({
  query: (text, params) => pool.query(text, params),
  transaction: async (fn) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await fn({ query: (t, p) => client.query(t, p) });
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK").catch(() => {});
      throw error;
    } finally {
      client.release();
    }
  },
  holder: async () => {
    const client = new pg.Client(pool.options);
    await client.connect();
    return client;
  },
  close: () => pool.end(),
});

const backends = {
  pglite: async () => {
    const db = await PGlite.create();
    return {
      query: (text, params) => db.query(text, params),
      transaction: (fn) => db.transaction((tx) => fn({ query: (t, p) => tx.query(t, p) })),
      holder: null, // one session only: there is no second session to hold a lock from
      close: () => db.close(),
      exec: (sql) => db.exec(sql),
    };
  },
  socket: async () => {
    const db = await PGlite.create();
    const server = new PGLiteSocketServer({ db, host: "127.0.0.1", port: 0, maxConnections: 32 });
    await server.start();
    const port = Number(server.getServerConn().split(":").pop());
    const pool = new pg.Pool({
      host: "127.0.0.1",
      port,
      user: "postgres",
      database: "postgres",
      max: CONSUMERS + 1,
    });
    const backend = fromPool(pool);
    return {
      ...backend,
      close: async () => {
        await pool.end();
        await server.stop();
        await db.close();
      },
      exec: (sql) => pool.query(sql),
    };
  },
  postgres: async () => {
    const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: CONSUMERS + 1 });
    return { ...fromPool(pool), exec: (sql) => pool.query(sql) };
  },
};

// ---------- Race modes ----------

const raceNaive = async (backend, adapter, id) =>
  Promise.allSettled(Array.from({ length: CONSUMERS }, () => adapter(backend, id)));

const raceBarrier = async (backend, adapter, id) => {
  const holder = await backend.holder();
  try {
    await holder.query("BEGIN");
    await holder.query("LOCK TABLE verification_codes IN EXCLUSIVE MODE");
    const consumers = Array.from({ length: CONSUMERS }, () => adapter(backend, id));
    const deadline = Date.now() + BARRIER_TIMEOUT_MS;
    let reached = false;
    while (Date.now() < deadline) {
      const { rows } = await holder.query(
        "SELECT count(*)::int AS n FROM pg_locks WHERE NOT granted AND relation = 'verification_codes'::regclass",
      );
      if (rows[0].n >= CONSUMERS) {
        reached = true;
        break;
      }
      await new Promise((r) => setTimeout(r, 2));
    }
    await holder.query("COMMIT");
    const results = await Promise.allSettled(consumers);
    return Object.assign(results, { reached });
  } finally {
    await holder.end();
  }
};

// ---------- Main ----------

const backendName = process.argv[2];
const modes = (process.argv[3] ?? "naive,barrier").split(",");
if (!backends[backendName]) {
  console.error("usage: node race.mjs pglite|socket|postgres [naive,barrier]");
  process.exit(2);
}

const t0 = performance.now();
const backend = await backends[backendName]();
await backend.exec(SCHEMA);
console.log(
  `backend=${backendName} consumers=${CONSUMERS} trials=${TRIALS} ready in ${(performance.now() - t0).toFixed(0)} ms`,
);

for (const mode of modes) {
  if (mode === "barrier" && !backend.holder) {
    console.log(`\n[${mode}] skipped: in-process PGlite has a single session, nothing can hold a lock`);
    continue;
  }
  console.log(`\n[${mode}]`);
  for (const [name, adapter] of Object.entries(adapters)) {
    let violations = 0;
    let errors = 0;
    let barrierMissed = 0;
    let firstError;
    const start = performance.now();
    for (let id = 1; id <= TRIALS; id++) {
      await backend.query("INSERT INTO verification_codes (id) VALUES ($1)", [id]);
      const results =
        mode === "naive"
          ? await raceNaive(backend, adapter, id)
          : await raceBarrier(backend, adapter, id);
      if (results.reached === false) barrierMissed++;
      const successes = results.filter((r) => r.status === "fulfilled" && r.value === true).length;
      const failed = results.filter((r) => r.status === "rejected");
      if (failed.length > 0) {
        errors++;
        firstError ??= failed[0].reason?.message;
      }
      if (successes > 1) violations++;
    }
    await backend.query("DELETE FROM verification_codes");
    const ms = (performance.now() - start) / TRIALS;
    console.log(
      `  ${name}\n    double-consume in ${violations}/${TRIALS} trials` +
        (errors ? `, errors in ${errors} (first: ${firstError})` : "") +
        (barrierMissed ? `, barrier not reached in ${barrierMissed}` : "") +
        `, ${ms.toFixed(2)} ms/trial`,
    );
  }
}

await backend.close();
