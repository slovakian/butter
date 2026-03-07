import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './ThemeWhereUniqueInput.schema';
import { ThemeUpdateWithoutUsersUsingInputObjectSchema as ThemeUpdateWithoutUsersUsingInputObjectSchema } from './ThemeUpdateWithoutUsersUsingInput.schema';
import { ThemeUncheckedUpdateWithoutUsersUsingInputObjectSchema as ThemeUncheckedUpdateWithoutUsersUsingInputObjectSchema } from './ThemeUncheckedUpdateWithoutUsersUsingInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ThemeUpdateWithoutUsersUsingInputObjectSchema), z.lazy(() => ThemeUncheckedUpdateWithoutUsersUsingInputObjectSchema)])
}).strict();
export const ThemeUpdateWithWhereUniqueWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeUpdateWithWhereUniqueWithoutUsersUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateWithWhereUniqueWithoutUsersUsingInput>;
export const ThemeUpdateWithWhereUniqueWithoutUsersUsingInputObjectZodSchema = makeSchema();
