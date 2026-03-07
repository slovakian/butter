import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { ChatroomCreateWithoutMessagesInputObjectSchema as ChatroomCreateWithoutMessagesInputObjectSchema } from './ChatroomCreateWithoutMessagesInput.schema';
import { ChatroomUncheckedCreateWithoutMessagesInputObjectSchema as ChatroomUncheckedCreateWithoutMessagesInputObjectSchema } from './ChatroomUncheckedCreateWithoutMessagesInput.schema';
import { ChatroomCreateOrConnectWithoutMessagesInputObjectSchema as ChatroomCreateOrConnectWithoutMessagesInputObjectSchema } from './ChatroomCreateOrConnectWithoutMessagesInput.schema';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './ChatroomWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ChatroomCreateWithoutMessagesInputObjectSchema), z.lazy(() => ChatroomUncheckedCreateWithoutMessagesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ChatroomCreateOrConnectWithoutMessagesInputObjectSchema).optional(),
  connect: z.lazy(() => ChatroomWhereUniqueInputObjectSchema).optional()
}).strict();
export const ChatroomCreateNestedOneWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatroomCreateNestedOneWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomCreateNestedOneWithoutMessagesInput>;
export const ChatroomCreateNestedOneWithoutMessagesInputObjectZodSchema = makeSchema();
