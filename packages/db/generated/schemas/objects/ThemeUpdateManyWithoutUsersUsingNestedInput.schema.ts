import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeCreateOrConnectWithoutUsersUsingInputObjectSchema } from "./ThemeCreateOrConnectWithoutUsersUsingInput.schema";
import { ThemeCreateWithoutUsersUsingInputObjectSchema } from "./ThemeCreateWithoutUsersUsingInput.schema";
import { ThemeScalarWhereInputObjectSchema } from "./ThemeScalarWhereInput.schema";
import { ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema } from "./ThemeUncheckedCreateWithoutUsersUsingInput.schema";
import { ThemeUpdateManyWithWhereWithoutUsersUsingInputObjectSchema } from "./ThemeUpdateManyWithWhereWithoutUsersUsingInput.schema";
import { ThemeUpdateWithWhereUniqueWithoutUsersUsingInputObjectSchema } from "./ThemeUpdateWithWhereUniqueWithoutUsersUsingInput.schema";
import { ThemeUpsertWithWhereUniqueWithoutUsersUsingInputObjectSchema } from "./ThemeUpsertWithWhereUniqueWithoutUsersUsingInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./ThemeWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => ThemeCreateWithoutUsersUsingInputObjectSchema),
					z.lazy(() => ThemeCreateWithoutUsersUsingInputObjectSchema).array(),
					z.lazy(() => ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema),
					z
						.lazy(() => ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => ThemeCreateOrConnectWithoutUsersUsingInputObjectSchema),
					z
						.lazy(() => ThemeCreateOrConnectWithoutUsersUsingInputObjectSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => ThemeUpsertWithWhereUniqueWithoutUsersUsingInputObjectSchema,
					),
					z
						.lazy(
							() =>
								ThemeUpsertWithWhereUniqueWithoutUsersUsingInputObjectSchema,
						)
						.array(),
				])
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
					z.lazy(
						() => ThemeUpdateWithWhereUniqueWithoutUsersUsingInputObjectSchema,
					),
					z
						.lazy(
							() =>
								ThemeUpdateWithWhereUniqueWithoutUsersUsingInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => ThemeUpdateManyWithWhereWithoutUsersUsingInputObjectSchema,
					),
					z
						.lazy(
							() => ThemeUpdateManyWithWhereWithoutUsersUsingInputObjectSchema,
						)
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
export const ThemeUpdateManyWithoutUsersUsingNestedInputObjectSchema: z.ZodType<Prisma.ThemeUpdateManyWithoutUsersUsingNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateManyWithoutUsersUsingNestedInput>;
export const ThemeUpdateManyWithoutUsersUsingNestedInputObjectZodSchema =
	makeSchema();
