import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ChatroomCreateManyInputObjectSchema } from "./objects/ChatroomCreateManyInput.schema";
import { ChatroomSelectObjectSchema } from "./objects/ChatroomSelect.schema";

export const ChatroomCreateManyAndReturnSchema: z.ZodType<Prisma.ChatroomCreateManyAndReturnArgs> =
	z
		.object({
			select: ChatroomSelectObjectSchema.optional(),
			data: z.union([
				ChatroomCreateManyInputObjectSchema,
				z.array(ChatroomCreateManyInputObjectSchema),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.ChatroomCreateManyAndReturnArgs>;

export const ChatroomCreateManyAndReturnZodSchema = z
	.object({
		select: ChatroomSelectObjectSchema.optional(),
		data: z.union([
			ChatroomCreateManyInputObjectSchema,
			z.array(ChatroomCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
