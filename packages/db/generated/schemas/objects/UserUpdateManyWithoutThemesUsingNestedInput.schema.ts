import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateOrConnectWithoutThemesUsingInputObjectSchema } from "./UserCreateOrConnectWithoutThemesUsingInput.schema";
import { UserCreateWithoutThemesUsingInputObjectSchema } from "./UserCreateWithoutThemesUsingInput.schema";
import { UserScalarWhereInputObjectSchema } from "./UserScalarWhereInput.schema";
import { UserUncheckedCreateWithoutThemesUsingInputObjectSchema } from "./UserUncheckedCreateWithoutThemesUsingInput.schema";
import { UserUpdateManyWithWhereWithoutThemesUsingInputObjectSchema } from "./UserUpdateManyWithWhereWithoutThemesUsingInput.schema";
import { UserUpdateWithWhereUniqueWithoutThemesUsingInputObjectSchema } from "./UserUpdateWithWhereUniqueWithoutThemesUsingInput.schema";
import { UserUpsertWithWhereUniqueWithoutThemesUsingInputObjectSchema } from "./UserUpsertWithWhereUniqueWithoutThemesUsingInput.schema";
import { UserWhereUniqueInputObjectSchema } from "./UserWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutThemesUsingInputObjectSchema),
					z.lazy(() => UserCreateWithoutThemesUsingInputObjectSchema).array(),
					z.lazy(() => UserUncheckedCreateWithoutThemesUsingInputObjectSchema),
					z
						.lazy(() => UserUncheckedCreateWithoutThemesUsingInputObjectSchema)
						.array(),
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => UserCreateOrConnectWithoutThemesUsingInputObjectSchema),
					z
						.lazy(() => UserCreateOrConnectWithoutThemesUsingInputObjectSchema)
						.array(),
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(
						() => UserUpsertWithWhereUniqueWithoutThemesUsingInputObjectSchema,
					),
					z
						.lazy(
							() =>
								UserUpsertWithWhereUniqueWithoutThemesUsingInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			set: z
				.union([
					z.lazy(() => UserWhereUniqueInputObjectSchema),
					z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => UserWhereUniqueInputObjectSchema),
					z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => UserWhereUniqueInputObjectSchema),
					z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => UserWhereUniqueInputObjectSchema),
					z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
			update: z
				.union([
					z.lazy(
						() => UserUpdateWithWhereUniqueWithoutThemesUsingInputObjectSchema,
					),
					z
						.lazy(
							() =>
								UserUpdateWithWhereUniqueWithoutThemesUsingInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(
						() => UserUpdateManyWithWhereWithoutThemesUsingInputObjectSchema,
					),
					z
						.lazy(
							() => UserUpdateManyWithWhereWithoutThemesUsingInputObjectSchema,
						)
						.array(),
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => UserScalarWhereInputObjectSchema),
					z.lazy(() => UserScalarWhereInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const UserUpdateManyWithoutThemesUsingNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateManyWithoutThemesUsingNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateManyWithoutThemesUsingNestedInput>;
export const UserUpdateManyWithoutThemesUsingNestedInputObjectZodSchema =
	makeSchema();
