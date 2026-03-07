import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const AccountSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountSumOrderByAggregateInput>;
export const AccountSumOrderByAggregateInputObjectZodSchema = makeSchema();
