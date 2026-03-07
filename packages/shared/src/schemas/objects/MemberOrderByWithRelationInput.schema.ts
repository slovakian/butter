import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { BoardOrderByWithRelationInputObjectSchema as BoardOrderByWithRelationInputObjectSchema } from './BoardOrderByWithRelationInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  boardId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  board: z.lazy(() => BoardOrderByWithRelationInputObjectSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const MemberOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.MemberOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberOrderByWithRelationInput>;
export const MemberOrderByWithRelationInputObjectZodSchema = makeSchema();
