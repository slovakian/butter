import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MemberCreateManyBoardInputEnvelopeObjectSchema } from "./MemberCreateManyBoardInputEnvelope.schema";
import { MemberCreateOrConnectWithoutBoardInputObjectSchema } from "./MemberCreateOrConnectWithoutBoardInput.schema";
import { MemberCreateWithoutBoardInputObjectSchema } from "./MemberCreateWithoutBoardInput.schema";
import { MemberUncheckedCreateWithoutBoardInputObjectSchema } from "./MemberUncheckedCreateWithoutBoardInput.schema";
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
			createMany: z
				.lazy(() => MemberCreateManyBoardInputEnvelopeObjectSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputObjectSchema),
					z.lazy(() => MemberWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const MemberUncheckedCreateNestedManyWithoutBoardInputObjectSchema: z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutBoardInput>;
export const MemberUncheckedCreateNestedManyWithoutBoardInputObjectZodSchema =
	makeSchema();
