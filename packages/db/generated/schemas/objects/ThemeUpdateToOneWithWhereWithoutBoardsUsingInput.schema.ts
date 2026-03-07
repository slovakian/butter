import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { ThemeWhereInputObjectSchema as ThemeWhereInputObjectSchema } from './ThemeWhereInput.schema';
import { ThemeUpdateWithoutBoardsUsingInputObjectSchema as ThemeUpdateWithoutBoardsUsingInputObjectSchema } from './ThemeUpdateWithoutBoardsUsingInput.schema';
import { ThemeUncheckedUpdateWithoutBoardsUsingInputObjectSchema as ThemeUncheckedUpdateWithoutBoardsUsingInputObjectSchema } from './ThemeUncheckedUpdateWithoutBoardsUsingInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ThemeWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ThemeUpdateWithoutBoardsUsingInputObjectSchema), z.lazy(() => ThemeUncheckedUpdateWithoutBoardsUsingInputObjectSchema)])
}).strict();
export const ThemeUpdateToOneWithWhereWithoutBoardsUsingInputObjectSchema: z.ZodType<Prisma.ThemeUpdateToOneWithWhereWithoutBoardsUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateToOneWithWhereWithoutBoardsUsingInput>;
export const ThemeUpdateToOneWithWhereWithoutBoardsUsingInputObjectZodSchema = makeSchema();
