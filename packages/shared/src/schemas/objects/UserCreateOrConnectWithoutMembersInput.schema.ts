import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutMembersInputObjectSchema as UserCreateWithoutMembersInputObjectSchema } from './UserCreateWithoutMembersInput.schema';
import { UserUncheckedCreateWithoutMembersInputObjectSchema as UserUncheckedCreateWithoutMembersInputObjectSchema } from './UserUncheckedCreateWithoutMembersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutMembersInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMembersInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutMembersInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutMembersInput>;
export const UserCreateOrConnectWithoutMembersInputObjectZodSchema = makeSchema();
