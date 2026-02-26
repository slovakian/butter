import type { DbClient } from "@butter/db";
import { env } from "@butter/env/server";
import { zenstackAdapter } from "@zenstackhq/better-auth";
import { betterAuth } from "better-auth";
import { adminPlugin } from "./lib/admin/plugin";
import { organizationPlugin } from "./lib/organization/plugin";
// TODO: implement payments
// import { polarClient } from "./lib/payments";
// import { checkout, polar, portal } from "@polar-sh/better-auth";

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
		plugins: [adminPlugin, organizationPlugin],
		// plugins: [
		//   polar({
		//     client: polarClient,
		//     createCustomerOnSignUp: true,
		//     enableCustomerPortal: true,
		//     use: [
		//       checkout({
		//         products: [
		//           {
		//             productId: "your-product-id",
		//             slug: "pro",
		//           },
		//         ],
		//         successUrl: env.POLAR_SUCCESS_URL,
		//         authenticatedUsersOnly: true,
		//       }),
		//       portal(),
		//     ],
		//   }),
		// ],
	});

export type Auth = ReturnType<typeof createAuth>;
export type Session = Auth["$Infer"]["Session"];
