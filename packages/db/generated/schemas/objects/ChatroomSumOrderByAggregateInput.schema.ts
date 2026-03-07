import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  boardId: SortOrderSchema.optional()
}).strict();
export const ChatroomSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ChatroomSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomSumOrderByAggregateInput>;
export const ChatroomSumOrderByAggregateInputObjectZodSchema = makeSchema();
