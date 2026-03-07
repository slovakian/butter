import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			content: z.string(),
			pageNumber: z.number().int(),
			chatroomId: z.number().int(),
		})
		.strict();
export const MessageUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageUncheckedCreateWithoutUserInput>;
export const MessageUncheckedCreateWithoutUserInputObjectZodSchema =
	makeSchema();
