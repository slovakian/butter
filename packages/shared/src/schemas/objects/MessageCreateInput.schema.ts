import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ChatroomCreateNestedOneWithoutMessagesInputObjectSchema as ChatroomCreateNestedOneWithoutMessagesInputObjectSchema } from './ChatroomCreateNestedOneWithoutMessagesInput.schema';
import { UserCreateNestedOneWithoutMessagesInputObjectSchema as UserCreateNestedOneWithoutMessagesInputObjectSchema } from './UserCreateNestedOneWithoutMessagesInput.schema'

const makeSchema = () => z.object({
  content: z.string(),
  pageNumber: z.number().int(),
  chatroom: z.lazy(() => ChatroomCreateNestedOneWithoutMessagesInputObjectSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutMessagesInputObjectSchema)
}).strict();
export const MessageCreateInputObjectSchema: z.ZodType<Prisma.MessageCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageCreateInput>;
export const MessageCreateInputObjectZodSchema = makeSchema();
