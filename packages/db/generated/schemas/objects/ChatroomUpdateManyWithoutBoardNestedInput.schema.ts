import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomCreateManyBoardInputEnvelopeObjectSchema } from "./ChatroomCreateManyBoardInputEnvelope.schema";
import { ChatroomCreateOrConnectWithoutBoardInputObjectSchema } from "./ChatroomCreateOrConnectWithoutBoardInput.schema";
import { ChatroomCreateWithoutBoardInputObjectSchema } from "./ChatroomCreateWithoutBoardInput.schema";
import { ChatroomScalarWhereInputObjectSchema } from "./ChatroomScalarWhereInput.schema";
import { ChatroomUncheckedCreateWithoutBoardInputObjectSchema } from "./ChatroomUncheckedCreateWithoutBoardInput.schema";
import { ChatroomUpdateManyWithWhereWithoutBoardInputObjectSchema } from "./ChatroomUpdateManyWithWhereWithoutBoardInput.schema";
import { ChatroomUpdateWithWhereUniqueWithoutBoardInputObjectSchema } from "./ChatroomUpdateWithWhereUniqueWithoutBoardInput.schema";
import { ChatroomUpsertWithWhereUniqueWithoutBoardInputObjectSchema } from "./ChatroomUpsertWithWhereUniqueWithoutBoardInput.schema";
import { ChatroomWhereUniqueInputObjectSchema } from "./ChatroomWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => ChatroomCreateWithoutBoardInputObjectSchema),
					z.lazy(() => ChatroomCreateWithoutBoardInputObjectSchema).array(),
					z.lazy(() => ChatroomUncheckedCreateWithoutBoardInputObjectSchema),
					z
						.lazy(() => ChatroomUncheckedCreateWithoutBoardInputObjectSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => ChatroomCreateOrConnectWithoutBoardInputObjectSchema),
					z
						.lazy(() => ChatroomCreateOrConnectWithoutBoardInputObjectSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => ChatroomUpsertWithWhereUniqueWithoutBoardInputObjectSchema,
					),
					z
						.lazy(
							() => ChatroomUpsertWithWhereUniqueWithoutBoardInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ChatroomCreateManyBoardInputEnvelopeObjectSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => ChatroomWhereUniqueInputObjectSchema),
					z.lazy(() => ChatroomWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ChatroomWhereUniqueInputObjectSchema),
					z.lazy(() => ChatroomWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ChatroomWhereUniqueInputObjectSchema),
					z.lazy(() => ChatroomWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ChatroomWhereUniqueInputObjectSchema),
					z.lazy(() => ChatroomWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => ChatroomUpdateWithWhereUniqueWithoutBoardInputObjectSchema,
					),
					z
						.lazy(
							() => ChatroomUpdateWithWhereUniqueWithoutBoardInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => ChatroomUpdateManyWithWhereWithoutBoardInputObjectSchema,
					),
					z
						.lazy(
							() => ChatroomUpdateManyWithWhereWithoutBoardInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ChatroomScalarWhereInputObjectSchema),
					z.lazy(() => ChatroomScalarWhereInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const ChatroomUpdateManyWithoutBoardNestedInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateManyWithoutBoardNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateManyWithoutBoardNestedInput>;
export const ChatroomUpdateManyWithoutBoardNestedInputObjectZodSchema =
	makeSchema();
