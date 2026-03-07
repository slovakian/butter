import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  pageNumber: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  chatroomId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const MessageUncheckedUpdateManyWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutUserInput>;
export const MessageUncheckedUpdateManyWithoutUserInputObjectZodSchema = makeSchema();
