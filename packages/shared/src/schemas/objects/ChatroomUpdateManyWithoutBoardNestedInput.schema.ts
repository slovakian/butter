import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ChatroomCreateWithoutBoardInputObjectSchema as ChatroomCreateWithoutBoardInputObjectSchema } from './ChatroomCreateWithoutBoardInput.schema';
import { ChatroomUncheckedCreateWithoutBoardInputObjectSchema as ChatroomUncheckedCreateWithoutBoardInputObjectSchema } from './ChatroomUncheckedCreateWithoutBoardInput.schema';
import { ChatroomCreateOrConnectWithoutBoardInputObjectSchema as ChatroomCreateOrConnectWithoutBoardInputObjectSchema } from './ChatroomCreateOrConnectWithoutBoardInput.schema';
import { ChatroomUpsertWithWhereUniqueWithoutBoardInputObjectSchema as ChatroomUpsertWithWhereUniqueWithoutBoardInputObjectSchema } from './ChatroomUpsertWithWhereUniqueWithoutBoardInput.schema';
import { ChatroomCreateManyBoardInputEnvelopeObjectSchema as ChatroomCreateManyBoardInputEnvelopeObjectSchema } from './ChatroomCreateManyBoardInputEnvelope.schema';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './ChatroomWhereUniqueInput.schema';
import { ChatroomUpdateWithWhereUniqueWithoutBoardInputObjectSchema as ChatroomUpdateWithWhereUniqueWithoutBoardInputObjectSchema } from './ChatroomUpdateWithWhereUniqueWithoutBoardInput.schema';
import { ChatroomUpdateManyWithWhereWithoutBoardInputObjectSchema as ChatroomUpdateManyWithWhereWithoutBoardInputObjectSchema } from './ChatroomUpdateManyWithWhereWithoutBoardInput.schema';
import { ChatroomScalarWhereInputObjectSchema as ChatroomScalarWhereInputObjectSchema } from './ChatroomScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ChatroomCreateWithoutBoardInputObjectSchema), z.lazy(() => ChatroomCreateWithoutBoardInputObjectSchema).array(), z.lazy(() => ChatroomUncheckedCreateWithoutBoardInputObjectSchema), z.lazy(() => ChatroomUncheckedCreateWithoutBoardInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ChatroomCreateOrConnectWithoutBoardInputObjectSchema), z.lazy(() => ChatroomCreateOrConnectWithoutBoardInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ChatroomUpsertWithWhereUniqueWithoutBoardInputObjectSchema), z.lazy(() => ChatroomUpsertWithWhereUniqueWithoutBoardInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ChatroomCreateManyBoardInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ChatroomWhereUniqueInputObjectSchema), z.lazy(() => ChatroomWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ChatroomWhereUniqueInputObjectSchema), z.lazy(() => ChatroomWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ChatroomWhereUniqueInputObjectSchema), z.lazy(() => ChatroomWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ChatroomWhereUniqueInputObjectSchema), z.lazy(() => ChatroomWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ChatroomUpdateWithWhereUniqueWithoutBoardInputObjectSchema), z.lazy(() => ChatroomUpdateWithWhereUniqueWithoutBoardInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ChatroomUpdateManyWithWhereWithoutBoardInputObjectSchema), z.lazy(() => ChatroomUpdateManyWithWhereWithoutBoardInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ChatroomScalarWhereInputObjectSchema), z.lazy(() => ChatroomScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ChatroomUpdateManyWithoutBoardNestedInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateManyWithoutBoardNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateManyWithoutBoardNestedInput>;
export const ChatroomUpdateManyWithoutBoardNestedInputObjectZodSchema = makeSchema();
