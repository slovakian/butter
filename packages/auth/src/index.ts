import { prismaAdapter } from "@better-auth/prisma-adapter";
import type { DbClient } from "@butter/db";
import { env } from "@butter/env/server";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { customSession } from "better-auth/plugins";
import { adminPlugin } from "./lib/admin/plugin";
import { anonymousPlugin } from "./lib/anonymous/plugin";
import { boardPlugin } from "./lib/boards/plugin";

export const createAuth = (db: DbClient, _: Env) => {
	const options = {
		database: prismaAdapter(db, {
			provider: "postgresql",
		}),
		trustedOrigins: [env.CORS_ORIGIN],
		emailAndPassword: {
			enabled: true,
		},
		advanced: {
			database: {
				generateId: "serial",
			},
			cookiePrefix: "butt3r",
			defaultCookieAttributes: {
				sameSite: "none",
				secure: true,
				httpOnly: true,
			},
		},
		plugins: [anonymousPlugin, adminPlugin, boardPlugin],
	} satisfies BetterAuthOptions;

	return betterAuth({
		...options,
		plugins: [
			...(options.plugins ?? []),
			customSession(async ({ user, session }) => {
				const userTheme = await db.theme.findFirst({
					where: {
						usersUsing: {
							some: {
								id: Number(user.id),
							},
						},
					},
				});

				return {
					user: {
						...user,
						theme: userTheme,
					},
					session,
				};
			}, options),
		],
	});
};

export type AuthClient = ReturnType<typeof createAuth>;
export type Session = AuthClient["$Infer"]["Session"];

export * from "./lib/boards/permissions";
