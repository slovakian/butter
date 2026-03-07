import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ChatroomCreateWithoutMessagesInputObjectSchema as ChatroomCreateWithoutMessagesInputObjectSchema } from './ChatroomCreateWithoutMessagesInput.schema';
import { ChatroomUncheckedCreateWithoutMessagesInputObjectSchema as ChatroomUncheckedCreateWithoutMessagesInputObjectSchema } from './ChatroomUncheckedCreateWithoutMessagesInput.schema';
import { ChatroomCreateOrConnectWithoutMessagesInputObjectSchema as ChatroomCreateOrConnectWithoutMessagesInputObjectSchema } from './ChatroomCreateOrConnectWithoutMessagesInput.schema';
import { ChatroomUpsertWithoutMessagesInputObjectSchema as ChatroomUpsertWithoutMessagesInputObjectSchema } from './ChatroomUpsertWithoutMessagesInput.schema';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './ChatroomWhereUniqueInput.schema';
import { ChatroomUpdateToOneWithWhereWithoutMessagesInputObjectSchema as ChatroomUpdateToOneWithWhereWithoutMessagesInputObjectSchema } from './ChatroomUpdateToOneWithWhereWithoutMessagesInput.schema';
import { ChatroomUpdateWithoutMessagesInputObjectSchema as ChatroomUpdateWithoutMessagesInputObjectSchema } from './ChatroomUpdateWithoutMessagesInput.schema';
import { ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema as ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema } from './ChatroomUncheckedUpdateWithoutMessagesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ChatroomCreateWithoutMessagesInputObjectSchema), z.lazy(() => ChatroomUncheckedCreateWithoutMessagesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ChatroomCreateOrConnectWithoutMessagesInputObjectSchema).optional(),
  upsert: z.lazy(() => ChatroomUpsertWithoutMessagesInputObjectSchema).optional(),
  connect: z.lazy(() => ChatroomWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ChatroomUpdateToOneWithWhereWithoutMessagesInputObjectSchema), z.lazy(() => ChatroomUpdateWithoutMessagesInputObjectSchema), z.lazy(() => ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema)]).optional()
}).strict();
export const ChatroomUpdateOneRequiredWithoutMessagesNestedInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateOneRequiredWithoutMessagesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateOneRequiredWithoutMessagesNestedInput>;
export const ChatroomUpdateOneRequiredWithoutMessagesNestedInputObjectZodSchema = makeSchema();
