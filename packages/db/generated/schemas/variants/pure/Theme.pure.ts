import * as z from 'zod';
// prettier-ignore
export const ThemeModelSchema = z.object({
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

export type ThemePureType = z.infer<typeof ThemeModelSchema>;
