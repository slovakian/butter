import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { UserCreateWithoutMembersInputObjectSchema as UserCreateWithoutMembersInputObjectSchema } from './UserCreateWithoutMembersInput.schema';
import { UserUncheckedCreateWithoutMembersInputObjectSchema as UserUncheckedCreateWithoutMembersInputObjectSchema } from './UserUncheckedCreateWithoutMembersInput.schema';
import { UserCreateOrConnectWithoutMembersInputObjectSchema as UserCreateOrConnectWithoutMembersInputObjectSchema } from './UserCreateOrConnectWithoutMembersInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutMembersInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMembersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMembersInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutMembersInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutMembersInput>;
export const UserCreateNestedOneWithoutMembersInputObjectZodSchema = makeSchema();
