import * as z from 'zod';
// prettier-ignore
export const UserInputSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    role: z.string().optional().nullable(),
    banned: z.boolean().optional().nullable(),
    banReason: z.string().optional().nullable(),
    banExpires: z.date().optional().nullable(),
    isAnonymous: z.boolean().optional().nullable(),
    sessions: z.array(z.unknown()),
    accounts: z.array(z.unknown()),
    members: z.array(z.unknown()),
    invitations: z.array(z.unknown()),
    themes: z.array(z.unknown()),
    themesUsing: z.array(z.unknown()),
    messages: z.array(z.unknown())
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
