import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageCreateManyChatroomInputObjectSchema } from "./MessageCreateManyChatroomInput.schema";

const makeSchema = () =>
	z
		.object({
			data: z.union([
				z.lazy(() => MessageCreateManyChatroomInputObjectSchema),
				z.lazy(() => MessageCreateManyChatroomInputObjectSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();
export const MessageCreateManyChatroomInputEnvelopeObjectSchema: z.ZodType<Prisma.MessageCreateManyChatroomInputEnvelope> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageCreateManyChatroomInputEnvelope>;
export const MessageCreateManyChatroomInputEnvelopeObjectZodSchema =
	makeSchema();
