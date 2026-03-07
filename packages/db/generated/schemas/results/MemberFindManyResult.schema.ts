import * as z from "zod";
export const MemberFindManyResultSchema = z.object({
	data: z.array(
		z.object({
			id: z.number().int(),
			boardId: z.number().int(),
			board: z.unknown(),
			userId: z.number().int(),
			user: z.unknown(),
			role: z.string(),
			createdAt: z.date(),
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
