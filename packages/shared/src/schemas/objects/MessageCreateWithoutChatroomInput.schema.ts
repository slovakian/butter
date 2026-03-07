import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { UserCreateNestedOneWithoutMessagesInputObjectSchema as UserCreateNestedOneWithoutMessagesInputObjectSchema } from './UserCreateNestedOneWithoutMessagesInput.schema'

const makeSchema = () => z.object({
  content: z.string(),
  pageNumber: z.number().int(),
  user: z.lazy(() => UserCreateNestedOneWithoutMessagesInputObjectSchema)
}).strict();
export const MessageCreateWithoutChatroomInputObjectSchema: z.ZodType<Prisma.MessageCreateWithoutChatroomInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageCreateWithoutChatroomInput>;
export const MessageCreateWithoutChatroomInputObjectZodSchema = makeSchema();
