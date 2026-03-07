import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional()
}).strict();
export const VerificationAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.VerificationAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationAvgOrderByAggregateInput>;
export const VerificationAvgOrderByAggregateInputObjectZodSchema = makeSchema();
