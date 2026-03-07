import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeCreateOrConnectWithoutUsersUsingInputObjectSchema } from "./ThemeCreateOrConnectWithoutUsersUsingInput.schema";
import { ThemeCreateWithoutUsersUsingInputObjectSchema } from "./ThemeCreateWithoutUsersUsingInput.schema";
import { ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema } from "./ThemeUncheckedCreateWithoutUsersUsingInput.schema";
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
			connect: z
				.union([
					z.lazy(() => ThemeWhereUniqueInputObjectSchema),
					z.lazy(() => ThemeWhereUniqueInputObjectSchema).array(),
				])
				.optional(),
		})
		.strict();
export const ThemeUncheckedCreateNestedManyWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeUncheckedCreateNestedManyWithoutUsersUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUncheckedCreateNestedManyWithoutUsersUsingInput>;
export const ThemeUncheckedCreateNestedManyWithoutUsersUsingInputObjectZodSchema =
	makeSchema();
