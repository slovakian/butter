import * as z from 'zod';
export const BoardFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});