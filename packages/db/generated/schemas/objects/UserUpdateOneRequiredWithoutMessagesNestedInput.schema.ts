import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { UserCreateWithoutMessagesInputObjectSchema as UserCreateWithoutMessagesInputObjectSchema } from './UserCreateWithoutMessagesInput.schema';
import { UserUncheckedCreateWithoutMessagesInputObjectSchema as UserUncheckedCreateWithoutMessagesInputObjectSchema } from './UserUncheckedCreateWithoutMessagesInput.schema';
import { UserCreateOrConnectWithoutMessagesInputObjectSchema as UserCreateOrConnectWithoutMessagesInputObjectSchema } from './UserCreateOrConnectWithoutMessagesInput.schema';
import { UserUpsertWithoutMessagesInputObjectSchema as UserUpsertWithoutMessagesInputObjectSchema } from './UserUpsertWithoutMessagesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutMessagesInputObjectSchema as UserUpdateToOneWithWhereWithoutMessagesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutMessagesInput.schema';
import { UserUpdateWithoutMessagesInputObjectSchema as UserUpdateWithoutMessagesInputObjectSchema } from './UserUpdateWithoutMessagesInput.schema';
import { UserUncheckedUpdateWithoutMessagesInputObjectSchema as UserUncheckedUpdateWithoutMessagesInputObjectSchema } from './UserUncheckedUpdateWithoutMessagesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutMessagesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMessagesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMessagesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMessagesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutMessagesInputObjectSchema), z.lazy(() => UserUpdateWithoutMessagesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMessagesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutMessagesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMessagesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutMessagesNestedInput>;
export const UserUpdateOneRequiredWithoutMessagesNestedInputObjectZodSchema = makeSchema();
