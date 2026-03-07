import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MessageCreateInputObjectSchema } from "./objects/MessageCreateInput.schema";
import { MessageIncludeObjectSchema } from "./objects/MessageInclude.schema";
import { MessageSelectObjectSchema } from "./objects/MessageSelect.schema";
import { MessageUncheckedCreateInputObjectSchema } from "./objects/MessageUncheckedCreateInput.schema";

export const MessageCreateOneSchema: z.ZodType<Prisma.MessageCreateArgs> = z
	.object({
		select: MessageSelectObjectSchema.optional(),
		include: MessageIncludeObjectSchema.optional(),
		data: z.union([
			MessageCreateInputObjectSchema,
			MessageUncheckedCreateInputObjectSchema,
		]),
	})
	.strict() as unknown as z.ZodType<Prisma.MessageCreateArgs>;

export const MessageCreateOneZodSchema = z
	.object({
		select: MessageSelectObjectSchema.optional(),
		include: MessageIncludeObjectSchema.optional(),
		data: z.union([
			MessageCreateInputObjectSchema,
			MessageUncheckedCreateInputObjectSchema,
		]),
	})
	.strict();
