import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { MemberCountOrderByAggregateInputObjectSchema as MemberCountOrderByAggregateInputObjectSchema } from './MemberCountOrderByAggregateInput.schema';
import { MemberAvgOrderByAggregateInputObjectSchema as MemberAvgOrderByAggregateInputObjectSchema } from './MemberAvgOrderByAggregateInput.schema';
import { MemberMaxOrderByAggregateInputObjectSchema as MemberMaxOrderByAggregateInputObjectSchema } from './MemberMaxOrderByAggregateInput.schema';
import { MemberMinOrderByAggregateInputObjectSchema as MemberMinOrderByAggregateInputObjectSchema } from './MemberMinOrderByAggregateInput.schema';
import { MemberSumOrderByAggregateInputObjectSchema as MemberSumOrderByAggregateInputObjectSchema } from './MemberSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  boardId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => MemberCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => MemberAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => MemberMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => MemberMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => MemberSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const MemberOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.MemberOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberOrderByWithAggregationInput>;
export const MemberOrderByWithAggregationInputObjectZodSchema = makeSchema();
