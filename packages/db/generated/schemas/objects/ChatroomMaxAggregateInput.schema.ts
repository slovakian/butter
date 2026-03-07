import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.literal(true).optional(),
			name: z.literal(true).optional(),
			slug: z.literal(true).optional(),
			boardId: z.literal(true).optional(),
		})
		.strict();
export const ChatroomMaxAggregateInputObjectSchema: z.ZodType<Prisma.ChatroomMaxAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomMaxAggregateInputType>;
export const ChatroomMaxAggregateInputObjectZodSchema = makeSchema();
