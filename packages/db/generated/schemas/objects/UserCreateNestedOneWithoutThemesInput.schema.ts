import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { UserCreateWithoutThemesInputObjectSchema as UserCreateWithoutThemesInputObjectSchema } from './UserCreateWithoutThemesInput.schema';
import { UserUncheckedCreateWithoutThemesInputObjectSchema as UserUncheckedCreateWithoutThemesInputObjectSchema } from './UserUncheckedCreateWithoutThemesInput.schema';
import { UserCreateOrConnectWithoutThemesInputObjectSchema as UserCreateOrConnectWithoutThemesInputObjectSchema } from './UserCreateOrConnectWithoutThemesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutThemesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutThemesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutThemesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutThemesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutThemesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutThemesInput>;
export const UserCreateNestedOneWithoutThemesInputObjectZodSchema = makeSchema();
