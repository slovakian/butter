import * as z from 'zod';
// prettier-ignore
export const ChatroomModelSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    slug: z.string(),
    boardId: z.number().int(),
    board: z.unknown(),
    messages: z.array(z.unknown())
}).strict();

export type ChatroomPureType = z.infer<typeof ChatroomModelSchema>;
