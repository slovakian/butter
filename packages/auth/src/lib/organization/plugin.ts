import { organization } from "better-auth/plugins";

export const organizationPlugin = organization({
	schema: {
		organization: {
			modelName: "Board",
		},
		member: {
			fields: {
				organizationId: "boardId",
			},
		},
		invitation: {
			fields: {
				organizationId: "boardId",
			},
		},
	},
});
