import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  boardId: z.number().int(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  inviterId: z.number().int()
}).strict();
export const InvitationUncheckedCreateInputObjectSchema: z.ZodType<Prisma.InvitationUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationUncheckedCreateInput>;
export const InvitationUncheckedCreateInputObjectZodSchema = makeSchema();
