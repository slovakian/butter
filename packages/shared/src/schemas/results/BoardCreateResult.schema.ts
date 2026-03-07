import * as z from 'zod';
export const BoardCreateResultSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional(),
  isOfficial: z.boolean(),
  createdAt: z.date(),
  metadata: z.string(),
  members: z.array(z.unknown()),
  invitations: z.array(z.unknown()),
  themeId: z.number().int().optional(),
  theme: z.unknown().optional(),
  chatrooms: z.array(z.unknown())
});