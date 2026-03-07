import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeScalarWhereInputObjectSchema as ThemeScalarWhereInputObjectSchema } from './ThemeScalarWhereInput.schema';
import { ThemeUpdateManyMutationInputObjectSchema as ThemeUpdateManyMutationInputObjectSchema } from './ThemeUpdateManyMutationInput.schema';
import { ThemeUncheckedUpdateManyWithoutUsersUsingInputObjectSchema as ThemeUncheckedUpdateManyWithoutUsersUsingInputObjectSchema } from './ThemeUncheckedUpdateManyWithoutUsersUsingInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ThemeScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ThemeUpdateManyMutationInputObjectSchema), z.lazy(() => ThemeUncheckedUpdateManyWithoutUsersUsingInputObjectSchema)])
}).strict();
export const ThemeUpdateManyWithWhereWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeUpdateManyWithWhereWithoutUsersUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateManyWithWhereWithoutUsersUsingInput>;
export const ThemeUpdateManyWithWhereWithoutUsersUsingInputObjectZodSchema = makeSchema();
