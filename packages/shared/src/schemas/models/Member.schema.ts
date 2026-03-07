import * as z from 'zod';

export const MemberSchema = z.object({
  id: z.number().int(),
  boardId: z.number().int(),
  userId: z.number().int(),
  role: z.string().default("member"),
  createdAt: z.date(),
});

export type MemberType = z.infer<typeof MemberSchema>;
