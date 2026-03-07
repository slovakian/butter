import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			name: SortOrderSchema.optional(),
			slug: SortOrderSchema.optional(),
			boardId: SortOrderSchema.optional(),
		})
		.strict();
export const ChatroomCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ChatroomCountOrderByAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomCountOrderByAggregateInput>;
export const ChatroomCountOrderByAggregateInputObjectZodSchema = makeSchema();
