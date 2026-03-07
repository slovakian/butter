import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeCreateManyUserInputEnvelopeObjectSchema } from "./ThemeCreateManyUserInputEnvelope.schema";
import { ThemeCreateOrConnectWithoutUserInputObjectSchema } from "./ThemeCreateOrConnectWithoutUserInput.schema";
import { ThemeCreateWithoutUserInputObjectSchema } from "./ThemeCreateWithoutUserInput.schema";
import { ThemeScalarWhereInputObjectSchema } from "./ThemeScalarWhereInput.schema";
import { ThemeUncheckedCreateWithoutUserInputObjectSchema } from "./ThemeUncheckedCreateWithoutUserInput.schema";
import { ThemeUpdateManyWithWhereWithoutUserInputObjectSchema } from "./ThemeUpdateManyWithWhereWithoutUserInput.schema";
import { ThemeUpdateWithWhereUniqueWithoutUserInputObjectSchema } from "./ThemeUpdateWithWhereUniqueWithoutUserInput.schema";
import { ThemeUpsertWithWhereUniqueWithoutUserInputObjectSchema } from "./ThemeUpsertWithWhereUniqueWithoutUserInput.schema";
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
			upsert: z
				.union([
					z.lazy(() => ThemeUpsertWithWhereUniqueWithoutUserInputObjectSchema),
					z
						.lazy(() => ThemeUpsertWithWhereUniqueWithoutUserInputObjectSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => ThemeCreateManyUserInputEnvelopeObjectSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => ThemeWhereUniqueInputObjectSchema),
					z.lazy(() => ThemeWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ThemeWhereUniqueInputObjectSchema),
					z.lazy(() => ThemeWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ThemeWhereUniqueInputObjectSchema),
					z.lazy(() => ThemeWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ThemeWhereUniqueInputObjectSchema),
					z.lazy(() => ThemeWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => ThemeUpdateWithWhereUniqueWithoutUserInputObjectSchema),
					z
						.lazy(() => ThemeUpdateWithWhereUniqueWithoutUserInputObjectSchema)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => ThemeUpdateManyWithWhereWithoutUserInputObjectSchema),
					z
						.lazy(() => ThemeUpdateManyWithWhereWithoutUserInputObjectSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ThemeScalarWhereInputObjectSchema),
					z.lazy(() => ThemeScalarWhereInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const ThemeUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ThemeUncheckedUpdateManyWithoutUserNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUncheckedUpdateManyWithoutUserNestedInput>;
export const ThemeUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema =
	makeSchema();
