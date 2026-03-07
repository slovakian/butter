import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateNestedOneWithoutChatroomsInputObjectSchema } from "./BoardCreateNestedOneWithoutChatroomsInput.schema";

const makeSchema = () =>
	z
		.object({
			name: z.string(),
			slug: z.string(),
			board: z.lazy(
				() => BoardCreateNestedOneWithoutChatroomsInputObjectSchema,
			),
		})
		.strict();
export const ChatroomCreateWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatroomCreateWithoutMessagesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomCreateWithoutMessagesInput>;
export const ChatroomCreateWithoutMessagesInputObjectZodSchema = makeSchema();
