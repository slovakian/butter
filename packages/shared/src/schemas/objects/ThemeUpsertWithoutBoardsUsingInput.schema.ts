import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeUpdateWithoutBoardsUsingInputObjectSchema as ThemeUpdateWithoutBoardsUsingInputObjectSchema } from './ThemeUpdateWithoutBoardsUsingInput.schema';
import { ThemeUncheckedUpdateWithoutBoardsUsingInputObjectSchema as ThemeUncheckedUpdateWithoutBoardsUsingInputObjectSchema } from './ThemeUncheckedUpdateWithoutBoardsUsingInput.schema';
import { ThemeCreateWithoutBoardsUsingInputObjectSchema as ThemeCreateWithoutBoardsUsingInputObjectSchema } from './ThemeCreateWithoutBoardsUsingInput.schema';
import { ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema as ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema } from './ThemeUncheckedCreateWithoutBoardsUsingInput.schema';
import { ThemeWhereInputObjectSchema as ThemeWhereInputObjectSchema } from './ThemeWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ThemeUpdateWithoutBoardsUsingInputObjectSchema), z.lazy(() => ThemeUncheckedUpdateWithoutBoardsUsingInputObjectSchema)]),
  create: z.union([z.lazy(() => ThemeCreateWithoutBoardsUsingInputObjectSchema), z.lazy(() => ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema)]),
  where: z.lazy(() => ThemeWhereInputObjectSchema).optional()
}).strict();
export const ThemeUpsertWithoutBoardsUsingInputObjectSchema: z.ZodType<Prisma.ThemeUpsertWithoutBoardsUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUpsertWithoutBoardsUsingInput>;
export const ThemeUpsertWithoutBoardsUsingInputObjectZodSchema = makeSchema();
