import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardCreateWithoutThemeInputObjectSchema as BoardCreateWithoutThemeInputObjectSchema } from './BoardCreateWithoutThemeInput.schema';
import { BoardUncheckedCreateWithoutThemeInputObjectSchema as BoardUncheckedCreateWithoutThemeInputObjectSchema } from './BoardUncheckedCreateWithoutThemeInput.schema';
import { BoardCreateOrConnectWithoutThemeInputObjectSchema as BoardCreateOrConnectWithoutThemeInputObjectSchema } from './BoardCreateOrConnectWithoutThemeInput.schema';
import { BoardUpsertWithWhereUniqueWithoutThemeInputObjectSchema as BoardUpsertWithWhereUniqueWithoutThemeInputObjectSchema } from './BoardUpsertWithWhereUniqueWithoutThemeInput.schema';
import { BoardCreateManyThemeInputEnvelopeObjectSchema as BoardCreateManyThemeInputEnvelopeObjectSchema } from './BoardCreateManyThemeInputEnvelope.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './BoardWhereUniqueInput.schema';
import { BoardUpdateWithWhereUniqueWithoutThemeInputObjectSchema as BoardUpdateWithWhereUniqueWithoutThemeInputObjectSchema } from './BoardUpdateWithWhereUniqueWithoutThemeInput.schema';
import { BoardUpdateManyWithWhereWithoutThemeInputObjectSchema as BoardUpdateManyWithWhereWithoutThemeInputObjectSchema } from './BoardUpdateManyWithWhereWithoutThemeInput.schema';
import { BoardScalarWhereInputObjectSchema as BoardScalarWhereInputObjectSchema } from './BoardScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => BoardCreateWithoutThemeInputObjectSchema), z.lazy(() => BoardCreateWithoutThemeInputObjectSchema).array(), z.lazy(() => BoardUncheckedCreateWithoutThemeInputObjectSchema), z.lazy(() => BoardUncheckedCreateWithoutThemeInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => BoardCreateOrConnectWithoutThemeInputObjectSchema), z.lazy(() => BoardCreateOrConnectWithoutThemeInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => BoardUpsertWithWhereUniqueWithoutThemeInputObjectSchema), z.lazy(() => BoardUpsertWithWhereUniqueWithoutThemeInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => BoardCreateManyThemeInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => BoardWhereUniqueInputObjectSchema), z.lazy(() => BoardWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => BoardWhereUniqueInputObjectSchema), z.lazy(() => BoardWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => BoardWhereUniqueInputObjectSchema), z.lazy(() => BoardWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => BoardWhereUniqueInputObjectSchema), z.lazy(() => BoardWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => BoardUpdateWithWhereUniqueWithoutThemeInputObjectSchema), z.lazy(() => BoardUpdateWithWhereUniqueWithoutThemeInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => BoardUpdateManyWithWhereWithoutThemeInputObjectSchema), z.lazy(() => BoardUpdateManyWithWhereWithoutThemeInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => BoardScalarWhereInputObjectSchema), z.lazy(() => BoardScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const BoardUpdateManyWithoutThemeNestedInputObjectSchema: z.ZodType<Prisma.BoardUpdateManyWithoutThemeNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateManyWithoutThemeNestedInput>;
export const BoardUpdateManyWithoutThemeNestedInputObjectZodSchema = makeSchema();
