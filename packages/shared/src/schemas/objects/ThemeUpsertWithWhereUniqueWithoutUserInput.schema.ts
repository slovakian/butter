import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './ThemeWhereUniqueInput.schema';
import { ThemeUpdateWithoutUserInputObjectSchema as ThemeUpdateWithoutUserInputObjectSchema } from './ThemeUpdateWithoutUserInput.schema';
import { ThemeUncheckedUpdateWithoutUserInputObjectSchema as ThemeUncheckedUpdateWithoutUserInputObjectSchema } from './ThemeUncheckedUpdateWithoutUserInput.schema';
import { ThemeCreateWithoutUserInputObjectSchema as ThemeCreateWithoutUserInputObjectSchema } from './ThemeCreateWithoutUserInput.schema';
import { ThemeUncheckedCreateWithoutUserInputObjectSchema as ThemeUncheckedCreateWithoutUserInputObjectSchema } from './ThemeUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ThemeUpdateWithoutUserInputObjectSchema), z.lazy(() => ThemeUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ThemeCreateWithoutUserInputObjectSchema), z.lazy(() => ThemeUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ThemeUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ThemeUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUpsertWithWhereUniqueWithoutUserInput>;
export const ThemeUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
