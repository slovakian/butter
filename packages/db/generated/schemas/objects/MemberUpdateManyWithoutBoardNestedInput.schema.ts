import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MemberCreateManyBoardInputEnvelopeObjectSchema } from "./MemberCreateManyBoardInputEnvelope.schema";
import { MemberCreateOrConnectWithoutBoardInputObjectSchema } from "./MemberCreateOrConnectWithoutBoardInput.schema";
import { MemberCreateWithoutBoardInputObjectSchema } from "./MemberCreateWithoutBoardInput.schema";
import { MemberScalarWhereInputObjectSchema } from "./MemberScalarWhereInput.schema";
import { MemberUncheckedCreateWithoutBoardInputObjectSchema } from "./MemberUncheckedCreateWithoutBoardInput.schema";
import { MemberUpdateManyWithWhereWithoutBoardInputObjectSchema } from "./MemberUpdateManyWithWhereWithoutBoardInput.schema";
import { MemberUpdateWithWhereUniqueWithoutBoardInputObjectSchema } from "./MemberUpdateWithWhereUniqueWithoutBoardInput.schema";
import { MemberUpsertWithWhereUniqueWithoutBoardInputObjectSchema } from "./MemberUpsertWithWhereUniqueWithoutBoardInput.schema";
import { MemberWhereUniqueInputObjectSchema } from "./MemberWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => MemberCreateWithoutBoardInputObjectSchema),
					z.lazy(() => MemberCreateWithoutBoardInputObjectSchema).array(),
					z.lazy(() => MemberUncheckedCreateWithoutBoardInputObjectSchema),
					z
						.lazy(() => MemberUncheckedCreateWithoutBoardInputObjectSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MemberCreateOrConnectWithoutBoardInputObjectSchema),
					z
						.lazy(() => MemberCreateOrConnectWithoutBoardInputObjectSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => MemberUpsertWithWhereUniqueWithoutBoardInputObjectSchema,
					),
					z
						.lazy(
							() => MemberUpsertWithWhereUniqueWithoutBoardInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MemberCreateManyBoardInputEnvelopeObjectSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => MemberWhereUniqueInputObjectSchema),
					z.lazy(() => MemberWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputObjectSchema),
					z.lazy(() => MemberWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => MemberWhereUniqueInputObjectSchema),
					z.lazy(() => MemberWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputObjectSchema),
					z.lazy(() => MemberWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => MemberUpdateWithWhereUniqueWithoutBoardInputObjectSchema,
					),
					z
						.lazy(
							() => MemberUpdateWithWhereUniqueWithoutBoardInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => MemberUpdateManyWithWhereWithoutBoardInputObjectSchema),
					z
						.lazy(() => MemberUpdateManyWithWhereWithoutBoardInputObjectSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => MemberScalarWhereInputObjectSchema),
					z.lazy(() => MemberScalarWhereInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const MemberUpdateManyWithoutBoardNestedInputObjectSchema: z.ZodType<Prisma.MemberUpdateManyWithoutBoardNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateManyWithoutBoardNestedInput>;
export const MemberUpdateManyWithoutBoardNestedInputObjectZodSchema =
	makeSchema();
