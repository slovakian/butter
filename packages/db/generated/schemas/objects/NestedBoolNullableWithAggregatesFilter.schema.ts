import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { NestedBoolNullableFilterObjectSchema } from "./NestedBoolNullableFilter.schema";
import { NestedIntNullableFilterObjectSchema } from "./NestedIntNullableFilter.schema";

const nestedboolnullablewithaggregatesfilterSchema = z
	.object({
		equals: z.boolean().optional().nullable(),
		not: z
			.union([
				z.boolean(),
				z.lazy(() => NestedBoolNullableWithAggregatesFilterObjectSchema),
			])
			.optional()
			.nullable(),
		_count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
		_min: z.lazy(() => NestedBoolNullableFilterObjectSchema).optional(),
		_max: z.lazy(() => NestedBoolNullableFilterObjectSchema).optional(),
	})
	.strict();
export const NestedBoolNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> =
	nestedboolnullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter>;
export const NestedBoolNullableWithAggregatesFilterObjectZodSchema =
	nestedboolnullablewithaggregatesfilterSchema;
