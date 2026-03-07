import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { UserUpdateWithoutMembersInputObjectSchema as UserUpdateWithoutMembersInputObjectSchema } from './UserUpdateWithoutMembersInput.schema';
import { UserUncheckedUpdateWithoutMembersInputObjectSchema as UserUncheckedUpdateWithoutMembersInputObjectSchema } from './UserUncheckedUpdateWithoutMembersInput.schema';
import { UserCreateWithoutMembersInputObjectSchema as UserCreateWithoutMembersInputObjectSchema } from './UserCreateWithoutMembersInput.schema';
import { UserUncheckedCreateWithoutMembersInputObjectSchema as UserUncheckedCreateWithoutMembersInputObjectSchema } from './UserUncheckedCreateWithoutMembersInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutMembersInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMembersInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutMembersInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMembersInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutMembersInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutMembersInput>;
export const UserUpsertWithoutMembersInputObjectZodSchema = makeSchema();
