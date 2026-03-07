import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { ThemeScalarWhereInputObjectSchema as ThemeScalarWhereInputObjectSchema } from './ThemeScalarWhereInput.schema';
import { ThemeUpdateManyMutationInputObjectSchema as ThemeUpdateManyMutationInputObjectSchema } from './ThemeUpdateManyMutationInput.schema';
import { ThemeUncheckedUpdateManyWithoutUserInputObjectSchema as ThemeUncheckedUpdateManyWithoutUserInputObjectSchema } from './ThemeUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ThemeScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ThemeUpdateManyMutationInputObjectSchema), z.lazy(() => ThemeUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const ThemeUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ThemeUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateManyWithWhereWithoutUserInput>;
export const ThemeUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
