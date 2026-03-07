import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './ChatroomWhereUniqueInput.schema';
import { ChatroomCreateWithoutBoardInputObjectSchema as ChatroomCreateWithoutBoardInputObjectSchema } from './ChatroomCreateWithoutBoardInput.schema';
import { ChatroomUncheckedCreateWithoutBoardInputObjectSchema as ChatroomUncheckedCreateWithoutBoardInputObjectSchema } from './ChatroomUncheckedCreateWithoutBoardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatroomWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ChatroomCreateWithoutBoardInputObjectSchema), z.lazy(() => ChatroomUncheckedCreateWithoutBoardInputObjectSchema)])
}).strict();
export const ChatroomCreateOrConnectWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomCreateOrConnectWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomCreateOrConnectWithoutBoardInput>;
export const ChatroomCreateOrConnectWithoutBoardInputObjectZodSchema = makeSchema();
