import * as z from 'zod';
// prettier-ignore
export const MessageModelSchema = z.object({
    id: z.number().int(),
    content: z.string(),
    pageNumber: z.number().int(),
    chatroomId: z.number().int(),
    chatroom: z.unknown(),
    userId: z.number().int(),
    user: z.unknown()
}).strict();

export type MessagePureType = z.infer<typeof MessageModelSchema>;
