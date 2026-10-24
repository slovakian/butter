import getSession from "./get_session.sql";
import createUser from "./create_user.sql";

declare const db: import("@electric-sql/pglite").PGlite;

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
const assertType = <T extends true>(_: T): void => {};

const session = await getSession.run(db, { id: "abc" });
assertType<Equal<typeof session, { id: string; expires_at: string; user_id: string; email: string; name: string | null } | null>>(true);

const user = await createUser.run(db, { id: "00000000-0000-0000-0000-000000000000", email: "a@b.c", name: null });
export const email: string = user.email;
