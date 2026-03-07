import * as z from 'zod';
export const ChatroomDeleteResultSchema = z.nullable(z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string(),
  boardId: z.number().int(),
  board: z.unknown(),
  messages: z.array(z.unknown())
}));