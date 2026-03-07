import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ChatroomIncludeObjectSchema } from "./objects/ChatroomInclude.schema";
import { ChatroomSelectObjectSchema } from "./objects/ChatroomSelect.schema";
import { ChatroomWhereUniqueInputObjectSchema } from "./objects/ChatroomWhereUniqueInput.schema";

export const ChatroomFindUniqueSchema: z.ZodType<Prisma.ChatroomFindUniqueArgs> =
	z
		.object({
			select: ChatroomSelectObjectSchema.optional(),
			include: ChatroomIncludeObjectSchema.optional(),
			where: ChatroomWhereUniqueInputObjectSchema,
		})
		.strict() as unknown as z.ZodType<Prisma.ChatroomFindUniqueArgs>;

export const ChatroomFindUniqueZodSchema = z
	.object({
		select: ChatroomSelectObjectSchema.optional(),
		include: ChatroomIncludeObjectSchema.optional(),
		where: ChatroomWhereUniqueInputObjectSchema,
	})
	.strict();
