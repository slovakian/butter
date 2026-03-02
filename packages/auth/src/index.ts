import type { DbClient } from "@butter/db";
import { env } from "@butter/env/server";
import { zenstackAdapter } from "@zenstackhq/better-auth";
import { betterAuth } from "better-auth";
import { anonymous } from "better-auth/plugins";
import { adminPlugin } from "./lib/admin/plugin";
import { boardPlugin } from "./lib/boards/plugin";

export const createAuth = (db: DbClient) =>
	betterAuth({
		database: zenstackAdapter(db, {
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
			defaultCookieAttributes: {
				sameSite: "none",
				secure: true,
				httpOnly: true,
			},
		},
		plugins: [adminPlugin, boardPlugin, anonymous()],
	});

export type AuthClient = ReturnType<typeof createAuth>;
export type Session = AuthClient["$Infer"]["Session"];
export * from "./lib/boards/permissions";
