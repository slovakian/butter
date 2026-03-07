import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
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
			messages: z
				.lazy(() => MessageUpdateManyWithoutChatroomNestedInputObjectSchema)
				.optional(),
		})
		.strict();
export const ChatroomUpdateWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateWithoutBoardInput>;
export const ChatroomUpdateWithoutBoardInputObjectZodSchema = makeSchema();
