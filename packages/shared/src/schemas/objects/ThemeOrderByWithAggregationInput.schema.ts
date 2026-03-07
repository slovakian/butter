import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ThemeCountOrderByAggregateInputObjectSchema as ThemeCountOrderByAggregateInputObjectSchema } from './ThemeCountOrderByAggregateInput.schema';
import { ThemeAvgOrderByAggregateInputObjectSchema as ThemeAvgOrderByAggregateInputObjectSchema } from './ThemeAvgOrderByAggregateInput.schema';
import { ThemeMaxOrderByAggregateInputObjectSchema as ThemeMaxOrderByAggregateInputObjectSchema } from './ThemeMaxOrderByAggregateInput.schema';
import { ThemeMinOrderByAggregateInputObjectSchema as ThemeMinOrderByAggregateInputObjectSchema } from './ThemeMinOrderByAggregateInput.schema';
import { ThemeSumOrderByAggregateInputObjectSchema as ThemeSumOrderByAggregateInputObjectSchema } from './ThemeSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  isDark: SortOrderSchema.optional(),
  variables: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => ThemeCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ThemeAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ThemeMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ThemeMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ThemeSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ThemeOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ThemeOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeOrderByWithAggregationInput>;
export const ThemeOrderByWithAggregationInputObjectZodSchema = makeSchema();
