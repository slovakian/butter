import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { BoardUpdateWithoutInvitationsInputObjectSchema as BoardUpdateWithoutInvitationsInputObjectSchema } from './BoardUpdateWithoutInvitationsInput.schema';
import { BoardUncheckedUpdateWithoutInvitationsInputObjectSchema as BoardUncheckedUpdateWithoutInvitationsInputObjectSchema } from './BoardUncheckedUpdateWithoutInvitationsInput.schema';
import { BoardCreateWithoutInvitationsInputObjectSchema as BoardCreateWithoutInvitationsInputObjectSchema } from './BoardCreateWithoutInvitationsInput.schema';
import { BoardUncheckedCreateWithoutInvitationsInputObjectSchema as BoardUncheckedCreateWithoutInvitationsInputObjectSchema } from './BoardUncheckedCreateWithoutInvitationsInput.schema';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './BoardWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => BoardUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => BoardUncheckedUpdateWithoutInvitationsInputObjectSchema)]),
  create: z.union([z.lazy(() => BoardCreateWithoutInvitationsInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutInvitationsInputObjectSchema)]),
  where: z.lazy(() => BoardWhereInputObjectSchema).optional()
}).strict();
export const BoardUpsertWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.BoardUpsertWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpsertWithoutInvitationsInput>;
export const BoardUpsertWithoutInvitationsInputObjectZodSchema = makeSchema();
