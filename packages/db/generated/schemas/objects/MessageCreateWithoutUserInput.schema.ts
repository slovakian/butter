import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { ChatroomCreateNestedOneWithoutMessagesInputObjectSchema as ChatroomCreateNestedOneWithoutMessagesInputObjectSchema } from './ChatroomCreateNestedOneWithoutMessagesInput.schema'

const makeSchema = () => z.object({
  content: z.string(),
  pageNumber: z.number().int(),
  chatroom: z.lazy(() => ChatroomCreateNestedOneWithoutMessagesInputObjectSchema)
}).strict();
export const MessageCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageCreateWithoutUserInput>;
export const MessageCreateWithoutUserInputObjectZodSchema = makeSchema();
