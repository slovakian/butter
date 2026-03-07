import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { JsonValueSchema as jsonSchema } from "../../helpers/json-helpers";
import { JsonNullValueInputSchema } from "../enums/JsonNullValueInput.schema";
import { BoolFieldUpdateOperationsInputObjectSchema } from "./BoolFieldUpdateOperationsInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
import { NullableIntFieldUpdateOperationsInputObjectSchema } from "./NullableIntFieldUpdateOperationsInput.schema";
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
			isDark: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			variables: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			userId: z
				.union([
					z.number().int(),
					z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
				])
				.optional()
				.nullable(),
		})
		.strict();
export const ThemeUncheckedUpdateManyWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeUncheckedUpdateManyWithoutUsersUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUncheckedUpdateManyWithoutUsersUsingInput>;
export const ThemeUncheckedUpdateManyWithoutUsersUsingInputObjectZodSchema =
	makeSchema();
