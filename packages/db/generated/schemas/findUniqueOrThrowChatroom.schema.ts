import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ChatroomIncludeObjectSchema } from "./objects/ChatroomInclude.schema";
import { ChatroomSelectObjectSchema } from "./objects/ChatroomSelect.schema";
import { ChatroomWhereUniqueInputObjectSchema } from "./objects/ChatroomWhereUniqueInput.schema";

export const ChatroomFindUniqueOrThrowSchema: z.ZodType<Prisma.ChatroomFindUniqueOrThrowArgs> =
	z
		.object({
			select: ChatroomSelectObjectSchema.optional(),
			include: ChatroomIncludeObjectSchema.optional(),
			where: ChatroomWhereUniqueInputObjectSchema,
		})
		.strict() as unknown as z.ZodType<Prisma.ChatroomFindUniqueOrThrowArgs>;

export const ChatroomFindUniqueOrThrowZodSchema = z
	.object({
		select: ChatroomSelectObjectSchema.optional(),
		include: ChatroomIncludeObjectSchema.optional(),
		where: ChatroomWhereUniqueInputObjectSchema,
	})
	.strict();
