import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { JsonValueSchema as jsonSchema } from "../../helpers/json-helpers";
import { JsonNullValueInputSchema } from "../enums/JsonNullValueInput.schema";
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
		})
		.strict();
export const ThemeUpdateWithoutBoardsUsingInputObjectSchema: z.ZodType<Prisma.ThemeUpdateWithoutBoardsUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateWithoutBoardsUsingInput>;
export const ThemeUpdateWithoutBoardsUsingInputObjectZodSchema = makeSchema();
