import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { JsonValueSchema as jsonSchema } from "../../helpers/json-helpers";
import { JsonNullValueInputSchema } from "../enums/JsonNullValueInput.schema";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			name: z.string(),
			isDark: z.boolean().optional(),
			variables: z.union([JsonNullValueInputSchema, jsonSchema]),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
		})
		.strict();
export const ThemeCreateManyUserInputObjectSchema: z.ZodType<Prisma.ThemeCreateManyUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateManyUserInput>;
export const ThemeCreateManyUserInputObjectZodSchema = makeSchema();
