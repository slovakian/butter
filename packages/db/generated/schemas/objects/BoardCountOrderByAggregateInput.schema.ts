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
export const BoardCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BoardCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardCountOrderByAggregateInput>;
export const BoardCountOrderByAggregateInputObjectZodSchema = makeSchema();
