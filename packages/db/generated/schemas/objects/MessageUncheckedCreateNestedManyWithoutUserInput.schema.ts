import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageCreateManyUserInputEnvelopeObjectSchema } from "./MessageCreateManyUserInputEnvelope.schema";
import { MessageCreateOrConnectWithoutUserInputObjectSchema } from "./MessageCreateOrConnectWithoutUserInput.schema";
import { MessageCreateWithoutUserInputObjectSchema } from "./MessageCreateWithoutUserInput.schema";
import { MessageUncheckedCreateWithoutUserInputObjectSchema } from "./MessageUncheckedCreateWithoutUserInput.schema";
import { MessageWhereUniqueInputObjectSchema } from "./MessageWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => MessageCreateWithoutUserInputObjectSchema),
					z.lazy(() => MessageCreateWithoutUserInputObjectSchema).array(),
					z.lazy(() => MessageUncheckedCreateWithoutUserInputObjectSchema),
					z
						.lazy(() => MessageUncheckedCreateWithoutUserInputObjectSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MessageCreateOrConnectWithoutUserInputObjectSchema),
					z
						.lazy(() => MessageCreateOrConnectWithoutUserInputObjectSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MessageCreateManyUserInputEnvelopeObjectSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputObjectSchema),
					z.lazy(() => MessageWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const MessageUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutUserInput>;
export const MessageUncheckedCreateNestedManyWithoutUserInputObjectZodSchema =
	makeSchema();
