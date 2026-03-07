import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { JsonValueSchema as jsonSchema } from "../../helpers/json-helpers";
import { JsonNullValueInputSchema } from "../enums/JsonNullValueInput.schema";
import { BoardUpdateManyWithoutThemeNestedInputObjectSchema } from "./BoardUpdateManyWithoutThemeNestedInput.schema";
import { BoolFieldUpdateOperationsInputObjectSchema } from "./BoolFieldUpdateOperationsInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { UserUpdateManyWithoutThemesUsingNestedInputObjectSchema } from "./UserUpdateManyWithoutThemesUsingNestedInput.schema";
import { UserUpdateOneWithoutThemesNestedInputObjectSchema } from "./UserUpdateOneWithoutThemesNestedInput.schema";

const makeSchema = () =>
	z
		.object({
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
			user: z
				.lazy(() => UserUpdateOneWithoutThemesNestedInputObjectSchema)
				.optional(),
			usersUsing: z
				.lazy(() => UserUpdateManyWithoutThemesUsingNestedInputObjectSchema)
				.optional(),
			boardsUsing: z
				.lazy(() => BoardUpdateManyWithoutThemeNestedInputObjectSchema)
				.optional(),
		})
		.strict();
export const ThemeUpdateInputObjectSchema: z.ZodType<Prisma.ThemeUpdateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateInput>;
export const ThemeUpdateInputObjectZodSchema = makeSchema();
