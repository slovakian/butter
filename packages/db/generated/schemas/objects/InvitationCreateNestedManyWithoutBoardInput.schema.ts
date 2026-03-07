import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { InvitationCreateManyBoardInputEnvelopeObjectSchema } from "./InvitationCreateManyBoardInputEnvelope.schema";
import { InvitationCreateOrConnectWithoutBoardInputObjectSchema } from "./InvitationCreateOrConnectWithoutBoardInput.schema";
import { InvitationCreateWithoutBoardInputObjectSchema } from "./InvitationCreateWithoutBoardInput.schema";
import { InvitationUncheckedCreateWithoutBoardInputObjectSchema } from "./InvitationUncheckedCreateWithoutBoardInput.schema";
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
			createMany: z
				.lazy(() => InvitationCreateManyBoardInputEnvelopeObjectSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => InvitationWhereUniqueInputObjectSchema),
					z.lazy(() => InvitationWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const InvitationCreateNestedManyWithoutBoardInputObjectSchema: z.ZodType<Prisma.InvitationCreateNestedManyWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateNestedManyWithoutBoardInput>;
export const InvitationCreateNestedManyWithoutBoardInputObjectZodSchema =
	makeSchema();
