import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './BoardWhereInput.schema';
import { BoardUpdateWithoutMembersInputObjectSchema as BoardUpdateWithoutMembersInputObjectSchema } from './BoardUpdateWithoutMembersInput.schema';
import { BoardUncheckedUpdateWithoutMembersInputObjectSchema as BoardUncheckedUpdateWithoutMembersInputObjectSchema } from './BoardUncheckedUpdateWithoutMembersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BoardWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => BoardUpdateWithoutMembersInputObjectSchema), z.lazy(() => BoardUncheckedUpdateWithoutMembersInputObjectSchema)])
}).strict();
export const BoardUpdateToOneWithWhereWithoutMembersInputObjectSchema: z.ZodType<Prisma.BoardUpdateToOneWithWhereWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateToOneWithWhereWithoutMembersInput>;
export const BoardUpdateToOneWithWhereWithoutMembersInputObjectZodSchema = makeSchema();
