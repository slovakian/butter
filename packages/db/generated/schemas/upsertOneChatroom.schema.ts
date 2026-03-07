import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ChatroomCreateInputObjectSchema } from "./objects/ChatroomCreateInput.schema";
import { ChatroomIncludeObjectSchema } from "./objects/ChatroomInclude.schema";
import { ChatroomSelectObjectSchema } from "./objects/ChatroomSelect.schema";
import { ChatroomUncheckedCreateInputObjectSchema } from "./objects/ChatroomUncheckedCreateInput.schema";
import { ChatroomUncheckedUpdateInputObjectSchema } from "./objects/ChatroomUncheckedUpdateInput.schema";
import { ChatroomUpdateInputObjectSchema } from "./objects/ChatroomUpdateInput.schema";
import { ChatroomWhereUniqueInputObjectSchema } from "./objects/ChatroomWhereUniqueInput.schema";

export const ChatroomUpsertOneSchema: z.ZodType<Prisma.ChatroomUpsertArgs> = z
	.object({
		select: ChatroomSelectObjectSchema.optional(),
		include: ChatroomIncludeObjectSchema.optional(),
		where: ChatroomWhereUniqueInputObjectSchema,
		create: z.union([
			ChatroomCreateInputObjectSchema,
			ChatroomUncheckedCreateInputObjectSchema,
		]),
		update: z.union([
			ChatroomUpdateInputObjectSchema,
			ChatroomUncheckedUpdateInputObjectSchema,
		]),
	})
	.strict() as unknown as z.ZodType<Prisma.ChatroomUpsertArgs>;

export const ChatroomUpsertOneZodSchema = z
	.object({
		select: ChatroomSelectObjectSchema.optional(),
		include: ChatroomIncludeObjectSchema.optional(),
		where: ChatroomWhereUniqueInputObjectSchema,
		create: z.union([
			ChatroomCreateInputObjectSchema,
			ChatroomUncheckedCreateInputObjectSchema,
		]),
		update: z.union([
			ChatroomUpdateInputObjectSchema,
			ChatroomUncheckedUpdateInputObjectSchema,
		]),
	})
	.strict();
