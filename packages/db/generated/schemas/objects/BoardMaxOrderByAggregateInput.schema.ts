import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  logo: SortOrderSchema.optional(),
  isOfficial: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  metadata: SortOrderSchema.optional(),
  themeId: SortOrderSchema.optional()
}).strict();
export const BoardMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BoardMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardMaxOrderByAggregateInput>;
export const BoardMaxOrderByAggregateInputObjectZodSchema = makeSchema();
