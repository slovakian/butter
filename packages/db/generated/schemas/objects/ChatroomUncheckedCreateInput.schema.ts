import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MessageUncheckedCreateNestedManyWithoutChatroomInputObjectSchema as MessageUncheckedCreateNestedManyWithoutChatroomInputObjectSchema } from './MessageUncheckedCreateNestedManyWithoutChatroomInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  slug: z.string(),
  boardId: z.number().int(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutChatroomInputObjectSchema).optional()
}).strict();
export const ChatroomUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ChatroomUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUncheckedCreateInput>;
export const ChatroomUncheckedCreateInputObjectZodSchema = makeSchema();
