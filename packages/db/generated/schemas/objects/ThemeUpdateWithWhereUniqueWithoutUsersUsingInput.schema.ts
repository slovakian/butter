import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeUncheckedUpdateWithoutUsersUsingInputObjectSchema } from "./ThemeUncheckedUpdateWithoutUsersUsingInput.schema";
import { ThemeUpdateWithoutUsersUsingInputObjectSchema } from "./ThemeUpdateWithoutUsersUsingInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./ThemeWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => ThemeUpdateWithoutUsersUsingInputObjectSchema),
				z.lazy(() => ThemeUncheckedUpdateWithoutUsersUsingInputObjectSchema),
			]),
		})
		.strict();
export const ThemeUpdateWithWhereUniqueWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeUpdateWithWhereUniqueWithoutUsersUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateWithWhereUniqueWithoutUsersUsingInput>;
export const ThemeUpdateWithWhereUniqueWithoutUsersUsingInputObjectZodSchema =
	makeSchema();
