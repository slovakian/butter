// Throwaway: start PGlite in memory, apply a tiny auth-like schema, serve it over the wire protocol.
import { PGlite } from "@electric-sql/pglite";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";

const port = Number(process.argv[2] ?? 55433);
const maxConnections = Number(process.argv[3] ?? 1);
const db = await PGlite.create();
await db.exec(`
  create table users (
    id uuid primary key,
    email text not null unique,
    name text,
    created_at timestamptz not null default now()
  );
  create table sessions (
    id text primary key,
    user_id uuid not null references users (id) on delete cascade,
    expires_at timestamptz not null
  );
`);
const server = new PGLiteSocketServer({ db, port, host: "127.0.0.1", maxConnections });
server.addEventListener?.("connection", () => console.log("connection"));
await server.start();
console.log(`listening ${port} max=${maxConnections}`);
