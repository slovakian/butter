import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const SessionSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SessionSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionSumOrderByAggregateInput>;
export const SessionSumOrderByAggregateInputObjectZodSchema = makeSchema();
