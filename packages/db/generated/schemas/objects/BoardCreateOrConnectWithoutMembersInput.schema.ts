import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema';
import { BoardCreateWithoutMembersInputObjectSchema as BoardCreateWithoutMembersInputObjectSchema } from './BoardCreateWithoutMembersInput.schema';
import { BoardUncheckedCreateWithoutMembersInputObjectSchema as BoardUncheckedCreateWithoutMembersInputObjectSchema } from './BoardUncheckedCreateWithoutMembersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BoardWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => BoardCreateWithoutMembersInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutMembersInputObjectSchema)])
}).strict();
export const BoardCreateOrConnectWithoutMembersInputObjectSchema: z.ZodType<Prisma.BoardCreateOrConnectWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardCreateOrConnectWithoutMembersInput>;
export const BoardCreateOrConnectWithoutMembersInputObjectZodSchema = makeSchema();
