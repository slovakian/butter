import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MessageIncludeObjectSchema } from "./objects/MessageInclude.schema";
import { MessageSelectObjectSchema } from "./objects/MessageSelect.schema";
import { MessageWhereUniqueInputObjectSchema } from "./objects/MessageWhereUniqueInput.schema";

export const MessageDeleteOneSchema: z.ZodType<Prisma.MessageDeleteArgs> = z
	.object({
		select: MessageSelectObjectSchema.optional(),
		include: MessageIncludeObjectSchema.optional(),
		where: MessageWhereUniqueInputObjectSchema,
	})
	.strict() as unknown as z.ZodType<Prisma.MessageDeleteArgs>;

export const MessageDeleteOneZodSchema = z
	.object({
		select: MessageSelectObjectSchema.optional(),
		include: MessageIncludeObjectSchema.optional(),
		where: MessageWhereUniqueInputObjectSchema,
	})
	.strict();
