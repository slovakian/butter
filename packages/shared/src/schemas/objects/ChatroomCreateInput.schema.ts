import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardCreateNestedOneWithoutChatroomsInputObjectSchema as BoardCreateNestedOneWithoutChatroomsInputObjectSchema } from './BoardCreateNestedOneWithoutChatroomsInput.schema';
import { MessageCreateNestedManyWithoutChatroomInputObjectSchema as MessageCreateNestedManyWithoutChatroomInputObjectSchema } from './MessageCreateNestedManyWithoutChatroomInput.schema'

const makeSchema = () => z.object({
  name: z.string(),
  slug: z.string(),
  board: z.lazy(() => BoardCreateNestedOneWithoutChatroomsInputObjectSchema),
  messages: z.lazy(() => MessageCreateNestedManyWithoutChatroomInputObjectSchema).optional()
}).strict();
export const ChatroomCreateInputObjectSchema: z.ZodType<Prisma.ChatroomCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomCreateInput>;
export const ChatroomCreateInputObjectZodSchema = makeSchema();
