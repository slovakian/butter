import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  isDark: SortOrderSchema.optional(),
  variables: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const ThemeCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ThemeCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeCountOrderByAggregateInput>;
export const ThemeCountOrderByAggregateInputObjectZodSchema = makeSchema();
