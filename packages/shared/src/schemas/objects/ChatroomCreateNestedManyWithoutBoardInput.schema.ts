import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ChatroomCreateWithoutBoardInputObjectSchema as ChatroomCreateWithoutBoardInputObjectSchema } from './ChatroomCreateWithoutBoardInput.schema';
import { ChatroomUncheckedCreateWithoutBoardInputObjectSchema as ChatroomUncheckedCreateWithoutBoardInputObjectSchema } from './ChatroomUncheckedCreateWithoutBoardInput.schema';
import { ChatroomCreateOrConnectWithoutBoardInputObjectSchema as ChatroomCreateOrConnectWithoutBoardInputObjectSchema } from './ChatroomCreateOrConnectWithoutBoardInput.schema';
import { ChatroomCreateManyBoardInputEnvelopeObjectSchema as ChatroomCreateManyBoardInputEnvelopeObjectSchema } from './ChatroomCreateManyBoardInputEnvelope.schema';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './ChatroomWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ChatroomCreateWithoutBoardInputObjectSchema), z.lazy(() => ChatroomCreateWithoutBoardInputObjectSchema).array(), z.lazy(() => ChatroomUncheckedCreateWithoutBoardInputObjectSchema), z.lazy(() => ChatroomUncheckedCreateWithoutBoardInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ChatroomCreateOrConnectWithoutBoardInputObjectSchema), z.lazy(() => ChatroomCreateOrConnectWithoutBoardInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ChatroomCreateManyBoardInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ChatroomWhereUniqueInputObjectSchema), z.lazy(() => ChatroomWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ChatroomCreateNestedManyWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomCreateNestedManyWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomCreateNestedManyWithoutBoardInput>;
export const ChatroomCreateNestedManyWithoutBoardInputObjectZodSchema = makeSchema();
