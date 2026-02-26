import { admin } from "better-auth/plugins";
import { adminRole, superAdminRole } from "./permissions";

export const adminPlugin = admin({
	roles: {
		admin: adminRole,
		superAdmin: superAdminRole,
	},
});
