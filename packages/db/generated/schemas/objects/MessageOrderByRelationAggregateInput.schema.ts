import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const MessageOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.MessageOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageOrderByRelationAggregateInput>;
export const MessageOrderByRelationAggregateInputObjectZodSchema = makeSchema();
