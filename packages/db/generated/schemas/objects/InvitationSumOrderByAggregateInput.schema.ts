import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  boardId: SortOrderSchema.optional(),
  inviterId: SortOrderSchema.optional()
}).strict();
export const InvitationSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InvitationSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationSumOrderByAggregateInput>;
export const InvitationSumOrderByAggregateInputObjectZodSchema = makeSchema();
