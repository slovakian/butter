import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ChatroomCreateManyInputObjectSchema } from "./objects/ChatroomCreateManyInput.schema";

export const ChatroomCreateManySchema: z.ZodType<Prisma.ChatroomCreateManyArgs> =
	z
		.object({
			data: z.union([
				ChatroomCreateManyInputObjectSchema,
				z.array(ChatroomCreateManyInputObjectSchema),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.ChatroomCreateManyArgs>;

export const ChatroomCreateManyZodSchema = z
	.object({
		data: z.union([
			ChatroomCreateManyInputObjectSchema,
			z.array(ChatroomCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
