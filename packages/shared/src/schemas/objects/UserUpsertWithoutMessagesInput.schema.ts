import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { UserUpdateWithoutMessagesInputObjectSchema as UserUpdateWithoutMessagesInputObjectSchema } from './UserUpdateWithoutMessagesInput.schema';
import { UserUncheckedUpdateWithoutMessagesInputObjectSchema as UserUncheckedUpdateWithoutMessagesInputObjectSchema } from './UserUncheckedUpdateWithoutMessagesInput.schema';
import { UserCreateWithoutMessagesInputObjectSchema as UserCreateWithoutMessagesInputObjectSchema } from './UserCreateWithoutMessagesInput.schema';
import { UserUncheckedCreateWithoutMessagesInputObjectSchema as UserUncheckedCreateWithoutMessagesInputObjectSchema } from './UserUncheckedCreateWithoutMessagesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutMessagesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMessagesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutMessagesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMessagesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutMessagesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutMessagesInput>;
export const UserUpsertWithoutMessagesInputObjectZodSchema = makeSchema();
