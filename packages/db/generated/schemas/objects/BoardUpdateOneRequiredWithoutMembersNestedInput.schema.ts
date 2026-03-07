import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { BoardCreateWithoutMembersInputObjectSchema as BoardCreateWithoutMembersInputObjectSchema } from './BoardCreateWithoutMembersInput.schema';
import { BoardUncheckedCreateWithoutMembersInputObjectSchema as BoardUncheckedCreateWithoutMembersInputObjectSchema } from './BoardUncheckedCreateWithoutMembersInput.schema';
import { BoardCreateOrConnectWithoutMembersInputObjectSchema as BoardCreateOrConnectWithoutMembersInputObjectSchema } from './BoardCreateOrConnectWithoutMembersInput.schema';
import { BoardUpsertWithoutMembersInputObjectSchema as BoardUpsertWithoutMembersInputObjectSchema } from './BoardUpsertWithoutMembersInput.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema';
import { BoardUpdateToOneWithWhereWithoutMembersInputObjectSchema as BoardUpdateToOneWithWhereWithoutMembersInputObjectSchema } from './BoardUpdateToOneWithWhereWithoutMembersInput.schema';
import { BoardUpdateWithoutMembersInputObjectSchema as BoardUpdateWithoutMembersInputObjectSchema } from './BoardUpdateWithoutMembersInput.schema';
import { BoardUncheckedUpdateWithoutMembersInputObjectSchema as BoardUncheckedUpdateWithoutMembersInputObjectSchema } from './BoardUncheckedUpdateWithoutMembersInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BoardCreateWithoutMembersInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutMembersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => BoardCreateOrConnectWithoutMembersInputObjectSchema).optional(),
  upsert: z.lazy(() => BoardUpsertWithoutMembersInputObjectSchema).optional(),
  connect: z.lazy(() => BoardWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => BoardUpdateToOneWithWhereWithoutMembersInputObjectSchema), z.lazy(() => BoardUpdateWithoutMembersInputObjectSchema), z.lazy(() => BoardUncheckedUpdateWithoutMembersInputObjectSchema)]).optional()
}).strict();
export const BoardUpdateOneRequiredWithoutMembersNestedInputObjectSchema: z.ZodType<Prisma.BoardUpdateOneRequiredWithoutMembersNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateOneRequiredWithoutMembersNestedInput>;
export const BoardUpdateOneRequiredWithoutMembersNestedInputObjectZodSchema = makeSchema();
