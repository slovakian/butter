import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { BoardAvgOrderByAggregateInputObjectSchema } from "./BoardAvgOrderByAggregateInput.schema";
import { BoardCountOrderByAggregateInputObjectSchema } from "./BoardCountOrderByAggregateInput.schema";
import { BoardMaxOrderByAggregateInputObjectSchema } from "./BoardMaxOrderByAggregateInput.schema";
import { BoardMinOrderByAggregateInputObjectSchema } from "./BoardMinOrderByAggregateInput.schema";
import { BoardSumOrderByAggregateInputObjectSchema } from "./BoardSumOrderByAggregateInput.schema";
import { SortOrderInputObjectSchema } from "./SortOrderInput.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			name: SortOrderSchema.optional(),
			slug: SortOrderSchema.optional(),
			logo: z
				.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
				.optional(),
			isOfficial: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
			metadata: SortOrderSchema.optional(),
			themeId: z
				.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
				.optional(),
			_count: z
				.lazy(() => BoardCountOrderByAggregateInputObjectSchema)
				.optional(),
			_avg: z.lazy(() => BoardAvgOrderByAggregateInputObjectSchema).optional(),
			_max: z.lazy(() => BoardMaxOrderByAggregateInputObjectSchema).optional(),
			_min: z.lazy(() => BoardMinOrderByAggregateInputObjectSchema).optional(),
			_sum: z.lazy(() => BoardSumOrderByAggregateInputObjectSchema).optional(),
		})
		.strict();
export const BoardOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.BoardOrderByWithAggregationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardOrderByWithAggregationInput>;
export const BoardOrderByWithAggregationInputObjectZodSchema = makeSchema();
