import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutThemesInputObjectSchema as UserUpdateWithoutThemesInputObjectSchema } from './UserUpdateWithoutThemesInput.schema';
import { UserUncheckedUpdateWithoutThemesInputObjectSchema as UserUncheckedUpdateWithoutThemesInputObjectSchema } from './UserUncheckedUpdateWithoutThemesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutThemesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutThemesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutThemesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutThemesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutThemesInput>;
export const UserUpdateToOneWithWhereWithoutThemesInputObjectZodSchema = makeSchema();
