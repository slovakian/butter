import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			name: SortOrderSchema.optional(),
			isDark: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
			updatedAt: SortOrderSchema.optional(),
			userId: SortOrderSchema.optional(),
		})
		.strict();
export const ThemeMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ThemeMinOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeMinOrderByAggregateInput>;
export const ThemeMinOrderByAggregateInputObjectZodSchema = makeSchema();
