import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ChatroomCreateInputObjectSchema } from "./objects/ChatroomCreateInput.schema";
import { ChatroomIncludeObjectSchema } from "./objects/ChatroomInclude.schema";
import { ChatroomSelectObjectSchema } from "./objects/ChatroomSelect.schema";
import { ChatroomUncheckedCreateInputObjectSchema } from "./objects/ChatroomUncheckedCreateInput.schema";

export const ChatroomCreateOneSchema: z.ZodType<Prisma.ChatroomCreateArgs> = z
	.object({
		select: ChatroomSelectObjectSchema.optional(),
		include: ChatroomIncludeObjectSchema.optional(),
		data: z.union([
			ChatroomCreateInputObjectSchema,
			ChatroomUncheckedCreateInputObjectSchema,
		]),
	})
	.strict() as unknown as z.ZodType<Prisma.ChatroomCreateArgs>;

export const ChatroomCreateOneZodSchema = z
	.object({
		select: ChatroomSelectObjectSchema.optional(),
		include: ChatroomIncludeObjectSchema.optional(),
		data: z.union([
			ChatroomCreateInputObjectSchema,
			ChatroomUncheckedCreateInputObjectSchema,
		]),
	})
	.strict();
