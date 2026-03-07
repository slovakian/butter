import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { SortOrderInputObjectSchema } from "./SortOrderInput.schema";
import { ThemeAvgOrderByAggregateInputObjectSchema } from "./ThemeAvgOrderByAggregateInput.schema";
import { ThemeCountOrderByAggregateInputObjectSchema } from "./ThemeCountOrderByAggregateInput.schema";
import { ThemeMaxOrderByAggregateInputObjectSchema } from "./ThemeMaxOrderByAggregateInput.schema";
import { ThemeMinOrderByAggregateInputObjectSchema } from "./ThemeMinOrderByAggregateInput.schema";
import { ThemeSumOrderByAggregateInputObjectSchema } from "./ThemeSumOrderByAggregateInput.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			name: SortOrderSchema.optional(),
			isDark: SortOrderSchema.optional(),
			variables: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
			updatedAt: SortOrderSchema.optional(),
			userId: z
				.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
				.optional(),
			_count: z
				.lazy(() => ThemeCountOrderByAggregateInputObjectSchema)
				.optional(),
			_avg: z.lazy(() => ThemeAvgOrderByAggregateInputObjectSchema).optional(),
			_max: z.lazy(() => ThemeMaxOrderByAggregateInputObjectSchema).optional(),
			_min: z.lazy(() => ThemeMinOrderByAggregateInputObjectSchema).optional(),
			_sum: z.lazy(() => ThemeSumOrderByAggregateInputObjectSchema).optional(),
		})
		.strict();
export const ThemeOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ThemeOrderByWithAggregationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeOrderByWithAggregationInput>;
export const ThemeOrderByWithAggregationInputObjectZodSchema = makeSchema();
