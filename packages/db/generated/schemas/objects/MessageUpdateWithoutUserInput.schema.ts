import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomUpdateOneRequiredWithoutMessagesNestedInputObjectSchema } from "./ChatroomUpdateOneRequiredWithoutMessagesNestedInput.schema";
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";

const makeSchema = () =>
	z
		.object({
			content: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			pageNumber: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			chatroom: z
				.lazy(
					() => ChatroomUpdateOneRequiredWithoutMessagesNestedInputObjectSchema,
				)
				.optional(),
		})
		.strict();
export const MessageUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageUpdateWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateWithoutUserInput>;
export const MessageUpdateWithoutUserInputObjectZodSchema = makeSchema();
