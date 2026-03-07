import * as z from "zod";
export const MessageFindManyResultSchema = z.object({
	data: z.array(
		z.object({
			id: z.number().int(),
			content: z.string(),
			pageNumber: z.number().int(),
			chatroomId: z.number().int(),
			chatroom: z.unknown(),
			userId: z.number().int(),
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
