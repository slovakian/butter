import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MessageIncludeObjectSchema } from "./objects/MessageInclude.schema";
import { MessageSelectObjectSchema } from "./objects/MessageSelect.schema";
import { MessageUncheckedUpdateInputObjectSchema } from "./objects/MessageUncheckedUpdateInput.schema";
import { MessageUpdateInputObjectSchema } from "./objects/MessageUpdateInput.schema";
import { MessageWhereUniqueInputObjectSchema } from "./objects/MessageWhereUniqueInput.schema";

export const MessageUpdateOneSchema: z.ZodType<Prisma.MessageUpdateArgs> = z
	.object({
		select: MessageSelectObjectSchema.optional(),
		include: MessageIncludeObjectSchema.optional(),
		data: z.union([
			MessageUpdateInputObjectSchema,
			MessageUncheckedUpdateInputObjectSchema,
		]),
		where: MessageWhereUniqueInputObjectSchema,
	})
	.strict() as unknown as z.ZodType<Prisma.MessageUpdateArgs>;

export const MessageUpdateOneZodSchema = z
	.object({
		select: MessageSelectObjectSchema.optional(),
		include: MessageIncludeObjectSchema.optional(),
		data: z.union([
			MessageUpdateInputObjectSchema,
			MessageUncheckedUpdateInputObjectSchema,
		]),
		where: MessageWhereUniqueInputObjectSchema,
	})
	.strict();
