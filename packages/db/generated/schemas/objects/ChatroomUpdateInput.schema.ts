import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardUpdateOneRequiredWithoutChatroomsNestedInputObjectSchema } from "./BoardUpdateOneRequiredWithoutChatroomsNestedInput.schema";
import { MessageUpdateManyWithoutChatroomNestedInputObjectSchema } from "./MessageUpdateManyWithoutChatroomNestedInput.schema";
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
			messages: z
				.lazy(() => MessageUpdateManyWithoutChatroomNestedInputObjectSchema)
				.optional(),
		})
		.strict();
export const ChatroomUpdateInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateInput>;
export const ChatroomUpdateInputObjectZodSchema = makeSchema();
