import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  boardId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const MemberAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MemberAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberAvgOrderByAggregateInput>;
export const MemberAvgOrderByAggregateInputObjectZodSchema = makeSchema();
