import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ChatroomUpdateManyMutationInputObjectSchema } from "./objects/ChatroomUpdateManyMutationInput.schema";
import { ChatroomWhereInputObjectSchema } from "./objects/ChatroomWhereInput.schema";

export const ChatroomUpdateManySchema: z.ZodType<Prisma.ChatroomUpdateManyArgs> =
	z
		.object({
			data: ChatroomUpdateManyMutationInputObjectSchema,
			where: ChatroomWhereInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.ChatroomUpdateManyArgs>;

export const ChatroomUpdateManyZodSchema = z
	.object({
		data: ChatroomUpdateManyMutationInputObjectSchema,
		where: ChatroomWhereInputObjectSchema.optional(),
	})
	.strict();
