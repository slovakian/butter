import * as z from "zod";
export const ThemeGroupByResultSchema = z.array(
	z.object({
		id: z.number().int(),
		name: z.string(),
		isDark: z.boolean(),
		variables: z.unknown(),
		createdAt: z.date(),
		updatedAt: z.date(),
		userId: z.number().int(),
		_count: z
			.object({
				id: z.number(),
				name: z.number(),
				isDark: z.number(),
				variables: z.number(),
				createdAt: z.number(),
				updatedAt: z.number(),
				userId: z.number(),
				user: z.number(),
				usersUsing: z.number(),
				boardsUsing: z.number(),
			})
			.optional(),
		_sum: z
			.object({
				id: z.number().nullable(),
				userId: z.number().nullable(),
			})
			.nullable()
			.optional(),
		_avg: z
			.object({
				id: z.number().nullable(),
				userId: z.number().nullable(),
			})
			.nullable()
			.optional(),
		_min: z
			.object({
				id: z.number().int().nullable(),
				name: z.string().nullable(),
				createdAt: z.date().nullable(),
				updatedAt: z.date().nullable(),
				userId: z.number().int().nullable(),
			})
			.nullable()
			.optional(),
		_max: z
			.object({
				id: z.number().int().nullable(),
				name: z.string().nullable(),
				createdAt: z.date().nullable(),
				updatedAt: z.date().nullable(),
				userId: z.number().int().nullable(),
			})
			.nullable()
			.optional(),
	}),
);
