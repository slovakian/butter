import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MessageUpdateManyMutationInputObjectSchema } from "./objects/MessageUpdateManyMutationInput.schema";
import { MessageWhereInputObjectSchema } from "./objects/MessageWhereInput.schema";

export const MessageUpdateManySchema: z.ZodType<Prisma.MessageUpdateManyArgs> =
	z
		.object({
			data: MessageUpdateManyMutationInputObjectSchema,
			where: MessageWhereInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.MessageUpdateManyArgs>;

export const MessageUpdateManyZodSchema = z
	.object({
		data: MessageUpdateManyMutationInputObjectSchema,
		where: MessageWhereInputObjectSchema.optional(),
	})
	.strict();
