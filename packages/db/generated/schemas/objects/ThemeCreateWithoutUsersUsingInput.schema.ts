import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { JsonValueSchema as jsonSchema } from "../../helpers/json-helpers";
import { JsonNullValueInputSchema } from "../enums/JsonNullValueInput.schema";
import { BoardCreateNestedManyWithoutThemeInputObjectSchema } from "./BoardCreateNestedManyWithoutThemeInput.schema";
import { UserCreateNestedOneWithoutThemesInputObjectSchema } from "./UserCreateNestedOneWithoutThemesInput.schema";

const makeSchema = () =>
	z
		.object({
			name: z.string(),
			isDark: z.boolean().optional(),
			variables: z.union([JsonNullValueInputSchema, jsonSchema]),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			user: z
				.lazy(() => UserCreateNestedOneWithoutThemesInputObjectSchema)
				.optional(),
			boardsUsing: z
				.lazy(() => BoardCreateNestedManyWithoutThemeInputObjectSchema)
				.optional(),
		})
		.strict();
export const ThemeCreateWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeCreateWithoutUsersUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateWithoutUsersUsingInput>;
export const ThemeCreateWithoutUsersUsingInputObjectZodSchema = makeSchema();
