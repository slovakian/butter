import * as z from "zod";
export const SessionGroupByResultSchema = z.array(
	z.object({
		id: z.number().int(),
		expiresAt: z.date(),
		token: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
		ipAddress: z.string(),
		userAgent: z.string(),
		userId: z.number().int(),
		impersonatedBy: z.string(),
		activeOrganizationId: z.string(),
		_count: z
			.object({
				id: z.number(),
				expiresAt: z.number(),
				token: z.number(),
				createdAt: z.number(),
				updatedAt: z.number(),
				ipAddress: z.number(),
				userAgent: z.number(),
				userId: z.number(),
				user: z.number(),
				impersonatedBy: z.number(),
				activeOrganizationId: z.number(),
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
				expiresAt: z.date().nullable(),
				token: z.string().nullable(),
				createdAt: z.date().nullable(),
				updatedAt: z.date().nullable(),
				ipAddress: z.string().nullable(),
				userAgent: z.string().nullable(),
				userId: z.number().int().nullable(),
				impersonatedBy: z.string().nullable(),
				activeOrganizationId: z.string().nullable(),
			})
			.nullable()
			.optional(),
		_max: z
			.object({
				id: z.number().int().nullable(),
				expiresAt: z.date().nullable(),
				token: z.string().nullable(),
				createdAt: z.date().nullable(),
				updatedAt: z.date().nullable(),
				ipAddress: z.string().nullable(),
				userAgent: z.string().nullable(),
				userId: z.number().int().nullable(),
				impersonatedBy: z.string().nullable(),
				activeOrganizationId: z.string().nullable(),
			})
			.nullable()
			.optional(),
	}),
);
