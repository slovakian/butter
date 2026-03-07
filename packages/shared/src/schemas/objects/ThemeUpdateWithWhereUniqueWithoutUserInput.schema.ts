import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './ThemeWhereUniqueInput.schema';
import { ThemeUpdateWithoutUserInputObjectSchema as ThemeUpdateWithoutUserInputObjectSchema } from './ThemeUpdateWithoutUserInput.schema';
import { ThemeUncheckedUpdateWithoutUserInputObjectSchema as ThemeUncheckedUpdateWithoutUserInputObjectSchema } from './ThemeUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ThemeUpdateWithoutUserInputObjectSchema), z.lazy(() => ThemeUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const ThemeUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ThemeUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateWithWhereUniqueWithoutUserInput>;
export const ThemeUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
