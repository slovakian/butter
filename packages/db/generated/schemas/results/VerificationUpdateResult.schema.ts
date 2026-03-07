import * as z from "zod";
export const VerificationUpdateResultSchema = z.nullable(
	z.object({
		id: z.number().int(),
		identifier: z.string(),
		value: z.string(),
		expiresAt: z.date(),
		createdAt: z.date(),
		updatedAt: z.date(),
	}),
);
