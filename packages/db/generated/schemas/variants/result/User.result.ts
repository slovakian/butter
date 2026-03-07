import * as z from 'zod';
// prettier-ignore
export const UserResultSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    role: z.string().nullable(),
    banned: z.boolean().nullable(),
    banReason: z.string().nullable(),
    banExpires: z.date().nullable(),
    isAnonymous: z.boolean().nullable(),
    sessions: z.array(z.unknown()),
    accounts: z.array(z.unknown()),
    members: z.array(z.unknown()),
    invitations: z.array(z.unknown()),
    themes: z.array(z.unknown()),
    themesUsing: z.array(z.unknown()),
    messages: z.array(z.unknown())
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
