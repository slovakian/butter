import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardUpdateWithoutChatroomsInputObjectSchema as BoardUpdateWithoutChatroomsInputObjectSchema } from './BoardUpdateWithoutChatroomsInput.schema';
import { BoardUncheckedUpdateWithoutChatroomsInputObjectSchema as BoardUncheckedUpdateWithoutChatroomsInputObjectSchema } from './BoardUncheckedUpdateWithoutChatroomsInput.schema';
import { BoardCreateWithoutChatroomsInputObjectSchema as BoardCreateWithoutChatroomsInputObjectSchema } from './BoardCreateWithoutChatroomsInput.schema';
import { BoardUncheckedCreateWithoutChatroomsInputObjectSchema as BoardUncheckedCreateWithoutChatroomsInputObjectSchema } from './BoardUncheckedCreateWithoutChatroomsInput.schema';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './BoardWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => BoardUpdateWithoutChatroomsInputObjectSchema), z.lazy(() => BoardUncheckedUpdateWithoutChatroomsInputObjectSchema)]),
  create: z.union([z.lazy(() => BoardCreateWithoutChatroomsInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutChatroomsInputObjectSchema)]),
  where: z.lazy(() => BoardWhereInputObjectSchema).optional()
}).strict();
export const BoardUpsertWithoutChatroomsInputObjectSchema: z.ZodType<Prisma.BoardUpsertWithoutChatroomsInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpsertWithoutChatroomsInput>;
export const BoardUpsertWithoutChatroomsInputObjectZodSchema = makeSchema();
