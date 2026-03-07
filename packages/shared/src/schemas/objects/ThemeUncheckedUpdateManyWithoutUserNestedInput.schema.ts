import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeCreateWithoutUserInputObjectSchema as ThemeCreateWithoutUserInputObjectSchema } from './ThemeCreateWithoutUserInput.schema';
import { ThemeUncheckedCreateWithoutUserInputObjectSchema as ThemeUncheckedCreateWithoutUserInputObjectSchema } from './ThemeUncheckedCreateWithoutUserInput.schema';
import { ThemeCreateOrConnectWithoutUserInputObjectSchema as ThemeCreateOrConnectWithoutUserInputObjectSchema } from './ThemeCreateOrConnectWithoutUserInput.schema';
import { ThemeUpsertWithWhereUniqueWithoutUserInputObjectSchema as ThemeUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ThemeUpsertWithWhereUniqueWithoutUserInput.schema';
import { ThemeCreateManyUserInputEnvelopeObjectSchema as ThemeCreateManyUserInputEnvelopeObjectSchema } from './ThemeCreateManyUserInputEnvelope.schema';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './ThemeWhereUniqueInput.schema';
import { ThemeUpdateWithWhereUniqueWithoutUserInputObjectSchema as ThemeUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ThemeUpdateWithWhereUniqueWithoutUserInput.schema';
import { ThemeUpdateManyWithWhereWithoutUserInputObjectSchema as ThemeUpdateManyWithWhereWithoutUserInputObjectSchema } from './ThemeUpdateManyWithWhereWithoutUserInput.schema';
import { ThemeScalarWhereInputObjectSchema as ThemeScalarWhereInputObjectSchema } from './ThemeScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ThemeCreateWithoutUserInputObjectSchema), z.lazy(() => ThemeCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ThemeUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ThemeUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ThemeCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ThemeCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ThemeUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ThemeUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ThemeCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ThemeWhereUniqueInputObjectSchema), z.lazy(() => ThemeWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ThemeWhereUniqueInputObjectSchema), z.lazy(() => ThemeWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ThemeWhereUniqueInputObjectSchema), z.lazy(() => ThemeWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ThemeWhereUniqueInputObjectSchema), z.lazy(() => ThemeWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ThemeUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ThemeUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ThemeUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ThemeUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ThemeScalarWhereInputObjectSchema), z.lazy(() => ThemeScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ThemeUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ThemeUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUncheckedUpdateManyWithoutUserNestedInput>;
export const ThemeUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
