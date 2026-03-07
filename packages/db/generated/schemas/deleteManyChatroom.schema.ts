import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ChatroomWhereInputObjectSchema } from "./objects/ChatroomWhereInput.schema";

export const ChatroomDeleteManySchema: z.ZodType<Prisma.ChatroomDeleteManyArgs> =
	z
		.object({ where: ChatroomWhereInputObjectSchema.optional() })
		.strict() as unknown as z.ZodType<Prisma.ChatroomDeleteManyArgs>;

export const ChatroomDeleteManyZodSchema = z
	.object({ where: ChatroomWhereInputObjectSchema.optional() })
	.strict();
