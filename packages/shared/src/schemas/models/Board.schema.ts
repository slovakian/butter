import * as z from 'zod';

export const BoardSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().nullish(),
  isOfficial: z.boolean(),
  createdAt: z.date(),
  metadata: z.string().default("{}"),
  themeId: z.number().int().nullish(),
});

export type BoardType = z.infer<typeof BoardSchema>;
