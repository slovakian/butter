import * as z from "zod";
export const BoardGroupByResultSchema = z.array(
	z.object({
		id: z.number().int(),
		name: z.string(),
		slug: z.string(),
		logo: z.string(),
		isOfficial: z.boolean(),
		createdAt: z.date(),
		metadata: z.string(),
		themeId: z.number().int(),
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
	}),
);
