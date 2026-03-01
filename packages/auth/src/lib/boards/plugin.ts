import { organization } from "better-auth/plugins";

export const boardPlugin = organization({
	schema: {
		organization: {
			modelName: "Board",
			additionalFields: {
				isOfficial: {
					type: "boolean",
					input: false,
					required: false,
					defaultValue: false,
				},
			},
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
