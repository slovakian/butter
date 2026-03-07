import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  isDark: z.literal(true).optional(),
  variables: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ThemeCountAggregateInputObjectSchema: z.ZodType<Prisma.ThemeCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ThemeCountAggregateInputType>;
export const ThemeCountAggregateInputObjectZodSchema = makeSchema();
