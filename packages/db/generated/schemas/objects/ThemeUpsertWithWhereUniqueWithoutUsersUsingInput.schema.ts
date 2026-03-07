import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './ThemeWhereUniqueInput.schema';
import { ThemeUpdateWithoutUsersUsingInputObjectSchema as ThemeUpdateWithoutUsersUsingInputObjectSchema } from './ThemeUpdateWithoutUsersUsingInput.schema';
import { ThemeUncheckedUpdateWithoutUsersUsingInputObjectSchema as ThemeUncheckedUpdateWithoutUsersUsingInputObjectSchema } from './ThemeUncheckedUpdateWithoutUsersUsingInput.schema';
import { ThemeCreateWithoutUsersUsingInputObjectSchema as ThemeCreateWithoutUsersUsingInputObjectSchema } from './ThemeCreateWithoutUsersUsingInput.schema';
import { ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema as ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema } from './ThemeUncheckedCreateWithoutUsersUsingInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ThemeUpdateWithoutUsersUsingInputObjectSchema), z.lazy(() => ThemeUncheckedUpdateWithoutUsersUsingInputObjectSchema)]),
  create: z.union([z.lazy(() => ThemeCreateWithoutUsersUsingInputObjectSchema), z.lazy(() => ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema)])
}).strict();
export const ThemeUpsertWithWhereUniqueWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeUpsertWithWhereUniqueWithoutUsersUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUpsertWithWhereUniqueWithoutUsersUsingInput>;
export const ThemeUpsertWithWhereUniqueWithoutUsersUsingInputObjectZodSchema = makeSchema();
