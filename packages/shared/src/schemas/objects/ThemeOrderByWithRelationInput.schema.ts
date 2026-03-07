import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { UserOrderByRelationAggregateInputObjectSchema as UserOrderByRelationAggregateInputObjectSchema } from './UserOrderByRelationAggregateInput.schema';
import { BoardOrderByRelationAggregateInputObjectSchema as BoardOrderByRelationAggregateInputObjectSchema } from './BoardOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  isDark: SortOrderSchema.optional(),
  variables: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  usersUsing: z.lazy(() => UserOrderByRelationAggregateInputObjectSchema).optional(),
  boardsUsing: z.lazy(() => BoardOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ThemeOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ThemeOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeOrderByWithRelationInput>;
export const ThemeOrderByWithRelationInputObjectZodSchema = makeSchema();
