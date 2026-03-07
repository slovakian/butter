import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  isDark: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const ThemeMinAggregateInputObjectSchema: z.ZodType<Prisma.ThemeMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ThemeMinAggregateInputType>;
export const ThemeMinAggregateInputObjectZodSchema = makeSchema();
