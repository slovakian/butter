import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			name: SortOrderSchema.optional(),
			email: SortOrderSchema.optional(),
			emailVerified: SortOrderSchema.optional(),
			image: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
			updatedAt: SortOrderSchema.optional(),
			role: SortOrderSchema.optional(),
			banned: SortOrderSchema.optional(),
			banReason: SortOrderSchema.optional(),
			banExpires: SortOrderSchema.optional(),
			isAnonymous: SortOrderSchema.optional(),
		})
		.strict();
export const UserCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserCountOrderByAggregateInput>;
export const UserCountOrderByAggregateInputObjectZodSchema = makeSchema();
