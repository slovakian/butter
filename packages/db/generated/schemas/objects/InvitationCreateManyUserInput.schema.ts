import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  boardId: z.number().int(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();
export const InvitationCreateManyUserInputObjectSchema: z.ZodType<Prisma.InvitationCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateManyUserInput>;
export const InvitationCreateManyUserInputObjectZodSchema = makeSchema();
