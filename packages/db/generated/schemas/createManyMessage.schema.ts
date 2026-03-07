import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MessageCreateManyInputObjectSchema } from "./objects/MessageCreateManyInput.schema";

export const MessageCreateManySchema: z.ZodType<Prisma.MessageCreateManyArgs> =
	z
		.object({
			data: z.union([
				MessageCreateManyInputObjectSchema,
				z.array(MessageCreateManyInputObjectSchema),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.MessageCreateManyArgs>;

export const MessageCreateManyZodSchema = z
	.object({
		data: z.union([
			MessageCreateManyInputObjectSchema,
			z.array(MessageCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
