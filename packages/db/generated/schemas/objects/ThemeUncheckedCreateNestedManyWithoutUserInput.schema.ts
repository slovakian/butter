import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeCreateManyUserInputEnvelopeObjectSchema } from "./ThemeCreateManyUserInputEnvelope.schema";
import { ThemeCreateOrConnectWithoutUserInputObjectSchema } from "./ThemeCreateOrConnectWithoutUserInput.schema";
import { ThemeCreateWithoutUserInputObjectSchema } from "./ThemeCreateWithoutUserInput.schema";
import { ThemeUncheckedCreateWithoutUserInputObjectSchema } from "./ThemeUncheckedCreateWithoutUserInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./ThemeWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => ThemeCreateWithoutUserInputObjectSchema),
					z.lazy(() => ThemeCreateWithoutUserInputObjectSchema).array(),
					z.lazy(() => ThemeUncheckedCreateWithoutUserInputObjectSchema),
					z
						.lazy(() => ThemeUncheckedCreateWithoutUserInputObjectSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => ThemeCreateOrConnectWithoutUserInputObjectSchema),
					z
						.lazy(() => ThemeCreateOrConnectWithoutUserInputObjectSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ThemeCreateManyUserInputEnvelopeObjectSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => ThemeWhereUniqueInputObjectSchema),
					z.lazy(() => ThemeWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const ThemeUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ThemeUncheckedCreateNestedManyWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUncheckedCreateNestedManyWithoutUserInput>;
export const ThemeUncheckedCreateNestedManyWithoutUserInputObjectZodSchema =
	makeSchema();
