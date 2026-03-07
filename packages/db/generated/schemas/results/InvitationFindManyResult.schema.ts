import * as z from "zod";
export const InvitationFindManyResultSchema = z.object({
	data: z.array(
		z.object({
			id: z.number().int(),
			boardId: z.number().int(),
			board: z.unknown(),
			email: z.string(),
			role: z.string().optional(),
			status: z.string(),
			expiresAt: z.date(),
			createdAt: z.date(),
			inviterId: z.number().int(),
			user: z.unknown(),
		}),
	),
	pagination: z.object({
		page: z.number().int().min(1),
		pageSize: z.number().int().min(1),
		total: z.number().int().min(0),
		totalPages: z.number().int().min(0),
		hasNext: z.boolean(),
		hasPrev: z.boolean(),
	}),
});
