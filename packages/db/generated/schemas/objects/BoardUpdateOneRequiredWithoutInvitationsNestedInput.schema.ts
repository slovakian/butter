import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { BoardCreateWithoutInvitationsInputObjectSchema as BoardCreateWithoutInvitationsInputObjectSchema } from './BoardCreateWithoutInvitationsInput.schema';
import { BoardUncheckedCreateWithoutInvitationsInputObjectSchema as BoardUncheckedCreateWithoutInvitationsInputObjectSchema } from './BoardUncheckedCreateWithoutInvitationsInput.schema';
import { BoardCreateOrConnectWithoutInvitationsInputObjectSchema as BoardCreateOrConnectWithoutInvitationsInputObjectSchema } from './BoardCreateOrConnectWithoutInvitationsInput.schema';
import { BoardUpsertWithoutInvitationsInputObjectSchema as BoardUpsertWithoutInvitationsInputObjectSchema } from './BoardUpsertWithoutInvitationsInput.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema';
import { BoardUpdateToOneWithWhereWithoutInvitationsInputObjectSchema as BoardUpdateToOneWithWhereWithoutInvitationsInputObjectSchema } from './BoardUpdateToOneWithWhereWithoutInvitationsInput.schema';
import { BoardUpdateWithoutInvitationsInputObjectSchema as BoardUpdateWithoutInvitationsInputObjectSchema } from './BoardUpdateWithoutInvitationsInput.schema';
import { BoardUncheckedUpdateWithoutInvitationsInputObjectSchema as BoardUncheckedUpdateWithoutInvitationsInputObjectSchema } from './BoardUncheckedUpdateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BoardCreateWithoutInvitationsInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutInvitationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BoardCreateOrConnectWithoutInvitationsInputObjectSchema).optional(),
  upsert: z.lazy(() => BoardUpsertWithoutInvitationsInputObjectSchema).optional(),
  connect: z.lazy(() => BoardWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => BoardUpdateToOneWithWhereWithoutInvitationsInputObjectSchema), z.lazy(() => BoardUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => BoardUncheckedUpdateWithoutInvitationsInputObjectSchema)]).optional()
}).strict();
export const BoardUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema: z.ZodType<Prisma.BoardUpdateOneRequiredWithoutInvitationsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateOneRequiredWithoutInvitationsNestedInput>;
export const BoardUpdateOneRequiredWithoutInvitationsNestedInputObjectZodSchema = makeSchema();
