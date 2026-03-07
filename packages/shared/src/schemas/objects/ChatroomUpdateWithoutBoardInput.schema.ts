import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { MessageUpdateManyWithoutChatroomNestedInputObjectSchema as MessageUpdateManyWithoutChatroomNestedInputObjectSchema } from './MessageUpdateManyWithoutChatroomNestedInput.schema'

const makeSchema = () => z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutChatroomNestedInputObjectSchema).optional()
}).strict();
export const ChatroomUpdateWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateWithoutBoardInput>;
export const ChatroomUpdateWithoutBoardInputObjectZodSchema = makeSchema();
