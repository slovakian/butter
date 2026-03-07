import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { MessageCountOrderByAggregateInputObjectSchema as MessageCountOrderByAggregateInputObjectSchema } from './MessageCountOrderByAggregateInput.schema';
import { MessageAvgOrderByAggregateInputObjectSchema as MessageAvgOrderByAggregateInputObjectSchema } from './MessageAvgOrderByAggregateInput.schema';
import { MessageMaxOrderByAggregateInputObjectSchema as MessageMaxOrderByAggregateInputObjectSchema } from './MessageMaxOrderByAggregateInput.schema';
import { MessageMinOrderByAggregateInputObjectSchema as MessageMinOrderByAggregateInputObjectSchema } from './MessageMinOrderByAggregateInput.schema';
import { MessageSumOrderByAggregateInputObjectSchema as MessageSumOrderByAggregateInputObjectSchema } from './MessageSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  pageNumber: SortOrderSchema.optional(),
  chatroomId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  _count: z.lazy(() => MessageCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => MessageAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => MessageMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => MessageMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => MessageSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const MessageOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.MessageOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageOrderByWithAggregationInput>;
export const MessageOrderByWithAggregationInputObjectZodSchema = makeSchema();
