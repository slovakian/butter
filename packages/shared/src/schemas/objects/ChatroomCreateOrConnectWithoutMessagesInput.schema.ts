import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './ChatroomWhereUniqueInput.schema';
import { ChatroomCreateWithoutMessagesInputObjectSchema as ChatroomCreateWithoutMessagesInputObjectSchema } from './ChatroomCreateWithoutMessagesInput.schema';
import { ChatroomUncheckedCreateWithoutMessagesInputObjectSchema as ChatroomUncheckedCreateWithoutMessagesInputObjectSchema } from './ChatroomUncheckedCreateWithoutMessagesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatroomWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ChatroomCreateWithoutMessagesInputObjectSchema), z.lazy(() => ChatroomUncheckedCreateWithoutMessagesInputObjectSchema)])
}).strict();
export const ChatroomCreateOrConnectWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatroomCreateOrConnectWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomCreateOrConnectWithoutMessagesInput>;
export const ChatroomCreateOrConnectWithoutMessagesInputObjectZodSchema = makeSchema();
