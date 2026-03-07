import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './ThemeWhereUniqueInput.schema';
import { ThemeCreateWithoutUsersUsingInputObjectSchema as ThemeCreateWithoutUsersUsingInputObjectSchema } from './ThemeCreateWithoutUsersUsingInput.schema';
import { ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema as ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema } from './ThemeUncheckedCreateWithoutUsersUsingInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ThemeCreateWithoutUsersUsingInputObjectSchema), z.lazy(() => ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema)])
}).strict();
export const ThemeCreateOrConnectWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeCreateOrConnectWithoutUsersUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateOrConnectWithoutUsersUsingInput>;
export const ThemeCreateOrConnectWithoutUsersUsingInputObjectZodSchema = makeSchema();
