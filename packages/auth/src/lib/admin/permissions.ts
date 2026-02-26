import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
	...defaultStatements,
	project: ["create", "share", "update", "delete"],
	board: ["create", "update", "delete", "read"],
} as const;

const ac = createAccessControl(statement);

export const adminRole = ac.newRole({
	project: ["create", "update"],
	board: ["create", "update", "read"],
	user: [
		"create",
		"list",
		"set-role",
		"ban",
		"impersonate",
		"set-password",
		"get",
		"update",
	],
	session: ["list", "revoke", "delete"],
});

export const superAdminRole = ac.newRole({
	project: ["create", "share", "update", "delete"],
	board: ["create", "update", "delete", "read"],
	user: [
		"create",
		"list",
		"set-role",
		"ban",
		"impersonate",
		"delete",
		"set-password",
		"get",
		"update",
	],
	session: ["list", "revoke", "delete"],
});
