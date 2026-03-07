import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const ChatroomUncheckedUpdateManyWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomUncheckedUpdateManyWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUncheckedUpdateManyWithoutBoardInput>;
export const ChatroomUncheckedUpdateManyWithoutBoardInputObjectZodSchema = makeSchema();
