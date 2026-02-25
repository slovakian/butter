import type { Auth, Session } from "@butter/auth";
import type { DbClient } from "@butter/db";

export type CreateContextOptions = {
	req: Request;
	db: DbClient;
	auth: Auth;
};

export type CreateContextOutput = {
	req: Request;
	db: DbClient;
	auth: {
		client: Auth;
		session: Session | null;
	};
};

export async function createContext({
	req,
	db,
	auth,
}: CreateContextOptions): Promise<CreateContextOutput> {
	return {
		req,
		db,
		auth: {
			client: auth,
			session: await auth.api.getSession({
				headers: req.headers,
			}),
		},
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
