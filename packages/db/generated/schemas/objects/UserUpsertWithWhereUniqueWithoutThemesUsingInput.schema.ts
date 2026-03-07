import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutThemesUsingInputObjectSchema as UserUpdateWithoutThemesUsingInputObjectSchema } from './UserUpdateWithoutThemesUsingInput.schema';
import { UserUncheckedUpdateWithoutThemesUsingInputObjectSchema as UserUncheckedUpdateWithoutThemesUsingInputObjectSchema } from './UserUncheckedUpdateWithoutThemesUsingInput.schema';
import { UserCreateWithoutThemesUsingInputObjectSchema as UserCreateWithoutThemesUsingInputObjectSchema } from './UserCreateWithoutThemesUsingInput.schema';
import { UserUncheckedCreateWithoutThemesUsingInputObjectSchema as UserUncheckedCreateWithoutThemesUsingInputObjectSchema } from './UserUncheckedCreateWithoutThemesUsingInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => UserUpdateWithoutThemesUsingInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutThemesUsingInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutThemesUsingInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutThemesUsingInputObjectSchema)])
}).strict();
export const UserUpsertWithWhereUniqueWithoutThemesUsingInputObjectSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutThemesUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutThemesUsingInput>;
export const UserUpsertWithWhereUniqueWithoutThemesUsingInputObjectZodSchema = makeSchema();
