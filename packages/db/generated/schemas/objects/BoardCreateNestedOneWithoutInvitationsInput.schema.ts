import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { BoardCreateWithoutInvitationsInputObjectSchema as BoardCreateWithoutInvitationsInputObjectSchema } from './BoardCreateWithoutInvitationsInput.schema';
import { BoardUncheckedCreateWithoutInvitationsInputObjectSchema as BoardUncheckedCreateWithoutInvitationsInputObjectSchema } from './BoardUncheckedCreateWithoutInvitationsInput.schema';
import { BoardCreateOrConnectWithoutInvitationsInputObjectSchema as BoardCreateOrConnectWithoutInvitationsInputObjectSchema } from './BoardCreateOrConnectWithoutInvitationsInput.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BoardCreateWithoutInvitationsInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutInvitationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BoardCreateOrConnectWithoutInvitationsInputObjectSchema).optional(),
  connect: z.lazy(() => BoardWhereUniqueInputObjectSchema).optional()
}).strict();
export const BoardCreateNestedOneWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.BoardCreateNestedOneWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardCreateNestedOneWithoutInvitationsInput>;
export const BoardCreateNestedOneWithoutInvitationsInputObjectZodSchema = makeSchema();
