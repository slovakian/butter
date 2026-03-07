import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ChatroomUpdateWithoutMessagesInputObjectSchema as ChatroomUpdateWithoutMessagesInputObjectSchema } from './ChatroomUpdateWithoutMessagesInput.schema';
import { ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema as ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema } from './ChatroomUncheckedUpdateWithoutMessagesInput.schema';
import { ChatroomCreateWithoutMessagesInputObjectSchema as ChatroomCreateWithoutMessagesInputObjectSchema } from './ChatroomCreateWithoutMessagesInput.schema';
import { ChatroomUncheckedCreateWithoutMessagesInputObjectSchema as ChatroomUncheckedCreateWithoutMessagesInputObjectSchema } from './ChatroomUncheckedCreateWithoutMessagesInput.schema';
import { ChatroomWhereInputObjectSchema as ChatroomWhereInputObjectSchema } from './ChatroomWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ChatroomUpdateWithoutMessagesInputObjectSchema), z.lazy(() => ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema)]),
  create: z.union([z.lazy(() => ChatroomCreateWithoutMessagesInputObjectSchema), z.lazy(() => ChatroomUncheckedCreateWithoutMessagesInputObjectSchema)]),
  where: z.lazy(() => ChatroomWhereInputObjectSchema).optional()
}).strict();
export const ChatroomUpsertWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatroomUpsertWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpsertWithoutMessagesInput>;
export const ChatroomUpsertWithoutMessagesInputObjectZodSchema = makeSchema();
