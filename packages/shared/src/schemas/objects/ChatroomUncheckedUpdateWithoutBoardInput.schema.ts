import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { MessageUncheckedUpdateManyWithoutChatroomNestedInputObjectSchema as MessageUncheckedUpdateManyWithoutChatroomNestedInputObjectSchema } from './MessageUncheckedUpdateManyWithoutChatroomNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutChatroomNestedInputObjectSchema).optional()
}).strict();
export const ChatroomUncheckedUpdateWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomUncheckedUpdateWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUncheckedUpdateWithoutBoardInput>;
export const ChatroomUncheckedUpdateWithoutBoardInputObjectZodSchema = makeSchema();
