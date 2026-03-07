import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema';
import { BoardUpdateWithoutThemeInputObjectSchema as BoardUpdateWithoutThemeInputObjectSchema } from './BoardUpdateWithoutThemeInput.schema';
import { BoardUncheckedUpdateWithoutThemeInputObjectSchema as BoardUncheckedUpdateWithoutThemeInputObjectSchema } from './BoardUncheckedUpdateWithoutThemeInput.schema';
import { BoardCreateWithoutThemeInputObjectSchema as BoardCreateWithoutThemeInputObjectSchema } from './BoardCreateWithoutThemeInput.schema';
import { BoardUncheckedCreateWithoutThemeInputObjectSchema as BoardUncheckedCreateWithoutThemeInputObjectSchema } from './BoardUncheckedCreateWithoutThemeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BoardWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => BoardUpdateWithoutThemeInputObjectSchema), z.lazy(() => BoardUncheckedUpdateWithoutThemeInputObjectSchema)]),
  create: z.union([z.lazy(() => BoardCreateWithoutThemeInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutThemeInputObjectSchema)])
}).strict();
export const BoardUpsertWithWhereUniqueWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardUpsertWithWhereUniqueWithoutThemeInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpsertWithWhereUniqueWithoutThemeInput>;
export const BoardUpsertWithWhereUniqueWithoutThemeInputObjectZodSchema = makeSchema();
