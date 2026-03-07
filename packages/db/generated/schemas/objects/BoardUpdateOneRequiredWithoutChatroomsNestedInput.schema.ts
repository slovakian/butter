import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { BoardCreateWithoutChatroomsInputObjectSchema as BoardCreateWithoutChatroomsInputObjectSchema } from './BoardCreateWithoutChatroomsInput.schema';
import { BoardUncheckedCreateWithoutChatroomsInputObjectSchema as BoardUncheckedCreateWithoutChatroomsInputObjectSchema } from './BoardUncheckedCreateWithoutChatroomsInput.schema';
import { BoardCreateOrConnectWithoutChatroomsInputObjectSchema as BoardCreateOrConnectWithoutChatroomsInputObjectSchema } from './BoardCreateOrConnectWithoutChatroomsInput.schema';
import { BoardUpsertWithoutChatroomsInputObjectSchema as BoardUpsertWithoutChatroomsInputObjectSchema } from './BoardUpsertWithoutChatroomsInput.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema';
import { BoardUpdateToOneWithWhereWithoutChatroomsInputObjectSchema as BoardUpdateToOneWithWhereWithoutChatroomsInputObjectSchema } from './BoardUpdateToOneWithWhereWithoutChatroomsInput.schema';
import { BoardUpdateWithoutChatroomsInputObjectSchema as BoardUpdateWithoutChatroomsInputObjectSchema } from './BoardUpdateWithoutChatroomsInput.schema';
import { BoardUncheckedUpdateWithoutChatroomsInputObjectSchema as BoardUncheckedUpdateWithoutChatroomsInputObjectSchema } from './BoardUncheckedUpdateWithoutChatroomsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BoardCreateWithoutChatroomsInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutChatroomsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BoardCreateOrConnectWithoutChatroomsInputObjectSchema).optional(),
  upsert: z.lazy(() => BoardUpsertWithoutChatroomsInputObjectSchema).optional(),
  connect: z.lazy(() => BoardWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => BoardUpdateToOneWithWhereWithoutChatroomsInputObjectSchema), z.lazy(() => BoardUpdateWithoutChatroomsInputObjectSchema), z.lazy(() => BoardUncheckedUpdateWithoutChatroomsInputObjectSchema)]).optional()
}).strict();
export const BoardUpdateOneRequiredWithoutChatroomsNestedInputObjectSchema: z.ZodType<Prisma.BoardUpdateOneRequiredWithoutChatroomsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateOneRequiredWithoutChatroomsNestedInput>;
export const BoardUpdateOneRequiredWithoutChatroomsNestedInputObjectZodSchema = makeSchema();
