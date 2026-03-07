import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { UserCreateWithoutMembersInputObjectSchema as UserCreateWithoutMembersInputObjectSchema } from './UserCreateWithoutMembersInput.schema';
import { UserUncheckedCreateWithoutMembersInputObjectSchema as UserUncheckedCreateWithoutMembersInputObjectSchema } from './UserUncheckedCreateWithoutMembersInput.schema';
import { UserCreateOrConnectWithoutMembersInputObjectSchema as UserCreateOrConnectWithoutMembersInputObjectSchema } from './UserCreateOrConnectWithoutMembersInput.schema';
import { UserUpsertWithoutMembersInputObjectSchema as UserUpsertWithoutMembersInputObjectSchema } from './UserUpsertWithoutMembersInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutMembersInputObjectSchema as UserUpdateToOneWithWhereWithoutMembersInputObjectSchema } from './UserUpdateToOneWithWhereWithoutMembersInput.schema';
import { UserUpdateWithoutMembersInputObjectSchema as UserUpdateWithoutMembersInputObjectSchema } from './UserUpdateWithoutMembersInput.schema';
import { UserUncheckedUpdateWithoutMembersInputObjectSchema as UserUncheckedUpdateWithoutMembersInputObjectSchema } from './UserUncheckedUpdateWithoutMembersInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutMembersInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMembersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMembersInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMembersInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutMembersInputObjectSchema), z.lazy(() => UserUpdateWithoutMembersInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMembersInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutMembersNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMembersNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutMembersNestedInput>;
export const UserUpdateOneRequiredWithoutMembersNestedInputObjectZodSchema = makeSchema();
