import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutMessagesInputObjectSchema as UserUpdateWithoutMessagesInputObjectSchema } from './UserUpdateWithoutMessagesInput.schema';
import { UserUncheckedUpdateWithoutMessagesInputObjectSchema as UserUncheckedUpdateWithoutMessagesInputObjectSchema } from './UserUncheckedUpdateWithoutMessagesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutMessagesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMessagesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutMessagesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMessagesInput>;
export const UserUpdateToOneWithWhereWithoutMessagesInputObjectZodSchema = makeSchema();
