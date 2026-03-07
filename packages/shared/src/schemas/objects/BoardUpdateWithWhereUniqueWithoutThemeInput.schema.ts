import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema';
import { BoardUpdateWithoutThemeInputObjectSchema as BoardUpdateWithoutThemeInputObjectSchema } from './BoardUpdateWithoutThemeInput.schema';
import { BoardUncheckedUpdateWithoutThemeInputObjectSchema as BoardUncheckedUpdateWithoutThemeInputObjectSchema } from './BoardUncheckedUpdateWithoutThemeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BoardWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => BoardUpdateWithoutThemeInputObjectSchema), z.lazy(() => BoardUncheckedUpdateWithoutThemeInputObjectSchema)])
}).strict();
export const BoardUpdateWithWhereUniqueWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardUpdateWithWhereUniqueWithoutThemeInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateWithWhereUniqueWithoutThemeInput>;
export const BoardUpdateWithWhereUniqueWithoutThemeInputObjectZodSchema = makeSchema();
