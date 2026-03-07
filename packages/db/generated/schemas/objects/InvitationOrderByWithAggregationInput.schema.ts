import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { InvitationAvgOrderByAggregateInputObjectSchema } from "./InvitationAvgOrderByAggregateInput.schema";
import { InvitationCountOrderByAggregateInputObjectSchema } from "./InvitationCountOrderByAggregateInput.schema";
import { InvitationMaxOrderByAggregateInputObjectSchema } from "./InvitationMaxOrderByAggregateInput.schema";
import { InvitationMinOrderByAggregateInputObjectSchema } from "./InvitationMinOrderByAggregateInput.schema";
import { InvitationSumOrderByAggregateInputObjectSchema } from "./InvitationSumOrderByAggregateInput.schema";
import { SortOrderInputObjectSchema } from "./SortOrderInput.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			boardId: SortOrderSchema.optional(),
			email: SortOrderSchema.optional(),
			role: z
				.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
				.optional(),
			status: SortOrderSchema.optional(),
			expiresAt: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
			inviterId: SortOrderSchema.optional(),
			_count: z
				.lazy(() => InvitationCountOrderByAggregateInputObjectSchema)
				.optional(),
			_avg: z
				.lazy(() => InvitationAvgOrderByAggregateInputObjectSchema)
				.optional(),
			_max: z
				.lazy(() => InvitationMaxOrderByAggregateInputObjectSchema)
				.optional(),
			_min: z
				.lazy(() => InvitationMinOrderByAggregateInputObjectSchema)
				.optional(),
			_sum: z
				.lazy(() => InvitationSumOrderByAggregateInputObjectSchema)
				.optional(),
		})
		.strict();
export const InvitationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.InvitationOrderByWithAggregationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationOrderByWithAggregationInput>;
export const InvitationOrderByWithAggregationInputObjectZodSchema =
	makeSchema();
