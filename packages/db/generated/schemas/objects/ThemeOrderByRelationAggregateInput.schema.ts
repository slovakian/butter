import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = () =>
	z
		.object({
			_count: SortOrderSchema.optional(),
		})
		.strict();
export const ThemeOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ThemeOrderByRelationAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeOrderByRelationAggregateInput>;
export const ThemeOrderByRelationAggregateInputObjectZodSchema = makeSchema();
