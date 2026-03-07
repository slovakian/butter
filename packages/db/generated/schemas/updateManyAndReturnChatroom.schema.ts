import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ChatroomSelectObjectSchema } from "./objects/ChatroomSelect.schema";
import { ChatroomUpdateManyMutationInputObjectSchema } from "./objects/ChatroomUpdateManyMutationInput.schema";
import { ChatroomWhereInputObjectSchema } from "./objects/ChatroomWhereInput.schema";

export const ChatroomUpdateManyAndReturnSchema: z.ZodType<Prisma.ChatroomUpdateManyAndReturnArgs> =
	z
		.object({
			select: ChatroomSelectObjectSchema.optional(),
			data: ChatroomUpdateManyMutationInputObjectSchema,
			where: ChatroomWhereInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.ChatroomUpdateManyAndReturnArgs>;

export const ChatroomUpdateManyAndReturnZodSchema = z
	.object({
		select: ChatroomSelectObjectSchema.optional(),
		data: ChatroomUpdateManyMutationInputObjectSchema,
		where: ChatroomWhereInputObjectSchema.optional(),
	})
	.strict();
