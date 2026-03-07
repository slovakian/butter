import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MemberCreateManyUserInputEnvelopeObjectSchema } from "./MemberCreateManyUserInputEnvelope.schema";
import { MemberCreateOrConnectWithoutUserInputObjectSchema } from "./MemberCreateOrConnectWithoutUserInput.schema";
import { MemberCreateWithoutUserInputObjectSchema } from "./MemberCreateWithoutUserInput.schema";
import { MemberUncheckedCreateWithoutUserInputObjectSchema } from "./MemberUncheckedCreateWithoutUserInput.schema";
import { MemberWhereUniqueInputObjectSchema } from "./MemberWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => MemberCreateWithoutUserInputObjectSchema),
					z.lazy(() => MemberCreateWithoutUserInputObjectSchema).array(),
					z.lazy(() => MemberUncheckedCreateWithoutUserInputObjectSchema),
					z
						.lazy(() => MemberUncheckedCreateWithoutUserInputObjectSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => MemberCreateOrConnectWithoutUserInputObjectSchema),
					z
						.lazy(() => MemberCreateOrConnectWithoutUserInputObjectSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => MemberCreateManyUserInputEnvelopeObjectSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => MemberWhereUniqueInputObjectSchema),
					z.lazy(() => MemberWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const MemberUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutUserInput>;
export const MemberUncheckedCreateNestedManyWithoutUserInputObjectZodSchema =
	makeSchema();
