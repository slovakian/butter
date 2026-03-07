import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageFindManySchema } from "../findManyMessage.schema";
import { BoardArgsObjectSchema } from "./BoardArgs.schema";
import { ChatroomCountOutputTypeArgsObjectSchema } from "./ChatroomCountOutputTypeArgs.schema";

const makeSchema = () =>
	z
		.object({
			id: z.boolean().optional(),
			name: z.boolean().optional(),
			slug: z.boolean().optional(),
			boardId: z.boolean().optional(),
			board: z
				.union([z.boolean(), z.lazy(() => BoardArgsObjectSchema)])
				.optional(),
			messages: z
				.union([z.boolean(), z.lazy(() => MessageFindManySchema)])
				.optional(),
			_count: z
				.union([
					z.boolean(),
					z.lazy(() => ChatroomCountOutputTypeArgsObjectSchema),
				])
				.optional(),
		})
		.strict();
export const ChatroomSelectObjectSchema: z.ZodType<Prisma.ChatroomSelect> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomSelect>;
export const ChatroomSelectObjectZodSchema = makeSchema();
