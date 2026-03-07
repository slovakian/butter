import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MessageSelectObjectSchema } from "./objects/MessageSelect.schema";
import { MessageUpdateManyMutationInputObjectSchema } from "./objects/MessageUpdateManyMutationInput.schema";
import { MessageWhereInputObjectSchema } from "./objects/MessageWhereInput.schema";

export const MessageUpdateManyAndReturnSchema: z.ZodType<Prisma.MessageUpdateManyAndReturnArgs> =
	z
		.object({
			select: MessageSelectObjectSchema.optional(),
			data: MessageUpdateManyMutationInputObjectSchema,
			where: MessageWhereInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.MessageUpdateManyAndReturnArgs>;

export const MessageUpdateManyAndReturnZodSchema = z
	.object({
		select: MessageSelectObjectSchema.optional(),
		data: MessageUpdateManyMutationInputObjectSchema,
		where: MessageWhereInputObjectSchema.optional(),
	})
	.strict();
