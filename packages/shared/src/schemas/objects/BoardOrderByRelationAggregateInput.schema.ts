import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const BoardOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.BoardOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardOrderByRelationAggregateInput>;
export const BoardOrderByRelationAggregateInputObjectZodSchema = makeSchema();
