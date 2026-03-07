import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutMembersInputObjectSchema as UserUpdateWithoutMembersInputObjectSchema } from './UserUpdateWithoutMembersInput.schema';
import { UserUncheckedUpdateWithoutMembersInputObjectSchema as UserUncheckedUpdateWithoutMembersInputObjectSchema } from './UserUncheckedUpdateWithoutMembersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutMembersInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMembersInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutMembersInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMembersInput>;
export const UserUpdateToOneWithWhereWithoutMembersInputObjectZodSchema = makeSchema();
