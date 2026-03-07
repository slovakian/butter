import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { UserCreateOrConnectWithoutThemesUsingInputObjectSchema } from "./UserCreateOrConnectWithoutThemesUsingInput.schema";
import { UserCreateWithoutThemesUsingInputObjectSchema } from "./UserCreateWithoutThemesUsingInput.schema";
import { UserUncheckedCreateWithoutThemesUsingInputObjectSchema } from "./UserUncheckedCreateWithoutThemesUsingInput.schema";
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
			connect: z
				.union([
					z.lazy(() => UserWhereUniqueInputObjectSchema),
					z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const UserUncheckedCreateNestedManyWithoutThemesUsingInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutThemesUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutThemesUsingInput>;
export const UserUncheckedCreateNestedManyWithoutThemesUsingInputObjectZodSchema =
	makeSchema();
