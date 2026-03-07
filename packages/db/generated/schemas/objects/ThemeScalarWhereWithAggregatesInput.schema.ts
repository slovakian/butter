import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoolWithAggregatesFilterObjectSchema } from "./BoolWithAggregatesFilter.schema";
import { DateTimeWithAggregatesFilterObjectSchema } from "./DateTimeWithAggregatesFilter.schema";
import { IntNullableWithAggregatesFilterObjectSchema } from "./IntNullableWithAggregatesFilter.schema";
import { IntWithAggregatesFilterObjectSchema } from "./IntWithAggregatesFilter.schema";
import { JsonWithAggregatesFilterObjectSchema } from "./JsonWithAggregatesFilter.schema";
import { StringWithAggregatesFilterObjectSchema } from "./StringWithAggregatesFilter.schema";

const themescalarwherewithaggregatesinputSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => ThemeScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => ThemeScalarWhereWithAggregatesInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => ThemeScalarWhereWithAggregatesInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => ThemeScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => ThemeScalarWhereWithAggregatesInputObjectSchema).array(),
			])
			.optional(),
		id: z
			.union([
				z.lazy(() => IntWithAggregatesFilterObjectSchema),
				z.number().int(),
			])
			.optional(),
		name: z
			.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()])
			.optional(),
		isDark: z
			.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()])
			.optional(),
		variables: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
		createdAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
				z.coerce.date(),
			])
			.optional(),
		updatedAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
				z.coerce.date(),
			])
			.optional(),
		userId: z
			.union([
				z.lazy(() => IntNullableWithAggregatesFilterObjectSchema),
				z.number().int(),
			])
			.optional()
			.nullable(),
	})
	.strict();
export const ThemeScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ThemeScalarWhereWithAggregatesInput> =
	themescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ThemeScalarWhereWithAggregatesInput>;
export const ThemeScalarWhereWithAggregatesInputObjectZodSchema =
	themescalarwherewithaggregatesinputSchema;
