import { tempDb } from "@butter/db";
import { env } from "@butter/env/server";
import { zenstackAdapter } from "@zenstackhq/better-auth";
import { betterAuth } from "better-auth";
import { adminPlugin } from "./admin/plugin";
import { anonymousPlugin } from "./anonymous/plugin";
import { boardPlugin } from "./boards/plugin";

export const auth = betterAuth({
	database: zenstackAdapter(tempDb, {
		provider: "postgresql",
	}),
	baseURL: "http://localhost:3000",
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
	plugins: [adminPlugin, boardPlugin, anonymousPlugin],
});
