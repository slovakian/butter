import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  themeId: SortOrderSchema.optional()
}).strict();
export const BoardAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BoardAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardAvgOrderByAggregateInput>;
export const BoardAvgOrderByAggregateInputObjectZodSchema = makeSchema();
