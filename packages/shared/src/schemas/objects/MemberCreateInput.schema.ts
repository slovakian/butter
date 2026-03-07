import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardCreateNestedOneWithoutMembersInputObjectSchema as BoardCreateNestedOneWithoutMembersInputObjectSchema } from './BoardCreateNestedOneWithoutMembersInput.schema';
import { UserCreateNestedOneWithoutMembersInputObjectSchema as UserCreateNestedOneWithoutMembersInputObjectSchema } from './UserCreateNestedOneWithoutMembersInput.schema'

const makeSchema = () => z.object({
  role: z.string().optional(),
  createdAt: z.coerce.date(),
  board: z.lazy(() => BoardCreateNestedOneWithoutMembersInputObjectSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutMembersInputObjectSchema)
}).strict();
export const MemberCreateInputObjectSchema: z.ZodType<Prisma.MemberCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateInput>;
export const MemberCreateInputObjectZodSchema = makeSchema();
