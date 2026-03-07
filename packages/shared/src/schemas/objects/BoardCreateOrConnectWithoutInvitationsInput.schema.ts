import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema';
import { BoardCreateWithoutInvitationsInputObjectSchema as BoardCreateWithoutInvitationsInputObjectSchema } from './BoardCreateWithoutInvitationsInput.schema';
import { BoardUncheckedCreateWithoutInvitationsInputObjectSchema as BoardUncheckedCreateWithoutInvitationsInputObjectSchema } from './BoardUncheckedCreateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BoardWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => BoardCreateWithoutInvitationsInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutInvitationsInputObjectSchema)])
}).strict();
export const BoardCreateOrConnectWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.BoardCreateOrConnectWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardCreateOrConnectWithoutInvitationsInput>;
export const BoardCreateOrConnectWithoutInvitationsInputObjectZodSchema = makeSchema();
