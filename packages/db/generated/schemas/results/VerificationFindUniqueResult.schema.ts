import * as z from "zod";
export const VerificationFindUniqueResultSchema = z.nullable(
	z.object({
		id: z.number().int(),
		identifier: z.string(),
		value: z.string(),
		expiresAt: z.date(),
		createdAt: z.date(),
		updatedAt: z.date(),
	}),
);
