import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeCreateWithoutUsersUsingInputObjectSchema as ThemeCreateWithoutUsersUsingInputObjectSchema } from './ThemeCreateWithoutUsersUsingInput.schema';
import { ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema as ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema } from './ThemeUncheckedCreateWithoutUsersUsingInput.schema';
import { ThemeCreateOrConnectWithoutUsersUsingInputObjectSchema as ThemeCreateOrConnectWithoutUsersUsingInputObjectSchema } from './ThemeCreateOrConnectWithoutUsersUsingInput.schema';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './ThemeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ThemeCreateWithoutUsersUsingInputObjectSchema), z.lazy(() => ThemeCreateWithoutUsersUsingInputObjectSchema).array(), z.lazy(() => ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema), z.lazy(() => ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ThemeCreateOrConnectWithoutUsersUsingInputObjectSchema), z.lazy(() => ThemeCreateOrConnectWithoutUsersUsingInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ThemeWhereUniqueInputObjectSchema), z.lazy(() => ThemeWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ThemeUncheckedCreateNestedManyWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeUncheckedCreateNestedManyWithoutUsersUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUncheckedCreateNestedManyWithoutUsersUsingInput>;
export const ThemeUncheckedCreateNestedManyWithoutUsersUsingInputObjectZodSchema = makeSchema();
