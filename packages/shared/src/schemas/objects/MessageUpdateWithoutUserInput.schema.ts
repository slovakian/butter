import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { ChatroomUpdateOneRequiredWithoutMessagesNestedInputObjectSchema as ChatroomUpdateOneRequiredWithoutMessagesNestedInputObjectSchema } from './ChatroomUpdateOneRequiredWithoutMessagesNestedInput.schema'

const makeSchema = () => z.object({
  content: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  pageNumber: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  chatroom: z.lazy(() => ChatroomUpdateOneRequiredWithoutMessagesNestedInputObjectSchema).optional()
}).strict();
export const MessageUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateWithoutUserInput>;
export const MessageUpdateWithoutUserInputObjectZodSchema = makeSchema();
