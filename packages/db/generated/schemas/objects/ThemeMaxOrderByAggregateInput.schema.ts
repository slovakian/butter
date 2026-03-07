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
export const ThemeMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ThemeMaxOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeMaxOrderByAggregateInput>;
export const ThemeMaxOrderByAggregateInputObjectZodSchema = makeSchema();
