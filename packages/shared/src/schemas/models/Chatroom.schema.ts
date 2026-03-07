import * as z from 'zod';

export const ChatroomSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string(),
  boardId: z.number().int(),
});

export type ChatroomType = z.infer<typeof ChatroomSchema>;
