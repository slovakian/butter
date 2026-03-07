import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const ThemeAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ThemeAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeAvgOrderByAggregateInput>;
export const ThemeAvgOrderByAggregateInputObjectZodSchema = makeSchema();
