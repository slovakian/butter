import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardScalarRelationFilterObjectSchema } from "./BoardScalarRelationFilter.schema";
import { BoardWhereInputObjectSchema } from "./BoardWhereInput.schema";
import { IntFilterObjectSchema } from "./IntFilter.schema";
import { MessageListRelationFilterObjectSchema } from "./MessageListRelationFilter.schema";
import { StringFilterObjectSchema } from "./StringFilter.schema";

const chatroomwhereinputSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => ChatroomWhereInputObjectSchema),
				z.lazy(() => ChatroomWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => ChatroomWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => ChatroomWhereInputObjectSchema),
				z.lazy(() => ChatroomWhereInputObjectSchema).array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
			.optional(),
		name: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		slug: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		boardId: z
			.union([z.lazy(() => IntFilterObjectSchema), z.number().int()])
			.optional(),
		board: z
			.union([
				z.lazy(() => BoardScalarRelationFilterObjectSchema),
				z.lazy(() => BoardWhereInputObjectSchema),
			])
			.optional(),
		messages: z.lazy(() => MessageListRelationFilterObjectSchema).optional(),
	})
	.strict();
export const ChatroomWhereInputObjectSchema: z.ZodType<Prisma.ChatroomWhereInput> =
	chatroomwhereinputSchema as unknown as z.ZodType<Prisma.ChatroomWhereInput>;
export const ChatroomWhereInputObjectZodSchema = chatroomwhereinputSchema;
