import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeUncheckedUpdateWithoutUserInputObjectSchema } from "./ThemeUncheckedUpdateWithoutUserInput.schema";
import { ThemeUpdateWithoutUserInputObjectSchema } from "./ThemeUpdateWithoutUserInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./ThemeWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => ThemeUpdateWithoutUserInputObjectSchema),
				z.lazy(() => ThemeUncheckedUpdateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const ThemeUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ThemeUpdateWithWhereUniqueWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateWithWhereUniqueWithoutUserInput>;
export const ThemeUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
	makeSchema();
