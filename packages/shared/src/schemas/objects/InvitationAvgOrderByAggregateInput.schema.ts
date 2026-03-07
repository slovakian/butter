import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  boardId: SortOrderSchema.optional(),
  inviterId: SortOrderSchema.optional()
}).strict();
export const InvitationAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.InvitationAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationAvgOrderByAggregateInput>;
export const InvitationAvgOrderByAggregateInputObjectZodSchema = makeSchema();
