import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { ChatroomWhereInputObjectSchema as ChatroomWhereInputObjectSchema } from './ChatroomWhereInput.schema';
import { ChatroomUpdateWithoutMessagesInputObjectSchema as ChatroomUpdateWithoutMessagesInputObjectSchema } from './ChatroomUpdateWithoutMessagesInput.schema';
import { ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema as ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema } from './ChatroomUncheckedUpdateWithoutMessagesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatroomWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ChatroomUpdateWithoutMessagesInputObjectSchema), z.lazy(() => ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema)])
}).strict();
export const ChatroomUpdateToOneWithWhereWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateToOneWithWhereWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateToOneWithWhereWithoutMessagesInput>;
export const ChatroomUpdateToOneWithWhereWithoutMessagesInputObjectZodSchema = makeSchema();
