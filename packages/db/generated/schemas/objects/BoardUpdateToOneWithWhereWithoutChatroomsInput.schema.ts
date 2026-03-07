import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './BoardWhereInput.schema';
import { BoardUpdateWithoutChatroomsInputObjectSchema as BoardUpdateWithoutChatroomsInputObjectSchema } from './BoardUpdateWithoutChatroomsInput.schema';
import { BoardUncheckedUpdateWithoutChatroomsInputObjectSchema as BoardUncheckedUpdateWithoutChatroomsInputObjectSchema } from './BoardUncheckedUpdateWithoutChatroomsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BoardWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => BoardUpdateWithoutChatroomsInputObjectSchema), z.lazy(() => BoardUncheckedUpdateWithoutChatroomsInputObjectSchema)])
}).strict();
export const BoardUpdateToOneWithWhereWithoutChatroomsInputObjectSchema: z.ZodType<Prisma.BoardUpdateToOneWithWhereWithoutChatroomsInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateToOneWithWhereWithoutChatroomsInput>;
export const BoardUpdateToOneWithWhereWithoutChatroomsInputObjectZodSchema = makeSchema();
