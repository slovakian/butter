import { tempDb } from "@butter/db";
import { env } from "@butter/env/server";
import { zenstackAdapter } from "@zenstackhq/better-auth";
import { betterAuth } from "better-auth";
import { adminPlugin } from "./admin/plugin";
import { organizationPlugin } from "./organization/plugin";

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
