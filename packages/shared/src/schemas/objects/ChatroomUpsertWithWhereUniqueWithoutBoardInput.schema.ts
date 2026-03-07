import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './ChatroomWhereUniqueInput.schema';
import { ChatroomUpdateWithoutBoardInputObjectSchema as ChatroomUpdateWithoutBoardInputObjectSchema } from './ChatroomUpdateWithoutBoardInput.schema';
import { ChatroomUncheckedUpdateWithoutBoardInputObjectSchema as ChatroomUncheckedUpdateWithoutBoardInputObjectSchema } from './ChatroomUncheckedUpdateWithoutBoardInput.schema';
import { ChatroomCreateWithoutBoardInputObjectSchema as ChatroomCreateWithoutBoardInputObjectSchema } from './ChatroomCreateWithoutBoardInput.schema';
import { ChatroomUncheckedCreateWithoutBoardInputObjectSchema as ChatroomUncheckedCreateWithoutBoardInputObjectSchema } from './ChatroomUncheckedCreateWithoutBoardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatroomWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ChatroomUpdateWithoutBoardInputObjectSchema), z.lazy(() => ChatroomUncheckedUpdateWithoutBoardInputObjectSchema)]),
  create: z.union([z.lazy(() => ChatroomCreateWithoutBoardInputObjectSchema), z.lazy(() => ChatroomUncheckedCreateWithoutBoardInputObjectSchema)])
}).strict();
export const ChatroomUpsertWithWhereUniqueWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomUpsertWithWhereUniqueWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpsertWithWhereUniqueWithoutBoardInput>;
export const ChatroomUpsertWithWhereUniqueWithoutBoardInputObjectZodSchema = makeSchema();
