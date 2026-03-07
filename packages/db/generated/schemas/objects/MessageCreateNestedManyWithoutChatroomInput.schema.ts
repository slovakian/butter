import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageCreateManyChatroomInputEnvelopeObjectSchema } from "./MessageCreateManyChatroomInputEnvelope.schema";
import { MessageCreateOrConnectWithoutChatroomInputObjectSchema } from "./MessageCreateOrConnectWithoutChatroomInput.schema";
import { MessageCreateWithoutChatroomInputObjectSchema } from "./MessageCreateWithoutChatroomInput.schema";
import { MessageUncheckedCreateWithoutChatroomInputObjectSchema } from "./MessageUncheckedCreateWithoutChatroomInput.schema";
import { MessageWhereUniqueInputObjectSchema } from "./MessageWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => MessageCreateWithoutChatroomInputObjectSchema),
					z.lazy(() => MessageCreateWithoutChatroomInputObjectSchema).array(),
					z.lazy(() => MessageUncheckedCreateWithoutChatroomInputObjectSchema),
					z
						.lazy(() => MessageUncheckedCreateWithoutChatroomInputObjectSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MessageCreateOrConnectWithoutChatroomInputObjectSchema),
					z
						.lazy(() => MessageCreateOrConnectWithoutChatroomInputObjectSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MessageCreateManyChatroomInputEnvelopeObjectSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputObjectSchema),
					z.lazy(() => MessageWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const MessageCreateNestedManyWithoutChatroomInputObjectSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutChatroomInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageCreateNestedManyWithoutChatroomInput>;
export const MessageCreateNestedManyWithoutChatroomInputObjectZodSchema =
	makeSchema();
