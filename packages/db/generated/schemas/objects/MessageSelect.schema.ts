import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomArgsObjectSchema } from "./ChatroomArgs.schema";
import { UserArgsObjectSchema } from "./UserArgs.schema";

const makeSchema = () =>
	z
		.object({
			id: z.boolean().optional(),
			content: z.boolean().optional(),
			pageNumber: z.boolean().optional(),
			chatroomId: z.boolean().optional(),
			chatroom: z
				.union([z.boolean(), z.lazy(() => ChatroomArgsObjectSchema)])
				.optional(),
			userId: z.boolean().optional(),
			user: z
				.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
				.optional(),
		})
		.strict();
export const MessageSelectObjectSchema: z.ZodType<Prisma.MessageSelect> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageSelect>;
export const MessageSelectObjectZodSchema = makeSchema();
