import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationCreateManyUserInputEnvelopeObjectSchema } from "./InvitationCreateManyUserInputEnvelope.schema";
import { InvitationCreateOrConnectWithoutUserInputObjectSchema } from "./InvitationCreateOrConnectWithoutUserInput.schema";
import { InvitationCreateWithoutUserInputObjectSchema } from "./InvitationCreateWithoutUserInput.schema";
import { InvitationUncheckedCreateWithoutUserInputObjectSchema } from "./InvitationUncheckedCreateWithoutUserInput.schema";
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
			createMany: z
				.lazy(() => InvitationCreateManyUserInputEnvelopeObjectSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => InvitationWhereUniqueInputObjectSchema),
					z.lazy(() => InvitationWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const InvitationUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.InvitationUncheckedCreateNestedManyWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationUncheckedCreateNestedManyWithoutUserInput>;
export const InvitationUncheckedCreateNestedManyWithoutUserInputObjectZodSchema =
	makeSchema();
