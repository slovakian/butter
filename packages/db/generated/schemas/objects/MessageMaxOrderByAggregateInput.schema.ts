import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  pageNumber: SortOrderSchema.optional(),
  chatroomId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const MessageMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MessageMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageMaxOrderByAggregateInput>;
export const MessageMaxOrderByAggregateInputObjectZodSchema = makeSchema();
