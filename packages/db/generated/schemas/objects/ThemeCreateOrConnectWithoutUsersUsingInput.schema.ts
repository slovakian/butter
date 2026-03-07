import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeCreateWithoutUsersUsingInputObjectSchema } from "./ThemeCreateWithoutUsersUsingInput.schema";
import { ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema } from "./ThemeUncheckedCreateWithoutUsersUsingInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./ThemeWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => ThemeCreateWithoutUsersUsingInputObjectSchema),
				z.lazy(() => ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema),
			]),
		})
		.strict();
export const ThemeCreateOrConnectWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeCreateOrConnectWithoutUsersUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateOrConnectWithoutUsersUsingInput>;
export const ThemeCreateOrConnectWithoutUsersUsingInputObjectZodSchema =
	makeSchema();
