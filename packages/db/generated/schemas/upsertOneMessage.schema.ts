import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MessageCreateInputObjectSchema } from "./objects/MessageCreateInput.schema";
import { MessageIncludeObjectSchema } from "./objects/MessageInclude.schema";
import { MessageSelectObjectSchema } from "./objects/MessageSelect.schema";
import { MessageUncheckedCreateInputObjectSchema } from "./objects/MessageUncheckedCreateInput.schema";
import { MessageUncheckedUpdateInputObjectSchema } from "./objects/MessageUncheckedUpdateInput.schema";
import { MessageUpdateInputObjectSchema } from "./objects/MessageUpdateInput.schema";
import { MessageWhereUniqueInputObjectSchema } from "./objects/MessageWhereUniqueInput.schema";

export const MessageUpsertOneSchema: z.ZodType<Prisma.MessageUpsertArgs> = z
	.object({
		select: MessageSelectObjectSchema.optional(),
		include: MessageIncludeObjectSchema.optional(),
		where: MessageWhereUniqueInputObjectSchema,
		create: z.union([
			MessageCreateInputObjectSchema,
			MessageUncheckedCreateInputObjectSchema,
		]),
		update: z.union([
			MessageUpdateInputObjectSchema,
			MessageUncheckedUpdateInputObjectSchema,
		]),
	})
	.strict() as unknown as z.ZodType<Prisma.MessageUpsertArgs>;

export const MessageUpsertOneZodSchema = z
	.object({
		select: MessageSelectObjectSchema.optional(),
		include: MessageIncludeObjectSchema.optional(),
		where: MessageWhereUniqueInputObjectSchema,
		create: z.union([
			MessageCreateInputObjectSchema,
			MessageUncheckedCreateInputObjectSchema,
		]),
		update: z.union([
			MessageUpdateInputObjectSchema,
			MessageUncheckedUpdateInputObjectSchema,
		]),
	})
	.strict();
