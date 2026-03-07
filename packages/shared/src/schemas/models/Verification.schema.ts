import * as z from 'zod';

export const VerificationSchema = z.object({
  id: z.number().int(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type VerificationType = z.infer<typeof VerificationSchema>;
