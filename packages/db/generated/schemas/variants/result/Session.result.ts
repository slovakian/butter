import * as z from "zod";
// prettier-ignore
export const SessionResultSchema = z
	.object({
		id: z.number().int(),
		expiresAt: z.date(),
		token: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
		ipAddress: z.string().nullable(),
		userAgent: z.string().nullable(),
		userId: z.number().int(),
		user: z.unknown(),
		impersonatedBy: z.string().nullable(),
		activeOrganizationId: z.string().nullable(),
	})
	.strict();

export type SessionResultType = z.infer<typeof SessionResultSchema>;
