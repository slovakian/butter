import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
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
			boardId: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			role: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
		})
		.strict();
export const MemberUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.MemberUncheckedUpdateWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedUpdateWithoutUserInput>;
export const MemberUncheckedUpdateWithoutUserInputObjectZodSchema =
	makeSchema();
