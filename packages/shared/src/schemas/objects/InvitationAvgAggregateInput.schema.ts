import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  boardId: z.literal(true).optional(),
  inviterId: z.literal(true).optional()
}).strict();
export const InvitationAvgAggregateInputObjectSchema: z.ZodType<Prisma.InvitationAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InvitationAvgAggregateInputType>;
export const InvitationAvgAggregateInputObjectZodSchema = makeSchema();
