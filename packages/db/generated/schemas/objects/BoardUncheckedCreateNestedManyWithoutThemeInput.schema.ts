import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateManyThemeInputEnvelopeObjectSchema } from "./BoardCreateManyThemeInputEnvelope.schema";
import { BoardCreateOrConnectWithoutThemeInputObjectSchema } from "./BoardCreateOrConnectWithoutThemeInput.schema";
import { BoardCreateWithoutThemeInputObjectSchema } from "./BoardCreateWithoutThemeInput.schema";
import { BoardUncheckedCreateWithoutThemeInputObjectSchema } from "./BoardUncheckedCreateWithoutThemeInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./BoardWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => BoardCreateWithoutThemeInputObjectSchema),
					z.lazy(() => BoardCreateWithoutThemeInputObjectSchema).array(),
					z.lazy(() => BoardUncheckedCreateWithoutThemeInputObjectSchema),
					z
						.lazy(() => BoardUncheckedCreateWithoutThemeInputObjectSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => BoardCreateOrConnectWithoutThemeInputObjectSchema),
					z
						.lazy(() => BoardCreateOrConnectWithoutThemeInputObjectSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => BoardCreateManyThemeInputEnvelopeObjectSchema)
				.optional(),
			connect: z
				.union([
					z.lazy(() => BoardWhereUniqueInputObjectSchema),
					z.lazy(() => BoardWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const BoardUncheckedCreateNestedManyWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardUncheckedCreateNestedManyWithoutThemeInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUncheckedCreateNestedManyWithoutThemeInput>;
export const BoardUncheckedCreateNestedManyWithoutThemeInputObjectZodSchema =
	makeSchema();
