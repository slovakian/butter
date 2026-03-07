import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  content: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  pageNumber: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const MessageUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.MessageUpdateManyMutationInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateManyMutationInput>;
export const MessageUpdateManyMutationInputObjectZodSchema = makeSchema();
