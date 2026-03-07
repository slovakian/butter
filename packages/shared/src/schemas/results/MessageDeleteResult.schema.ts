import * as z from 'zod';
export const MessageDeleteResultSchema = z.nullable(z.object({
  id: z.number().int(),
  content: z.string(),
  pageNumber: z.number().int(),
  chatroomId: z.number().int(),
  chatroom: z.unknown(),
  userId: z.number().int(),
  user: z.unknown()
}));