import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageCreateManyChatroomInputEnvelopeObjectSchema } from "./MessageCreateManyChatroomInputEnvelope.schema";
import { MessageCreateOrConnectWithoutChatroomInputObjectSchema } from "./MessageCreateOrConnectWithoutChatroomInput.schema";
import { MessageCreateWithoutChatroomInputObjectSchema } from "./MessageCreateWithoutChatroomInput.schema";
import { MessageScalarWhereInputObjectSchema } from "./MessageScalarWhereInput.schema";
import { MessageUncheckedCreateWithoutChatroomInputObjectSchema } from "./MessageUncheckedCreateWithoutChatroomInput.schema";
import { MessageUpdateManyWithWhereWithoutChatroomInputObjectSchema } from "./MessageUpdateManyWithWhereWithoutChatroomInput.schema";
import { MessageUpdateWithWhereUniqueWithoutChatroomInputObjectSchema } from "./MessageUpdateWithWhereUniqueWithoutChatroomInput.schema";
import { MessageUpsertWithWhereUniqueWithoutChatroomInputObjectSchema } from "./MessageUpsertWithWhereUniqueWithoutChatroomInput.schema";
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
			upsert: z
				.union([
					z.lazy(
						() => MessageUpsertWithWhereUniqueWithoutChatroomInputObjectSchema,
					),
					z
						.lazy(
							() =>
								MessageUpsertWithWhereUniqueWithoutChatroomInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MessageCreateManyChatroomInputEnvelopeObjectSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => MessageWhereUniqueInputObjectSchema),
					z.lazy(() => MessageWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputObjectSchema),
					z.lazy(() => MessageWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => MessageWhereUniqueInputObjectSchema),
					z.lazy(() => MessageWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => MessageWhereUniqueInputObjectSchema),
					z.lazy(() => MessageWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => MessageUpdateWithWhereUniqueWithoutChatroomInputObjectSchema,
					),
					z
						.lazy(
							() =>
								MessageUpdateWithWhereUniqueWithoutChatroomInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => MessageUpdateManyWithWhereWithoutChatroomInputObjectSchema,
					),
					z
						.lazy(
							() => MessageUpdateManyWithWhereWithoutChatroomInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => MessageScalarWhereInputObjectSchema),
					z.lazy(() => MessageScalarWhereInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const MessageUpdateManyWithoutChatroomNestedInputObjectSchema: z.ZodType<Prisma.MessageUpdateManyWithoutChatroomNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateManyWithoutChatroomNestedInput>;
export const MessageUpdateManyWithoutChatroomNestedInputObjectZodSchema =
	makeSchema();
