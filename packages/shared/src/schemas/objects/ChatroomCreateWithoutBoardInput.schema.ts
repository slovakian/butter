import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MessageCreateNestedManyWithoutChatroomInputObjectSchema as MessageCreateNestedManyWithoutChatroomInputObjectSchema } from './MessageCreateNestedManyWithoutChatroomInput.schema'

const makeSchema = () => z.object({
  name: z.string(),
  slug: z.string(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutChatroomInputObjectSchema).optional()
}).strict();
export const ChatroomCreateWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomCreateWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomCreateWithoutBoardInput>;
export const ChatroomCreateWithoutBoardInputObjectZodSchema = makeSchema();
