import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { BoardCountOrderByAggregateInputObjectSchema as BoardCountOrderByAggregateInputObjectSchema } from './BoardCountOrderByAggregateInput.schema';
import { BoardAvgOrderByAggregateInputObjectSchema as BoardAvgOrderByAggregateInputObjectSchema } from './BoardAvgOrderByAggregateInput.schema';
import { BoardMaxOrderByAggregateInputObjectSchema as BoardMaxOrderByAggregateInputObjectSchema } from './BoardMaxOrderByAggregateInput.schema';
import { BoardMinOrderByAggregateInputObjectSchema as BoardMinOrderByAggregateInputObjectSchema } from './BoardMinOrderByAggregateInput.schema';
import { BoardSumOrderByAggregateInputObjectSchema as BoardSumOrderByAggregateInputObjectSchema } from './BoardSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  logo: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isOfficial: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  metadata: SortOrderSchema.optional(),
  themeId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => BoardCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => BoardAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => BoardMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => BoardMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => BoardSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const BoardOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.BoardOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardOrderByWithAggregationInput>;
export const BoardOrderByWithAggregationInputObjectZodSchema = makeSchema();
