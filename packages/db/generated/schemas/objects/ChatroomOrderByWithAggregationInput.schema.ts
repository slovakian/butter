import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { ChatroomAvgOrderByAggregateInputObjectSchema } from "./ChatroomAvgOrderByAggregateInput.schema";
import { ChatroomCountOrderByAggregateInputObjectSchema } from "./ChatroomCountOrderByAggregateInput.schema";
import { ChatroomMaxOrderByAggregateInputObjectSchema } from "./ChatroomMaxOrderByAggregateInput.schema";
import { ChatroomMinOrderByAggregateInputObjectSchema } from "./ChatroomMinOrderByAggregateInput.schema";
import { ChatroomSumOrderByAggregateInputObjectSchema } from "./ChatroomSumOrderByAggregateInput.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			name: SortOrderSchema.optional(),
			slug: SortOrderSchema.optional(),
			boardId: SortOrderSchema.optional(),
			_count: z
				.lazy(() => ChatroomCountOrderByAggregateInputObjectSchema)
				.optional(),
			_avg: z
				.lazy(() => ChatroomAvgOrderByAggregateInputObjectSchema)
				.optional(),
			_max: z
				.lazy(() => ChatroomMaxOrderByAggregateInputObjectSchema)
				.optional(),
			_min: z
				.lazy(() => ChatroomMinOrderByAggregateInputObjectSchema)
				.optional(),
			_sum: z
				.lazy(() => ChatroomSumOrderByAggregateInputObjectSchema)
				.optional(),
		})
		.strict();
export const ChatroomOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ChatroomOrderByWithAggregationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomOrderByWithAggregationInput>;
export const ChatroomOrderByWithAggregationInputObjectZodSchema = makeSchema();
