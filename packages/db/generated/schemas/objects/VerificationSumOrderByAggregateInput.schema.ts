import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
		})
		.strict();
export const VerificationSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.VerificationSumOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.VerificationSumOrderByAggregateInput>;
export const VerificationSumOrderByAggregateInputObjectZodSchema = makeSchema();
