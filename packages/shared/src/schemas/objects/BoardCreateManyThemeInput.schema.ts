import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional().nullable(),
  isOfficial: z.boolean().optional(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional()
}).strict();
export const BoardCreateManyThemeInputObjectSchema: z.ZodType<Prisma.BoardCreateManyThemeInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardCreateManyThemeInput>;
export const BoardCreateManyThemeInputObjectZodSchema = makeSchema();
