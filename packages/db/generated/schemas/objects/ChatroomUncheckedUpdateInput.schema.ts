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
			boardId: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
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
export const ChatroomUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.ChatroomUncheckedUpdateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUncheckedUpdateInput>;
export const ChatroomUncheckedUpdateInputObjectZodSchema = makeSchema();
