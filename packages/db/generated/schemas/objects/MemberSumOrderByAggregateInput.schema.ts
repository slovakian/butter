import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			boardId: SortOrderSchema.optional(),
			userId: SortOrderSchema.optional(),
		})
		.strict();
export const MemberSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MemberSumOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberSumOrderByAggregateInput>;
export const MemberSumOrderByAggregateInputObjectZodSchema = makeSchema();
