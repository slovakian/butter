import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './ChatroomWhereUniqueInput.schema';
import { ChatroomUpdateWithoutBoardInputObjectSchema as ChatroomUpdateWithoutBoardInputObjectSchema } from './ChatroomUpdateWithoutBoardInput.schema';
import { ChatroomUncheckedUpdateWithoutBoardInputObjectSchema as ChatroomUncheckedUpdateWithoutBoardInputObjectSchema } from './ChatroomUncheckedUpdateWithoutBoardInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatroomWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ChatroomUpdateWithoutBoardInputObjectSchema), z.lazy(() => ChatroomUncheckedUpdateWithoutBoardInputObjectSchema)])
}).strict();
export const ChatroomUpdateWithWhereUniqueWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateWithWhereUniqueWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateWithWhereUniqueWithoutBoardInput>;
export const ChatroomUpdateWithWhereUniqueWithoutBoardInputObjectZodSchema = makeSchema();
