import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ChatroomOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ChatroomOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomOrderByRelationAggregateInput>;
export const ChatroomOrderByRelationAggregateInputObjectZodSchema = makeSchema();
