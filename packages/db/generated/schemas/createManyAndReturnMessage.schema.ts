import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MessageCreateManyInputObjectSchema } from "./objects/MessageCreateManyInput.schema";
import { MessageSelectObjectSchema } from "./objects/MessageSelect.schema";

export const MessageCreateManyAndReturnSchema: z.ZodType<Prisma.MessageCreateManyAndReturnArgs> =
	z
		.object({
			select: MessageSelectObjectSchema.optional(),
			data: z.union([
				MessageCreateManyInputObjectSchema,
				z.array(MessageCreateManyInputObjectSchema),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.MessageCreateManyAndReturnArgs>;

export const MessageCreateManyAndReturnZodSchema = z
	.object({
		select: MessageSelectObjectSchema.optional(),
		data: z.union([
			MessageCreateManyInputObjectSchema,
			z.array(MessageCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
