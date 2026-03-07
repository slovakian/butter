import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  boardId: z.literal(true).optional(),
  email: z.literal(true).optional(),
  role: z.literal(true).optional(),
  status: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  inviterId: z.literal(true).optional()
}).strict();
export const InvitationMinAggregateInputObjectSchema: z.ZodType<Prisma.InvitationMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.InvitationMinAggregateInputType>;
export const InvitationMinAggregateInputObjectZodSchema = makeSchema();
