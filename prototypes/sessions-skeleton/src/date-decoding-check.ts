import { PGlite } from "@electric-sql/pglite";
import { Schema } from "effect";

// Empirical check proving the Port-boundary date decoding behavior:
// 1. PGlite returns native Date objects for TIMESTAMPTZ columns.
// 2. Schema.Date succeeds on PGlite, but fails on ISO string inputs (e.g. from Reylo/SQLite).
// 3. Schema.DateFromString succeeds on ISO strings, but fails on PGlite Date objects.
// 4. Schema.Union([Schema.Date, Schema.DateFromString]) succeeds on both.

async function main() {
  const db = new PGlite();
  await db.exec(`
    CREATE TABLE test (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL
    );
  `);

  const now = new Date();
  await db.query("INSERT INTO test (id, created_at) VALUES ($1, $2)", [
    "1",
    now.toISOString(),
  ]);

  const res = await db.query("SELECT * FROM test WHERE id = $1", ["1"]);
  const pgliteRow = res.rows[0] as any;
  const reyloRow = { created_at: now.toISOString(), id: "1" };

  console.log(
    "PGlite row.created_at is Date?",
    pgliteRow.created_at instanceof Date
  );
  console.log(
    "Reylo row.created_at is string?",
    typeof reyloRow.created_at === "string"
  );

  const FlexibleDate = Schema.Struct({
    created_at: Schema.Union([Schema.Date, Schema.DateFromString]),
    id: Schema.String,
  });

  const decodedPglite = Schema.decodeUnknownSync(FlexibleDate)(pgliteRow);
  const decodedReylo = Schema.decodeUnknownSync(FlexibleDate)(reyloRow);

  console.log(
    "Decoded PGlite created_at is Date?",
    decodedPglite.created_at instanceof Date
  );
  console.log(
    "Decoded Reylo created_at is Date?",
    decodedReylo.created_at instanceof Date
  );
}

main().catch(console.error);
