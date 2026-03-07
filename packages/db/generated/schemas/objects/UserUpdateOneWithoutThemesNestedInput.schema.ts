import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { UserCreateWithoutThemesInputObjectSchema as UserCreateWithoutThemesInputObjectSchema } from './UserCreateWithoutThemesInput.schema';
import { UserUncheckedCreateWithoutThemesInputObjectSchema as UserUncheckedCreateWithoutThemesInputObjectSchema } from './UserUncheckedCreateWithoutThemesInput.schema';
import { UserCreateOrConnectWithoutThemesInputObjectSchema as UserCreateOrConnectWithoutThemesInputObjectSchema } from './UserCreateOrConnectWithoutThemesInput.schema';
import { UserUpsertWithoutThemesInputObjectSchema as UserUpsertWithoutThemesInputObjectSchema } from './UserUpsertWithoutThemesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutThemesInputObjectSchema as UserUpdateToOneWithWhereWithoutThemesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutThemesInput.schema';
import { UserUpdateWithoutThemesInputObjectSchema as UserUpdateWithoutThemesInputObjectSchema } from './UserUpdateWithoutThemesInput.schema';
import { UserUncheckedUpdateWithoutThemesInputObjectSchema as UserUncheckedUpdateWithoutThemesInputObjectSchema } from './UserUncheckedUpdateWithoutThemesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutThemesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutThemesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutThemesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutThemesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutThemesInputObjectSchema), z.lazy(() => UserUpdateWithoutThemesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutThemesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutThemesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutThemesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutThemesNestedInput>;
export const UserUpdateOneWithoutThemesNestedInputObjectZodSchema = makeSchema();
