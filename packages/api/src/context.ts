import type { AuthClient, Session } from "@butter/auth";
import type { DbClient } from "@butter/db";

export type CreateContextOptions = {
	req: Request;
	db: DbClient;
	auth: AuthClient;
	env: Env;
};

export type CreateContextOutput = {
	req: Request;
	db: DbClient;
	auth: {
		client: AuthClient;
		session: Session | null;
	};
	env: Env;
};

export async function createContext({
	req,
	db,
	auth,
	env,
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
		env: env as Env,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
