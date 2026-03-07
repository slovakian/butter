import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardCreateNestedOneWithoutInvitationsInputObjectSchema as BoardCreateNestedOneWithoutInvitationsInputObjectSchema } from './BoardCreateNestedOneWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  board: z.lazy(() => BoardCreateNestedOneWithoutInvitationsInputObjectSchema)
}).strict();
export const InvitationCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.InvitationCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateWithoutUserInput>;
export const InvitationCreateWithoutUserInputObjectZodSchema = makeSchema();
