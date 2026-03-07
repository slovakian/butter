import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { UserScalarWhereInputObjectSchema as UserScalarWhereInputObjectSchema } from './UserScalarWhereInput.schema';
import { UserUpdateManyMutationInputObjectSchema as UserUpdateManyMutationInputObjectSchema } from './UserUpdateManyMutationInput.schema';
import { UserUncheckedUpdateManyWithoutThemesUsingInputObjectSchema as UserUncheckedUpdateManyWithoutThemesUsingInputObjectSchema } from './UserUncheckedUpdateManyWithoutThemesUsingInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => UserUpdateManyMutationInputObjectSchema), z.lazy(() => UserUncheckedUpdateManyWithoutThemesUsingInputObjectSchema)])
}).strict();
export const UserUpdateManyWithWhereWithoutThemesUsingInputObjectSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutThemesUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateManyWithWhereWithoutThemesUsingInput>;
export const UserUpdateManyWithWhereWithoutThemesUsingInputObjectZodSchema = makeSchema();
