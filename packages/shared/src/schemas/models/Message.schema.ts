import * as z from 'zod';

export const MessageSchema = z.object({
  id: z.number().int(),
  content: z.string(),
  pageNumber: z.number().int(),
  chatroomId: z.number().int(),
  userId: z.number().int(),
});

export type MessageType = z.infer<typeof MessageSchema>;
