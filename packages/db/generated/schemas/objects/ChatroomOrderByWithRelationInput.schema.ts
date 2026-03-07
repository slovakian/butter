import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { BoardOrderByWithRelationInputObjectSchema } from "./BoardOrderByWithRelationInput.schema";
import { MessageOrderByRelationAggregateInputObjectSchema } from "./MessageOrderByRelationAggregateInput.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			name: SortOrderSchema.optional(),
			slug: SortOrderSchema.optional(),
			boardId: SortOrderSchema.optional(),
			board: z.lazy(() => BoardOrderByWithRelationInputObjectSchema).optional(),
			messages: z
				.lazy(() => MessageOrderByRelationAggregateInputObjectSchema)
				.optional(),
		})
		.strict();
export const ChatroomOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ChatroomOrderByWithRelationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomOrderByWithRelationInput>;
export const ChatroomOrderByWithRelationInputObjectZodSchema = makeSchema();
