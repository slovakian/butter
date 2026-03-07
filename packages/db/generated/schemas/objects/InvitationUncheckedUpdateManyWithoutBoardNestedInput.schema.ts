import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationCreateManyBoardInputEnvelopeObjectSchema } from "./InvitationCreateManyBoardInputEnvelope.schema";
import { InvitationCreateOrConnectWithoutBoardInputObjectSchema } from "./InvitationCreateOrConnectWithoutBoardInput.schema";
import { InvitationCreateWithoutBoardInputObjectSchema } from "./InvitationCreateWithoutBoardInput.schema";
import { InvitationScalarWhereInputObjectSchema } from "./InvitationScalarWhereInput.schema";
import { InvitationUncheckedCreateWithoutBoardInputObjectSchema } from "./InvitationUncheckedCreateWithoutBoardInput.schema";
import { InvitationUpdateManyWithWhereWithoutBoardInputObjectSchema } from "./InvitationUpdateManyWithWhereWithoutBoardInput.schema";
import { InvitationUpdateWithWhereUniqueWithoutBoardInputObjectSchema } from "./InvitationUpdateWithWhereUniqueWithoutBoardInput.schema";
import { InvitationUpsertWithWhereUniqueWithoutBoardInputObjectSchema } from "./InvitationUpsertWithWhereUniqueWithoutBoardInput.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./InvitationWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => InvitationCreateWithoutBoardInputObjectSchema),
					z.lazy(() => InvitationCreateWithoutBoardInputObjectSchema).array(),
					z.lazy(() => InvitationUncheckedCreateWithoutBoardInputObjectSchema),
					z
						.lazy(() => InvitationUncheckedCreateWithoutBoardInputObjectSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => InvitationCreateOrConnectWithoutBoardInputObjectSchema),
					z
						.lazy(() => InvitationCreateOrConnectWithoutBoardInputObjectSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => InvitationUpsertWithWhereUniqueWithoutBoardInputObjectSchema,
					),
					z
						.lazy(
							() =>
								InvitationUpsertWithWhereUniqueWithoutBoardInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => InvitationCreateManyBoardInputEnvelopeObjectSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => InvitationWhereUniqueInputObjectSchema),
					z.lazy(() => InvitationWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => InvitationWhereUniqueInputObjectSchema),
					z.lazy(() => InvitationWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => InvitationWhereUniqueInputObjectSchema),
					z.lazy(() => InvitationWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => InvitationWhereUniqueInputObjectSchema),
					z.lazy(() => InvitationWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => InvitationUpdateWithWhereUniqueWithoutBoardInputObjectSchema,
					),
					z
						.lazy(
							() =>
								InvitationUpdateWithWhereUniqueWithoutBoardInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => InvitationUpdateManyWithWhereWithoutBoardInputObjectSchema,
					),
					z
						.lazy(
							() => InvitationUpdateManyWithWhereWithoutBoardInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => InvitationScalarWhereInputObjectSchema),
					z.lazy(() => InvitationScalarWhereInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const InvitationUncheckedUpdateManyWithoutBoardNestedInputObjectSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutBoardNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutBoardNestedInput>;
export const InvitationUncheckedUpdateManyWithoutBoardNestedInputObjectZodSchema =
	makeSchema();
