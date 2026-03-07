import * as z from "zod";
export const ThemeFindManyResultSchema = z.object({
	data: z.array(
		z.object({
			id: z.number().int(),
			name: z.string(),
			isDark: z.boolean(),
			variables: z.unknown(),
			createdAt: z.date(),
			updatedAt: z.date(),
			userId: z.number().int().optional(),
			user: z.unknown().optional(),
			usersUsing: z.array(z.unknown()),
			boardsUsing: z.array(z.unknown()),
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
