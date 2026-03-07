import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoolFilterObjectSchema } from "./BoolFilter.schema";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { IntFilterObjectSchema } from "./IntFilter.schema";
import { IntNullableFilterObjectSchema } from "./IntNullableFilter.schema";
import { StringFilterObjectSchema } from "./StringFilter.schema";
import { StringNullableFilterObjectSchema } from "./StringNullableFilter.schema";

const boardscalarwhereinputSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => BoardScalarWhereInputObjectSchema),
				z.lazy(() => BoardScalarWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => BoardScalarWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => BoardScalarWhereInputObjectSchema),
				z.lazy(() => BoardScalarWhereInputObjectSchema).array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
			.optional(),
		name: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		slug: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		logo: z
			.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
			.optional()
			.nullable(),
		isOfficial: z
			.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
			.optional(),
		metadata: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		themeId: z
			.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
			.optional()
			.nullable(),
	})
	.strict();
export const BoardScalarWhereInputObjectSchema: z.ZodType<Prisma.BoardScalarWhereInput> =
	boardscalarwhereinputSchema as unknown as z.ZodType<Prisma.BoardScalarWhereInput>;
export const BoardScalarWhereInputObjectZodSchema = boardscalarwhereinputSchema;
