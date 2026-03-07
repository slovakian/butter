import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardCreateWithoutThemeInputObjectSchema as BoardCreateWithoutThemeInputObjectSchema } from './BoardCreateWithoutThemeInput.schema';
import { BoardUncheckedCreateWithoutThemeInputObjectSchema as BoardUncheckedCreateWithoutThemeInputObjectSchema } from './BoardUncheckedCreateWithoutThemeInput.schema';
import { BoardCreateOrConnectWithoutThemeInputObjectSchema as BoardCreateOrConnectWithoutThemeInputObjectSchema } from './BoardCreateOrConnectWithoutThemeInput.schema';
import { BoardCreateManyThemeInputEnvelopeObjectSchema as BoardCreateManyThemeInputEnvelopeObjectSchema } from './BoardCreateManyThemeInputEnvelope.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BoardCreateWithoutThemeInputObjectSchema), z.lazy(() => BoardCreateWithoutThemeInputObjectSchema).array(), z.lazy(() => BoardUncheckedCreateWithoutThemeInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutThemeInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BoardCreateOrConnectWithoutThemeInputObjectSchema), z.lazy(() => BoardCreateOrConnectWithoutThemeInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => BoardCreateManyThemeInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => BoardWhereUniqueInputObjectSchema), z.lazy(() => BoardWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const BoardUncheckedCreateNestedManyWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardUncheckedCreateNestedManyWithoutThemeInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUncheckedCreateNestedManyWithoutThemeInput>;
export const BoardUncheckedCreateNestedManyWithoutThemeInputObjectZodSchema = makeSchema();
