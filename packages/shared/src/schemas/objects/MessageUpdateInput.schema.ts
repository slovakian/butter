import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { ChatroomUpdateOneRequiredWithoutMessagesNestedInputObjectSchema as ChatroomUpdateOneRequiredWithoutMessagesNestedInputObjectSchema } from './ChatroomUpdateOneRequiredWithoutMessagesNestedInput.schema';
import { UserUpdateOneRequiredWithoutMessagesNestedInputObjectSchema as UserUpdateOneRequiredWithoutMessagesNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutMessagesNestedInput.schema'

const makeSchema = () => z.object({
  content: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  pageNumber: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  chatroom: z.lazy(() => ChatroomUpdateOneRequiredWithoutMessagesNestedInputObjectSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMessagesNestedInputObjectSchema).optional()
}).strict();
export const MessageUpdateInputObjectSchema: z.ZodType<Prisma.MessageUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateInput>;
export const MessageUpdateInputObjectZodSchema = makeSchema();
