import * as z from "zod";
export const AccountAggregateResultSchema = z.object({
	_count: z
		.object({
			id: z.number(),
			accountId: z.number(),
			providerId: z.number(),
			userId: z.number(),
			user: z.number(),
			accessToken: z.number(),
			refreshToken: z.number(),
			idToken: z.number(),
			accessTokenExpiresAt: z.number(),
			refreshTokenExpiresAt: z.number(),
			scope: z.number(),
			password: z.number(),
			createdAt: z.number(),
			updatedAt: z.number(),
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
			accountId: z.string().nullable(),
			providerId: z.string().nullable(),
			userId: z.number().int().nullable(),
			accessToken: z.string().nullable(),
			refreshToken: z.string().nullable(),
			idToken: z.string().nullable(),
			accessTokenExpiresAt: z.date().nullable(),
			refreshTokenExpiresAt: z.date().nullable(),
			scope: z.string().nullable(),
			password: z.string().nullable(),
			createdAt: z.date().nullable(),
			updatedAt: z.date().nullable(),
		})
		.nullable()
		.optional(),
	_max: z
		.object({
			id: z.number().int().nullable(),
			accountId: z.string().nullable(),
			providerId: z.string().nullable(),
			userId: z.number().int().nullable(),
			accessToken: z.string().nullable(),
			refreshToken: z.string().nullable(),
			idToken: z.string().nullable(),
			accessTokenExpiresAt: z.date().nullable(),
			refreshTokenExpiresAt: z.date().nullable(),
			scope: z.string().nullable(),
			password: z.string().nullable(),
			createdAt: z.date().nullable(),
			updatedAt: z.date().nullable(),
		})
		.nullable()
		.optional(),
});
