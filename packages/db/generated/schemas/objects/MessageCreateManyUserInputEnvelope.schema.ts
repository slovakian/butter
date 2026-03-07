import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageCreateManyUserInputObjectSchema } from "./MessageCreateManyUserInput.schema";

const makeSchema = () =>
	z
		.object({
			data: z.union([
				z.lazy(() => MessageCreateManyUserInputObjectSchema),
				z.lazy(() => MessageCreateManyUserInputObjectSchema).array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();
export const MessageCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.MessageCreateManyUserInputEnvelope> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageCreateManyUserInputEnvelope>;
export const MessageCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
