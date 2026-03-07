import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
import { MessageUncheckedUpdateManyWithoutChatroomNestedInputObjectSchema } from "./MessageUncheckedUpdateManyWithoutChatroomNestedInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";

const makeSchema = () =>
	z
		.object({
			id: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
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
			messages: z
				.lazy(
					() =>
						MessageUncheckedUpdateManyWithoutChatroomNestedInputObjectSchema,
				)
				.optional(),
		})
		.strict();
export const ChatroomUncheckedUpdateWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomUncheckedUpdateWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUncheckedUpdateWithoutBoardInput>;
export const ChatroomUncheckedUpdateWithoutBoardInputObjectZodSchema =
	makeSchema();
