import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomUpdateOneRequiredWithoutMessagesNestedInputObjectSchema } from "./ChatroomUpdateOneRequiredWithoutMessagesNestedInput.schema";
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { UserUpdateOneRequiredWithoutMessagesNestedInputObjectSchema } from "./UserUpdateOneRequiredWithoutMessagesNestedInput.schema";

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
			user: z
				.lazy(() => UserUpdateOneRequiredWithoutMessagesNestedInputObjectSchema)
				.optional(),
		})
		.strict();
export const MessageUpdateInputObjectSchema: z.ZodType<Prisma.MessageUpdateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateInput>;
export const MessageUpdateInputObjectZodSchema = makeSchema();
