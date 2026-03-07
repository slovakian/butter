import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
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
		})
		.strict();
export const ChatroomUncheckedUpdateWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatroomUncheckedUpdateWithoutMessagesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUncheckedUpdateWithoutMessagesInput>;
export const ChatroomUncheckedUpdateWithoutMessagesInputObjectZodSchema =
	makeSchema();
