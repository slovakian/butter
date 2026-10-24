// Throwaway: run Reylo queries on an in-process PGlite (the runtime path), using the Node loader.
import { PGlite } from "@electric-sql/pglite";
import createUser from "./create_user.sql";
import getSession from "./get_session.sql";

const db = await PGlite.create();
await db.exec(`
  create table users (id uuid primary key, email text not null unique, name text, created_at timestamptz not null default now());
  create table sessions (id text primary key, user_id uuid not null references users (id) on delete cascade, expires_at timestamptz not null);
`);
const user = await createUser.run(db, { id: "00000000-0000-0000-0000-000000000001", email: "a@b.c", name: null });
await db.query("insert into sessions values ('s1', $1, now() + interval '1 day')", [user.id]);
const session = await db.transaction((tx) => getSession.run(tx, { id: "s1" }));
process.stdout.write(`${JSON.stringify({ sql: getSession.sql, user, session })}\n`);
