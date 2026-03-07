import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const ThemeSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ThemeSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeSumOrderByAggregateInput>;
export const ThemeSumOrderByAggregateInputObjectZodSchema = makeSchema();
