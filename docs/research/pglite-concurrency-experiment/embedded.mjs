// Time a real Postgres from npm (embedded-postgres: native binaries per platform,
// no Docker), from nothing to a first query, then run race.mjs against it.
// usage: node embedded.mjs <empty-data-dir>
import { execFileSync } from "node:child_process";
import EmbeddedPostgres from "embedded-postgres";

const dir = process.argv[2];
const port = 55424;
const t0 = performance.now();
const pg = new EmbeddedPostgres({ databaseDir: dir, port, user: "postgres", password: "postgres", persistent: false });
await pg.initialise();
const tInit = performance.now();
await pg.start();
const client = pg.getPgClient();
await client.connect();
const { rows } = await client.query("SELECT version()");
await client.end();
const tReady = performance.now();
console.log(rows[0].version);
console.log(`initialise ${(tInit - t0).toFixed(0)} ms, start + first query ${(tReady - tInit).toFixed(0)} ms`);

execFileSync(process.execPath, ["race.mjs", "postgres"], {
  stdio: "inherit",
  env: { ...process.env, DATABASE_URL: `postgres://postgres:postgres@127.0.0.1:${port}/postgres` },
});
await pg.stop();
