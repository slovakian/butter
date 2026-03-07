import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  slug: z.literal(true).optional(),
  logo: z.literal(true).optional(),
  isOfficial: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  themeId: z.literal(true).optional()
}).strict();
export const BoardMinAggregateInputObjectSchema: z.ZodType<Prisma.BoardMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BoardMinAggregateInputType>;
export const BoardMinAggregateInputObjectZodSchema = makeSchema();
