import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardUpdateOneRequiredWithoutChatroomsNestedInputObjectSchema } from "./BoardUpdateOneRequiredWithoutChatroomsNestedInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";

const makeSchema = () =>
	z
		.object({
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			board: z
				.lazy(
					() => BoardUpdateOneRequiredWithoutChatroomsNestedInputObjectSchema,
				)
				.optional(),
		})
		.strict();
export const ChatroomUpdateWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateWithoutMessagesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateWithoutMessagesInput>;
export const ChatroomUpdateWithoutMessagesInputObjectZodSchema = makeSchema();
