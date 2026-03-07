import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeCreateWithoutUsersUsingInputObjectSchema } from "./ThemeCreateWithoutUsersUsingInput.schema";
import { ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema } from "./ThemeUncheckedCreateWithoutUsersUsingInput.schema";
import { ThemeUncheckedUpdateWithoutUsersUsingInputObjectSchema } from "./ThemeUncheckedUpdateWithoutUsersUsingInput.schema";
import { ThemeUpdateWithoutUsersUsingInputObjectSchema } from "./ThemeUpdateWithoutUsersUsingInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./ThemeWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
			update: z.union([
				z.lazy(() => ThemeUpdateWithoutUsersUsingInputObjectSchema),
				z.lazy(() => ThemeUncheckedUpdateWithoutUsersUsingInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => ThemeCreateWithoutUsersUsingInputObjectSchema),
				z.lazy(() => ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema),
			]),
		})
		.strict();
export const ThemeUpsertWithWhereUniqueWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeUpsertWithWhereUniqueWithoutUsersUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUpsertWithWhereUniqueWithoutUsersUsingInput>;
export const ThemeUpsertWithWhereUniqueWithoutUsersUsingInputObjectZodSchema =
	makeSchema();
