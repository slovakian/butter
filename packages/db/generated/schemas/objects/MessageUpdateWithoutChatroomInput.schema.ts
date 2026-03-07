import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
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
			user: z
				.lazy(() => UserUpdateOneRequiredWithoutMessagesNestedInputObjectSchema)
				.optional(),
		})
		.strict();
export const MessageUpdateWithoutChatroomInputObjectSchema: z.ZodType<Prisma.MessageUpdateWithoutChatroomInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateWithoutChatroomInput>;
export const MessageUpdateWithoutChatroomInputObjectZodSchema = makeSchema();
