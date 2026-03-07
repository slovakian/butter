import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MessageUncheckedCreateNestedManyWithoutChatroomInputObjectSchema as MessageUncheckedCreateNestedManyWithoutChatroomInputObjectSchema } from './MessageUncheckedCreateNestedManyWithoutChatroomInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  slug: z.string(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutChatroomInputObjectSchema).optional()
}).strict();
export const ChatroomUncheckedCreateWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomUncheckedCreateWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUncheckedCreateWithoutBoardInput>;
export const ChatroomUncheckedCreateWithoutBoardInputObjectZodSchema = makeSchema();
