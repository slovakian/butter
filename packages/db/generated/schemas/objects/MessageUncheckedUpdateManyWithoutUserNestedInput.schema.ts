import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MessageCreateWithoutUserInputObjectSchema as MessageCreateWithoutUserInputObjectSchema } from './MessageCreateWithoutUserInput.schema';
import { MessageUncheckedCreateWithoutUserInputObjectSchema as MessageUncheckedCreateWithoutUserInputObjectSchema } from './MessageUncheckedCreateWithoutUserInput.schema';
import { MessageCreateOrConnectWithoutUserInputObjectSchema as MessageCreateOrConnectWithoutUserInputObjectSchema } from './MessageCreateOrConnectWithoutUserInput.schema';
import { MessageUpsertWithWhereUniqueWithoutUserInputObjectSchema as MessageUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './MessageUpsertWithWhereUniqueWithoutUserInput.schema';
import { MessageCreateManyUserInputEnvelopeObjectSchema as MessageCreateManyUserInputEnvelopeObjectSchema } from './MessageCreateManyUserInputEnvelope.schema';
import { MessageWhereUniqueInputObjectSchema as MessageWhereUniqueInputObjectSchema } from './MessageWhereUniqueInput.schema';
import { MessageUpdateWithWhereUniqueWithoutUserInputObjectSchema as MessageUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './MessageUpdateWithWhereUniqueWithoutUserInput.schema';
import { MessageUpdateManyWithWhereWithoutUserInputObjectSchema as MessageUpdateManyWithWhereWithoutUserInputObjectSchema } from './MessageUpdateManyWithWhereWithoutUserInput.schema';
import { MessageScalarWhereInputObjectSchema as MessageScalarWhereInputObjectSchema } from './MessageScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => MessageCreateWithoutUserInputObjectSchema), z.lazy(() => MessageCreateWithoutUserInputObjectSchema).array(), z.lazy(() => MessageUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => MessageUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => MessageCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => MessageCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => MessageUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => MessageUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => MessageCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => MessageWhereUniqueInputObjectSchema), z.lazy(() => MessageWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => MessageWhereUniqueInputObjectSchema), z.lazy(() => MessageWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => MessageWhereUniqueInputObjectSchema), z.lazy(() => MessageWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => MessageWhereUniqueInputObjectSchema), z.lazy(() => MessageWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => MessageUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => MessageUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => MessageUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => MessageUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => MessageScalarWhereInputObjectSchema), z.lazy(() => MessageScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const MessageUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutUserNestedInput>;
export const MessageUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
