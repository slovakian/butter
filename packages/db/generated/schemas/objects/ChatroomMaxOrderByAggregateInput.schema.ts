import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  boardId: SortOrderSchema.optional()
}).strict();
export const ChatroomMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ChatroomMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomMaxOrderByAggregateInput>;
export const ChatroomMaxOrderByAggregateInputObjectZodSchema = makeSchema();
