import * as z from 'zod';
// prettier-ignore
export const ThemeResultSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    isDark: z.boolean(),
    variables: z.unknown(),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.number().int().nullable(),
    user: z.unknown().nullable(),
    usersUsing: z.array(z.unknown()),
    boardsUsing: z.array(z.unknown())
}).strict();

export type ThemeResultType = z.infer<typeof ThemeResultSchema>;
