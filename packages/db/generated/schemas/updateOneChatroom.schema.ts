import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ChatroomIncludeObjectSchema } from "./objects/ChatroomInclude.schema";
import { ChatroomSelectObjectSchema } from "./objects/ChatroomSelect.schema";
import { ChatroomUncheckedUpdateInputObjectSchema } from "./objects/ChatroomUncheckedUpdateInput.schema";
import { ChatroomUpdateInputObjectSchema } from "./objects/ChatroomUpdateInput.schema";
import { ChatroomWhereUniqueInputObjectSchema } from "./objects/ChatroomWhereUniqueInput.schema";

export const ChatroomUpdateOneSchema: z.ZodType<Prisma.ChatroomUpdateArgs> = z
	.object({
		select: ChatroomSelectObjectSchema.optional(),
		include: ChatroomIncludeObjectSchema.optional(),
		data: z.union([
			ChatroomUpdateInputObjectSchema,
			ChatroomUncheckedUpdateInputObjectSchema,
		]),
		where: ChatroomWhereUniqueInputObjectSchema,
	})
	.strict() as unknown as z.ZodType<Prisma.ChatroomUpdateArgs>;

export const ChatroomUpdateOneZodSchema = z
	.object({
		select: ChatroomSelectObjectSchema.optional(),
		include: ChatroomIncludeObjectSchema.optional(),
		data: z.union([
			ChatroomUpdateInputObjectSchema,
			ChatroomUncheckedUpdateInputObjectSchema,
		]),
		where: ChatroomWhereUniqueInputObjectSchema,
	})
	.strict();
