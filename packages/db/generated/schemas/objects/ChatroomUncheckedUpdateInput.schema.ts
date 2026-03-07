import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { MessageUncheckedUpdateManyWithoutChatroomNestedInputObjectSchema as MessageUncheckedUpdateManyWithoutChatroomNestedInputObjectSchema } from './MessageUncheckedUpdateManyWithoutChatroomNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  boardId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutChatroomNestedInputObjectSchema).optional()
}).strict();
export const ChatroomUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.ChatroomUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUncheckedUpdateInput>;
export const ChatroomUncheckedUpdateInputObjectZodSchema = makeSchema();
