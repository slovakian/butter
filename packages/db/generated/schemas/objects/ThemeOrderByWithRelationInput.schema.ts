import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { BoardOrderByRelationAggregateInputObjectSchema } from "./BoardOrderByRelationAggregateInput.schema";
import { SortOrderInputObjectSchema } from "./SortOrderInput.schema";
import { UserOrderByRelationAggregateInputObjectSchema } from "./UserOrderByRelationAggregateInput.schema";
import { UserOrderByWithRelationInputObjectSchema } from "./UserOrderByWithRelationInput.schema";

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
			user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
			usersUsing: z
				.lazy(() => UserOrderByRelationAggregateInputObjectSchema)
				.optional(),
			boardsUsing: z
				.lazy(() => BoardOrderByRelationAggregateInputObjectSchema)
				.optional(),
		})
		.strict();
export const ThemeOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ThemeOrderByWithRelationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeOrderByWithRelationInput>;
export const ThemeOrderByWithRelationInputObjectZodSchema = makeSchema();
