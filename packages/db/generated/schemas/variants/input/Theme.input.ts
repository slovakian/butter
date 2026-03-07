import * as z from 'zod';
// prettier-ignore
export const ThemeInputSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    isDark: z.boolean(),
    variables: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.number().int().optional().nullable(),
    user: z.unknown().optional().nullable(),
    usersUsing: z.array(z.unknown()),
    boardsUsing: z.array(z.unknown())
}).strict();

export type ThemeInputType = z.infer<typeof ThemeInputSchema>;
