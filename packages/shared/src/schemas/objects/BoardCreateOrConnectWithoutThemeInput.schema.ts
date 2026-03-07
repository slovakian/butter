import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema';
import { BoardCreateWithoutThemeInputObjectSchema as BoardCreateWithoutThemeInputObjectSchema } from './BoardCreateWithoutThemeInput.schema';
import { BoardUncheckedCreateWithoutThemeInputObjectSchema as BoardUncheckedCreateWithoutThemeInputObjectSchema } from './BoardUncheckedCreateWithoutThemeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BoardWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => BoardCreateWithoutThemeInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutThemeInputObjectSchema)])
}).strict();
export const BoardCreateOrConnectWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardCreateOrConnectWithoutThemeInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardCreateOrConnectWithoutThemeInput>;
export const BoardCreateOrConnectWithoutThemeInputObjectZodSchema = makeSchema();
