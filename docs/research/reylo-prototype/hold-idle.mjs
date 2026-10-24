// Throwaway: hold one idle connection (no open transaction) to the PGlite socket server for N seconds.
import postgres from "postgres";

const seconds = Number(process.argv[2] ?? 30);
const sql = postgres("postgres://postgres@127.0.0.1:55433/postgres", { max: 1 });
const reserved = await sql.reserve();
await reserved`select count(*) from users`;
console.log("holding idle");
await new Promise((r) => setTimeout(r, seconds * 1000));
reserved.release();
await sql.end();
console.log("released");
