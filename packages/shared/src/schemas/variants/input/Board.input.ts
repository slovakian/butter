import * as z from 'zod';
// prettier-ignore
export const BoardInputSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    slug: z.string(),
    logo: z.string().optional().nullable(),
    isOfficial: z.boolean(),
    createdAt: z.date(),
    metadata: z.string(),
    members: z.array(z.unknown()),
    invitations: z.array(z.unknown()),
    themeId: z.number().int().optional().nullable(),
    theme: z.unknown().optional().nullable(),
    chatrooms: z.array(z.unknown())
}).strict();

export type BoardInputType = z.infer<typeof BoardInputSchema>;
