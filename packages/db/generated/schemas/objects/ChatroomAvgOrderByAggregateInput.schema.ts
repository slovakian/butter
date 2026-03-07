import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  boardId: SortOrderSchema.optional()
}).strict();
export const ChatroomAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ChatroomAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomAvgOrderByAggregateInput>;
export const ChatroomAvgOrderByAggregateInputObjectZodSchema = makeSchema();
