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
			userId: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
		})
		.strict();
export const MessageUncheckedUpdateManyWithoutChatroomInputObjectSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutChatroomInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutChatroomInput>;
export const MessageUncheckedUpdateManyWithoutChatroomInputObjectZodSchema =
	makeSchema();
