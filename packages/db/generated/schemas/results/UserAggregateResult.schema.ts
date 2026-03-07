import * as z from "zod";
export const UserAggregateResultSchema = z.object({
	_count: z
		.object({
			id: z.number(),
			name: z.number(),
			email: z.number(),
			emailVerified: z.number(),
			image: z.number(),
			createdAt: z.number(),
			updatedAt: z.number(),
			role: z.number(),
			banned: z.number(),
			banReason: z.number(),
			banExpires: z.number(),
			isAnonymous: z.number(),
			sessions: z.number(),
			accounts: z.number(),
			members: z.number(),
			invitations: z.number(),
			themes: z.number(),
			themesUsing: z.number(),
			messages: z.number(),
		})
		.optional(),
	_sum: z
		.object({
			id: z.number().nullable(),
		})
		.nullable()
		.optional(),
	_avg: z
		.object({
			id: z.number().nullable(),
		})
		.nullable()
		.optional(),
	_min: z
		.object({
			id: z.number().int().nullable(),
			name: z.string().nullable(),
			email: z.string().nullable(),
			image: z.string().nullable(),
			createdAt: z.date().nullable(),
			updatedAt: z.date().nullable(),
			role: z.string().nullable(),
			banReason: z.string().nullable(),
			banExpires: z.date().nullable(),
		})
		.nullable()
		.optional(),
	_max: z
		.object({
			id: z.number().int().nullable(),
			name: z.string().nullable(),
			email: z.string().nullable(),
			image: z.string().nullable(),
			createdAt: z.date().nullable(),
			updatedAt: z.date().nullable(),
			role: z.string().nullable(),
			banReason: z.string().nullable(),
			banExpires: z.date().nullable(),
		})
		.nullable()
		.optional(),
});
