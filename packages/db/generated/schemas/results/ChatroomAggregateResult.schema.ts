import * as z from "zod";
export const ChatroomAggregateResultSchema = z.object({
	_count: z
		.object({
			id: z.number(),
			name: z.number(),
			slug: z.number(),
			boardId: z.number(),
			board: z.number(),
			messages: z.number(),
		})
		.optional(),
	_sum: z
		.object({
			id: z.number().nullable(),
			boardId: z.number().nullable(),
		})
		.nullable()
		.optional(),
	_avg: z
		.object({
			id: z.number().nullable(),
			boardId: z.number().nullable(),
		})
		.nullable()
		.optional(),
	_min: z
		.object({
			id: z.number().int().nullable(),
			name: z.string().nullable(),
			slug: z.string().nullable(),
			boardId: z.number().int().nullable(),
		})
		.nullable()
		.optional(),
	_max: z
		.object({
			id: z.number().int().nullable(),
			name: z.string().nullable(),
			slug: z.string().nullable(),
			boardId: z.number().int().nullable(),
		})
		.nullable()
		.optional(),
});
