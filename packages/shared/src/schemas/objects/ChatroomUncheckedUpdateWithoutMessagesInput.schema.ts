import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  boardId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatroomUncheckedUpdateWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUncheckedUpdateWithoutMessagesInput>;
export const ChatroomUncheckedUpdateWithoutMessagesInputObjectZodSchema = makeSchema();
