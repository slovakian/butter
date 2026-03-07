import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { VerificationCountOrderByAggregateInputObjectSchema as VerificationCountOrderByAggregateInputObjectSchema } from './VerificationCountOrderByAggregateInput.schema';
import { VerificationAvgOrderByAggregateInputObjectSchema as VerificationAvgOrderByAggregateInputObjectSchema } from './VerificationAvgOrderByAggregateInput.schema';
import { VerificationMaxOrderByAggregateInputObjectSchema as VerificationMaxOrderByAggregateInputObjectSchema } from './VerificationMaxOrderByAggregateInput.schema';
import { VerificationMinOrderByAggregateInputObjectSchema as VerificationMinOrderByAggregateInputObjectSchema } from './VerificationMinOrderByAggregateInput.schema';
import { VerificationSumOrderByAggregateInputObjectSchema as VerificationSumOrderByAggregateInputObjectSchema } from './VerificationSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  identifier: SortOrderSchema.optional(),
  value: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => VerificationCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => VerificationAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => VerificationMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => VerificationMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => VerificationSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const VerificationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.VerificationOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationOrderByWithAggregationInput>;
export const VerificationOrderByWithAggregationInputObjectZodSchema = makeSchema();
