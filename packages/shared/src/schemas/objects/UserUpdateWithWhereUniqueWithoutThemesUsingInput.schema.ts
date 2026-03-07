import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutThemesUsingInputObjectSchema as UserUpdateWithoutThemesUsingInputObjectSchema } from './UserUpdateWithoutThemesUsingInput.schema';
import { UserUncheckedUpdateWithoutThemesUsingInputObjectSchema as UserUncheckedUpdateWithoutThemesUsingInputObjectSchema } from './UserUncheckedUpdateWithoutThemesUsingInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => UserUpdateWithoutThemesUsingInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutThemesUsingInputObjectSchema)])
}).strict();
export const UserUpdateWithWhereUniqueWithoutThemesUsingInputObjectSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutThemesUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutThemesUsingInput>;
export const UserUpdateWithWhereUniqueWithoutThemesUsingInputObjectZodSchema = makeSchema();
