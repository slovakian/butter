import * as z from 'zod';
// prettier-ignore
export const VerificationModelSchema = z.object({
    id: z.number().int(),
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.date(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type VerificationPureType = z.infer<typeof VerificationModelSchema>;
