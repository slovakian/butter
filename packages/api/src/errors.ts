import { z } from "zod";

export const commonErrors = {
	UNAUTHORIZED: {
		status: 401,
		message: "You are not authorized to access this resource.",
	},
	FORBIDDEN: {
		status: 403,
		message: "You do not have permission to access this resource.",
	},
	NOT_FOUND: {
		status: 404,
		message: "The requested resource was not found.",
		data: z.object({
			resource: z.string().optional(),
		}),
	},
	BAD_REQUEST: {
		status: 400,
		message: "The request was invalid.",
		data: z.object({
			issues: z.array(z.any()).optional(),
		}),
	},
	INTERNAL_SERVER_ERROR: {
		status: 500,
		message: "An internal server error occurred.",
	},
} as const;
