import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MessageWhereInputObjectSchema } from "./objects/MessageWhereInput.schema";

export const MessageDeleteManySchema: z.ZodType<Prisma.MessageDeleteManyArgs> =
	z
		.object({ where: MessageWhereInputObjectSchema.optional() })
		.strict() as unknown as z.ZodType<Prisma.MessageDeleteManyArgs>;

export const MessageDeleteManyZodSchema = z
	.object({ where: MessageWhereInputObjectSchema.optional() })
	.strict();
