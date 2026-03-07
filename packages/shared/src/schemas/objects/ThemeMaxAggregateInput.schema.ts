import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  isDark: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const ThemeMaxAggregateInputObjectSchema: z.ZodType<Prisma.ThemeMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ThemeMaxAggregateInputType>;
export const ThemeMaxAggregateInputObjectZodSchema = makeSchema();
