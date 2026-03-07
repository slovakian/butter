import * as z from 'zod';

export const InvitationSchema = z.object({
  id: z.number().int(),
  boardId: z.number().int(),
  email: z.string(),
  role: z.string().nullish(),
  status: z.string().default("pending"),
  expiresAt: z.date(),
  createdAt: z.date(),
  inviterId: z.number().int(),
});

export type InvitationType = z.infer<typeof InvitationSchema>;
