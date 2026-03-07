import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoolFilterObjectSchema } from "./BoolFilter.schema";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { IntFilterObjectSchema } from "./IntFilter.schema";
import { IntNullableFilterObjectSchema } from "./IntNullableFilter.schema";
import { JsonFilterObjectSchema } from "./JsonFilter.schema";
import { StringFilterObjectSchema } from "./StringFilter.schema";

const themescalarwhereinputSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => ThemeScalarWhereInputObjectSchema),
				z.lazy(() => ThemeScalarWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => ThemeScalarWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => ThemeScalarWhereInputObjectSchema),
				z.lazy(() => ThemeScalarWhereInputObjectSchema).array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
			.optional(),
		name: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		isDark: z
			.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
			.optional(),
		variables: z.lazy(() => JsonFilterObjectSchema).optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
		userId: z
			.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
			.optional()
			.nullable(),
	})
	.strict();
export const ThemeScalarWhereInputObjectSchema: z.ZodType<Prisma.ThemeScalarWhereInput> =
	themescalarwhereinputSchema as unknown as z.ZodType<Prisma.ThemeScalarWhereInput>;
export const ThemeScalarWhereInputObjectZodSchema = themescalarwhereinputSchema;
