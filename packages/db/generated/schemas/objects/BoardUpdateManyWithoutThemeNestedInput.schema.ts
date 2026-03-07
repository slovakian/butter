import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateManyThemeInputEnvelopeObjectSchema } from "./BoardCreateManyThemeInputEnvelope.schema";
import { BoardCreateOrConnectWithoutThemeInputObjectSchema } from "./BoardCreateOrConnectWithoutThemeInput.schema";
import { BoardCreateWithoutThemeInputObjectSchema } from "./BoardCreateWithoutThemeInput.schema";
import { BoardScalarWhereInputObjectSchema } from "./BoardScalarWhereInput.schema";
import { BoardUncheckedCreateWithoutThemeInputObjectSchema } from "./BoardUncheckedCreateWithoutThemeInput.schema";
import { BoardUpdateManyWithWhereWithoutThemeInputObjectSchema } from "./BoardUpdateManyWithWhereWithoutThemeInput.schema";
import { BoardUpdateWithWhereUniqueWithoutThemeInputObjectSchema } from "./BoardUpdateWithWhereUniqueWithoutThemeInput.schema";
import { BoardUpsertWithWhereUniqueWithoutThemeInputObjectSchema } from "./BoardUpsertWithWhereUniqueWithoutThemeInput.schema";
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
			upsert: z
				.union([
					z.lazy(() => BoardUpsertWithWhereUniqueWithoutThemeInputObjectSchema),
					z
						.lazy(() => BoardUpsertWithWhereUniqueWithoutThemeInputObjectSchema)
						.array(),
				])
				.optional(),
			createMany: z
				.lazy(() => BoardCreateManyThemeInputEnvelopeObjectSchema)
				.optional(),
			set: z
				.union([
					z.lazy(() => BoardWhereUniqueInputObjectSchema),
					z.lazy(() => BoardWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => BoardWhereUniqueInputObjectSchema),
					z.lazy(() => BoardWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => BoardWhereUniqueInputObjectSchema),
					z.lazy(() => BoardWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => BoardWhereUniqueInputObjectSchema),
					z.lazy(() => BoardWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => BoardUpdateWithWhereUniqueWithoutThemeInputObjectSchema),
					z
						.lazy(() => BoardUpdateWithWhereUniqueWithoutThemeInputObjectSchema)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => BoardUpdateManyWithWhereWithoutThemeInputObjectSchema),
					z
						.lazy(() => BoardUpdateManyWithWhereWithoutThemeInputObjectSchema)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => BoardScalarWhereInputObjectSchema),
					z.lazy(() => BoardScalarWhereInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const BoardUpdateManyWithoutThemeNestedInputObjectSchema: z.ZodType<Prisma.BoardUpdateManyWithoutThemeNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateManyWithoutThemeNestedInput>;
export const BoardUpdateManyWithoutThemeNestedInputObjectZodSchema =
	makeSchema();
