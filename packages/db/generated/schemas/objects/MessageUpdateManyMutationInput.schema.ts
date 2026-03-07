import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
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
		})
		.strict();
export const MessageUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.MessageUpdateManyMutationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateManyMutationInput>;
export const MessageUpdateManyMutationInputObjectZodSchema = makeSchema();
