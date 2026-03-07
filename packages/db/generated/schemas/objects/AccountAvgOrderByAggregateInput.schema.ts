import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const AccountAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountAvgOrderByAggregateInput>;
export const AccountAvgOrderByAggregateInputObjectZodSchema = makeSchema();
