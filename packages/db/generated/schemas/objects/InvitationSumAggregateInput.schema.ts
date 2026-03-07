import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  boardId: z.literal(true).optional(),
  inviterId: z.literal(true).optional()
}).strict();
export const InvitationSumAggregateInputObjectSchema: z.ZodType<Prisma.InvitationSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InvitationSumAggregateInputType>;
export const InvitationSumAggregateInputObjectZodSchema = makeSchema();
