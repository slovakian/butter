import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { BoardUpdateWithoutMembersInputObjectSchema as BoardUpdateWithoutMembersInputObjectSchema } from './BoardUpdateWithoutMembersInput.schema';
import { BoardUncheckedUpdateWithoutMembersInputObjectSchema as BoardUncheckedUpdateWithoutMembersInputObjectSchema } from './BoardUncheckedUpdateWithoutMembersInput.schema';
import { BoardCreateWithoutMembersInputObjectSchema as BoardCreateWithoutMembersInputObjectSchema } from './BoardCreateWithoutMembersInput.schema';
import { BoardUncheckedCreateWithoutMembersInputObjectSchema as BoardUncheckedCreateWithoutMembersInputObjectSchema } from './BoardUncheckedCreateWithoutMembersInput.schema';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './BoardWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => BoardUpdateWithoutMembersInputObjectSchema), z.lazy(() => BoardUncheckedUpdateWithoutMembersInputObjectSchema)]),
  create: z.union([z.lazy(() => BoardCreateWithoutMembersInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutMembersInputObjectSchema)]),
  where: z.lazy(() => BoardWhereInputObjectSchema).optional()
}).strict();
export const BoardUpsertWithoutMembersInputObjectSchema: z.ZodType<Prisma.BoardUpsertWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpsertWithoutMembersInput>;
export const BoardUpsertWithoutMembersInputObjectZodSchema = makeSchema();
