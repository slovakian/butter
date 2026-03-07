import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationCreateManyUserInputEnvelopeObjectSchema } from "./InvitationCreateManyUserInputEnvelope.schema";
import { InvitationCreateOrConnectWithoutUserInputObjectSchema } from "./InvitationCreateOrConnectWithoutUserInput.schema";
import { InvitationCreateWithoutUserInputObjectSchema } from "./InvitationCreateWithoutUserInput.schema";
import { InvitationScalarWhereInputObjectSchema } from "./InvitationScalarWhereInput.schema";
import { InvitationUncheckedCreateWithoutUserInputObjectSchema } from "./InvitationUncheckedCreateWithoutUserInput.schema";
import { InvitationUpdateManyWithWhereWithoutUserInputObjectSchema } from "./InvitationUpdateManyWithWhereWithoutUserInput.schema";
import { InvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema } from "./InvitationUpdateWithWhereUniqueWithoutUserInput.schema";
import { InvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema } from "./InvitationUpsertWithWhereUniqueWithoutUserInput.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./InvitationWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => InvitationCreateWithoutUserInputObjectSchema),
					z.lazy(() => InvitationCreateWithoutUserInputObjectSchema).array(),
					z.lazy(() => InvitationUncheckedCreateWithoutUserInputObjectSchema),
					z
						.lazy(() => InvitationUncheckedCreateWithoutUserInputObjectSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => InvitationCreateOrConnectWithoutUserInputObjectSchema),
					z
						.lazy(() => InvitationCreateOrConnectWithoutUserInputObjectSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => InvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema,
					),
					z
						.lazy(
							() => InvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => InvitationCreateManyUserInputEnvelopeObjectSchema)
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
						() => InvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema,
					),
					z
						.lazy(
							() => InvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => InvitationUpdateManyWithWhereWithoutUserInputObjectSchema,
					),
					z
						.lazy(
							() => InvitationUpdateManyWithWhereWithoutUserInputObjectSchema,
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
export const InvitationUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.InvitationUpdateManyWithoutUserNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationUpdateManyWithoutUserNestedInput>;
export const InvitationUpdateManyWithoutUserNestedInputObjectZodSchema =
	makeSchema();
