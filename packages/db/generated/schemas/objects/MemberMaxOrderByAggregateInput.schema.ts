import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			boardId: SortOrderSchema.optional(),
			userId: SortOrderSchema.optional(),
			role: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
		})
		.strict();
export const MemberMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MemberMaxOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberMaxOrderByAggregateInput>;
export const MemberMaxOrderByAggregateInputObjectZodSchema = makeSchema();
