import * as z from "zod";
export const ThemeDeleteResultSchema = z.nullable(
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
);
