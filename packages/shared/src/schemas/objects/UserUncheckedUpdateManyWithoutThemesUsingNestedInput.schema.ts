import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { UserCreateWithoutThemesUsingInputObjectSchema as UserCreateWithoutThemesUsingInputObjectSchema } from './UserCreateWithoutThemesUsingInput.schema';
import { UserUncheckedCreateWithoutThemesUsingInputObjectSchema as UserUncheckedCreateWithoutThemesUsingInputObjectSchema } from './UserUncheckedCreateWithoutThemesUsingInput.schema';
import { UserCreateOrConnectWithoutThemesUsingInputObjectSchema as UserCreateOrConnectWithoutThemesUsingInputObjectSchema } from './UserCreateOrConnectWithoutThemesUsingInput.schema';
import { UserUpsertWithWhereUniqueWithoutThemesUsingInputObjectSchema as UserUpsertWithWhereUniqueWithoutThemesUsingInputObjectSchema } from './UserUpsertWithWhereUniqueWithoutThemesUsingInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithWhereUniqueWithoutThemesUsingInputObjectSchema as UserUpdateWithWhereUniqueWithoutThemesUsingInputObjectSchema } from './UserUpdateWithWhereUniqueWithoutThemesUsingInput.schema';
import { UserUpdateManyWithWhereWithoutThemesUsingInputObjectSchema as UserUpdateManyWithWhereWithoutThemesUsingInputObjectSchema } from './UserUpdateManyWithWhereWithoutThemesUsingInput.schema';
import { UserScalarWhereInputObjectSchema as UserScalarWhereInputObjectSchema } from './UserScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutThemesUsingInputObjectSchema), z.lazy(() => UserCreateWithoutThemesUsingInputObjectSchema).array(), z.lazy(() => UserUncheckedCreateWithoutThemesUsingInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutThemesUsingInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => UserCreateOrConnectWithoutThemesUsingInputObjectSchema), z.lazy(() => UserCreateOrConnectWithoutThemesUsingInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => UserUpsertWithWhereUniqueWithoutThemesUsingInputObjectSchema), z.lazy(() => UserUpsertWithWhereUniqueWithoutThemesUsingInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => UserUpdateWithWhereUniqueWithoutThemesUsingInputObjectSchema), z.lazy(() => UserUpdateWithWhereUniqueWithoutThemesUsingInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => UserUpdateManyWithWhereWithoutThemesUsingInputObjectSchema), z.lazy(() => UserUpdateManyWithWhereWithoutThemesUsingInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => UserScalarWhereInputObjectSchema), z.lazy(() => UserScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const UserUncheckedUpdateManyWithoutThemesUsingNestedInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutThemesUsingNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateManyWithoutThemesUsingNestedInput>;
export const UserUncheckedUpdateManyWithoutThemesUsingNestedInputObjectZodSchema = makeSchema();
