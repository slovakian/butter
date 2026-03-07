import * as z from 'zod';
export const InvitationUpsertResultSchema = z.object({
  id: z.number().int(),
  boardId: z.number().int(),
  board: z.unknown(),
  email: z.string(),
  role: z.string().optional(),
  status: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
  inviterId: z.number().int(),
  user: z.unknown()
});