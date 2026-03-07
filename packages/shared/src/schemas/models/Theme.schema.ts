import * as z from 'zod';

export const ThemeSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  isDark: z.boolean(),
  variables: z.unknown().refine((val) => { const getDepth = (obj: unknown, depth: number = 0): number => { if (depth > 10) return depth; if (obj === null || typeof obj !== 'object') return depth; const values = Object.values(obj as Record<string, unknown>); if (values.length === 0) return depth; return Math.max(...values.map(v => getDepth(v, depth + 1))); }; return getDepth(val) <= 10; }, "JSON nesting depth exceeds maximum of 10"),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.number().int().nullish(),
});

export type ThemeType = z.infer<typeof ThemeSchema>;
