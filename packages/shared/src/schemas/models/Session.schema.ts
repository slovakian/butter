import * as z from 'zod';

export const SessionSchema = z.object({
  id: z.number().int(),
  expiresAt: z.date(),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  ipAddress: z.string().nullish(),
  userAgent: z.string().nullish(),
  userId: z.number().int(),
  impersonatedBy: z.string().nullish(),
  activeOrganizationId: z.string().nullish(),
});

export type SessionType = z.infer<typeof SessionSchema>;
