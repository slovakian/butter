import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema';
import { BoardCreateWithoutChatroomsInputObjectSchema as BoardCreateWithoutChatroomsInputObjectSchema } from './BoardCreateWithoutChatroomsInput.schema';
import { BoardUncheckedCreateWithoutChatroomsInputObjectSchema as BoardUncheckedCreateWithoutChatroomsInputObjectSchema } from './BoardUncheckedCreateWithoutChatroomsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BoardWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => BoardCreateWithoutChatroomsInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutChatroomsInputObjectSchema)])
}).strict();
export const BoardCreateOrConnectWithoutChatroomsInputObjectSchema: z.ZodType<Prisma.BoardCreateOrConnectWithoutChatroomsInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardCreateOrConnectWithoutChatroomsInput>;
export const BoardCreateOrConnectWithoutChatroomsInputObjectZodSchema = makeSchema();
