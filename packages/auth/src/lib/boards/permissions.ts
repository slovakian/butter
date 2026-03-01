import { createAccessControl } from "better-auth/plugins/access";

const boardStatement = {
	board: ["read", "update", "delete", "manage_settings"],
	member: ["create", "read", "update", "delete", "ban"],
	message: ["create", "read", "update", "delete"],
} as const;

export type BoardPermissions = typeof boardStatement;

const boardAc = createAccessControl(boardStatement);

export const owner = boardAc.newRole({
	board: ["read", "update", "delete", "manage_settings"],
	member: ["create", "read", "update", "delete", "ban"],
	message: ["create", "read", "update", "delete"],
});

export const admin = boardAc.newRole({
	board: ["read", "update", "manage_settings"],
	member: ["create", "read", "delete", "ban"],
	message: ["create", "read", "delete"],
});

// The baseline explicit member
export const member = boardAc.newRole({
	board: ["read"],
	member: ["read"],
	message: ["create", "read"],
});
