import * as z from "zod";
export const MessageAggregateResultSchema = z.object({
	_count: z
		.object({
			id: z.number(),
			content: z.number(),
			pageNumber: z.number(),
			chatroomId: z.number(),
			chatroom: z.number(),
			userId: z.number(),
			user: z.number(),
		})
		.optional(),
	_sum: z
		.object({
			id: z.number().nullable(),
			pageNumber: z.number().nullable(),
			chatroomId: z.number().nullable(),
			userId: z.number().nullable(),
		})
		.nullable()
		.optional(),
	_avg: z
		.object({
			id: z.number().nullable(),
			pageNumber: z.number().nullable(),
			chatroomId: z.number().nullable(),
			userId: z.number().nullable(),
		})
		.nullable()
		.optional(),
	_min: z
		.object({
			id: z.number().int().nullable(),
			content: z.string().nullable(),
			pageNumber: z.number().int().nullable(),
			chatroomId: z.number().int().nullable(),
			userId: z.number().int().nullable(),
		})
		.nullable()
		.optional(),
	_max: z
		.object({
			id: z.number().int().nullable(),
			content: z.string().nullable(),
			pageNumber: z.number().int().nullable(),
			chatroomId: z.number().int().nullable(),
			userId: z.number().int().nullable(),
		})
		.nullable()
		.optional(),
});
