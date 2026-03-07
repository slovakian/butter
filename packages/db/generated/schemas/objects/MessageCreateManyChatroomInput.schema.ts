import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			content: z.string(),
			pageNumber: z.number().int(),
			userId: z.number().int(),
		})
		.strict();
export const MessageCreateManyChatroomInputObjectSchema: z.ZodType<Prisma.MessageCreateManyChatroomInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageCreateManyChatroomInput>;
export const MessageCreateManyChatroomInputObjectZodSchema = makeSchema();
