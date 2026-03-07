import * as z from "zod";
export const BoardAggregateResultSchema = z.object({
	_count: z
		.object({
			id: z.number(),
			name: z.number(),
			slug: z.number(),
			logo: z.number(),
			isOfficial: z.number(),
			createdAt: z.number(),
			metadata: z.number(),
			members: z.number(),
			invitations: z.number(),
			themeId: z.number(),
			theme: z.number(),
			chatrooms: z.number(),
		})
		.optional(),
	_sum: z
		.object({
			id: z.number().nullable(),
			themeId: z.number().nullable(),
		})
		.nullable()
		.optional(),
	_avg: z
		.object({
			id: z.number().nullable(),
			themeId: z.number().nullable(),
		})
		.nullable()
		.optional(),
	_min: z
		.object({
			id: z.number().int().nullable(),
			name: z.string().nullable(),
			slug: z.string().nullable(),
			logo: z.string().nullable(),
			createdAt: z.date().nullable(),
			metadata: z.string().nullable(),
			themeId: z.number().int().nullable(),
		})
		.nullable()
		.optional(),
	_max: z
		.object({
			id: z.number().int().nullable(),
			name: z.string().nullable(),
			slug: z.string().nullable(),
			logo: z.string().nullable(),
			createdAt: z.date().nullable(),
			metadata: z.string().nullable(),
			themeId: z.number().int().nullable(),
		})
		.nullable()
		.optional(),
});
