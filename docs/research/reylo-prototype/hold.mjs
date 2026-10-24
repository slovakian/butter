// Throwaway: hold one connection to the PGlite socket server open, inside an open transaction, for N seconds.
import postgres from "postgres";

const seconds = Number(process.argv[2] ?? 30);
const sql = postgres("postgres://postgres@127.0.0.1:55433/postgres", { max: 1 });
const reserved = await sql.reserve();
await reserved`begin`;
await reserved`select count(*) from users`;
console.log("holding");
await new Promise((r) => setTimeout(r, seconds * 1000));
await reserved`commit`;
reserved.release();
await sql.end();
console.log("released");
