import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  pageNumber: SortOrderSchema.optional(),
  chatroomId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const MessageCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MessageCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageCountOrderByAggregateInput>;
export const MessageCountOrderByAggregateInputObjectZodSchema = makeSchema();
