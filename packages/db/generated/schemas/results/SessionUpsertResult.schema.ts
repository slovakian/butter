import * as z from "zod";
export const SessionUpsertResultSchema = z.object({
	id: z.number().int(),
	expiresAt: z.date(),
	token: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	ipAddress: z.string().optional(),
	userAgent: z.string().optional(),
	userId: z.number().int(),
	user: z.unknown(),
	impersonatedBy: z.string().optional(),
	activeOrganizationId: z.string().optional(),
});
