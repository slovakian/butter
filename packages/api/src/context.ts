import type { AuthClient, Session } from "@butter/auth";
import type { DbClient } from "@butter/db";
import type { CloudflareEnv } from "../../env/env";

export type CreateContextOptions = {
	req: Request;
	db: DbClient;
	auth: AuthClient;
	env: CloudflareEnv;
};

export type CreateContextOutput = {
	req: Request;
	db: DbClient;
	auth: {
		client: AuthClient;
		session: Session | null;
	};
	env: CloudflareEnv;
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
		env: env as CloudflareEnv,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
