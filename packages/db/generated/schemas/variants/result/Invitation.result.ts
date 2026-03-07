import * as z from 'zod';
// prettier-ignore
export const InvitationResultSchema = z.object({
    id: z.number().int(),
    boardId: z.number().int(),
    board: z.unknown(),
    email: z.string(),
    role: z.string().nullable(),
    status: z.string(),
    expiresAt: z.date(),
    createdAt: z.date(),
    inviterId: z.number().int(),
    user: z.unknown()
}).strict();

export type InvitationResultType = z.infer<typeof InvitationResultSchema>;
