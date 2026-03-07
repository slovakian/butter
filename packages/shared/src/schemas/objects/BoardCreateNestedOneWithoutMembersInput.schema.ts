import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardCreateWithoutMembersInputObjectSchema as BoardCreateWithoutMembersInputObjectSchema } from './BoardCreateWithoutMembersInput.schema';
import { BoardUncheckedCreateWithoutMembersInputObjectSchema as BoardUncheckedCreateWithoutMembersInputObjectSchema } from './BoardUncheckedCreateWithoutMembersInput.schema';
import { BoardCreateOrConnectWithoutMembersInputObjectSchema as BoardCreateOrConnectWithoutMembersInputObjectSchema } from './BoardCreateOrConnectWithoutMembersInput.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BoardCreateWithoutMembersInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutMembersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BoardCreateOrConnectWithoutMembersInputObjectSchema).optional(),
  connect: z.lazy(() => BoardWhereUniqueInputObjectSchema).optional()
}).strict();
export const BoardCreateNestedOneWithoutMembersInputObjectSchema: z.ZodType<Prisma.BoardCreateNestedOneWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardCreateNestedOneWithoutMembersInput>;
export const BoardCreateNestedOneWithoutMembersInputObjectZodSchema = makeSchema();
