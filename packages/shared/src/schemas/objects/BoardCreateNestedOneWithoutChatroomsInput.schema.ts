import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardCreateWithoutChatroomsInputObjectSchema as BoardCreateWithoutChatroomsInputObjectSchema } from './BoardCreateWithoutChatroomsInput.schema';
import { BoardUncheckedCreateWithoutChatroomsInputObjectSchema as BoardUncheckedCreateWithoutChatroomsInputObjectSchema } from './BoardUncheckedCreateWithoutChatroomsInput.schema';
import { BoardCreateOrConnectWithoutChatroomsInputObjectSchema as BoardCreateOrConnectWithoutChatroomsInputObjectSchema } from './BoardCreateOrConnectWithoutChatroomsInput.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BoardCreateWithoutChatroomsInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutChatroomsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BoardCreateOrConnectWithoutChatroomsInputObjectSchema).optional(),
  connect: z.lazy(() => BoardWhereUniqueInputObjectSchema).optional()
}).strict();
export const BoardCreateNestedOneWithoutChatroomsInputObjectSchema: z.ZodType<Prisma.BoardCreateNestedOneWithoutChatroomsInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardCreateNestedOneWithoutChatroomsInput>;
export const BoardCreateNestedOneWithoutChatroomsInputObjectZodSchema = makeSchema();
