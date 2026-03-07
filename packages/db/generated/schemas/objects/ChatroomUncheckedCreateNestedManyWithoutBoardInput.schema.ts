import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomCreateManyBoardInputEnvelopeObjectSchema } from "./ChatroomCreateManyBoardInputEnvelope.schema";
import { ChatroomCreateOrConnectWithoutBoardInputObjectSchema } from "./ChatroomCreateOrConnectWithoutBoardInput.schema";
import { ChatroomCreateWithoutBoardInputObjectSchema } from "./ChatroomCreateWithoutBoardInput.schema";
import { ChatroomUncheckedCreateWithoutBoardInputObjectSchema } from "./ChatroomUncheckedCreateWithoutBoardInput.schema";
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
			createMany: z
				.lazy(() => ChatroomCreateManyBoardInputEnvelopeObjectSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => ChatroomWhereUniqueInputObjectSchema),
					z.lazy(() => ChatroomWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const ChatroomUncheckedCreateNestedManyWithoutBoardInputObjectSchema: z.ZodType<Prisma.ChatroomUncheckedCreateNestedManyWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUncheckedCreateNestedManyWithoutBoardInput>;
export const ChatroomUncheckedCreateNestedManyWithoutBoardInputObjectZodSchema =
	makeSchema();
