import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const ThemeSumAggregateInputObjectSchema: z.ZodType<Prisma.ThemeSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ThemeSumAggregateInputType>;
export const ThemeSumAggregateInputObjectZodSchema = makeSchema();
