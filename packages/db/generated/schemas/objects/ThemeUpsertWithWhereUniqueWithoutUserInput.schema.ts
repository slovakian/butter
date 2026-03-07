import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeCreateWithoutUserInputObjectSchema } from "./ThemeCreateWithoutUserInput.schema";
import { ThemeUncheckedCreateWithoutUserInputObjectSchema } from "./ThemeUncheckedCreateWithoutUserInput.schema";
import { ThemeUncheckedUpdateWithoutUserInputObjectSchema } from "./ThemeUncheckedUpdateWithoutUserInput.schema";
import { ThemeUpdateWithoutUserInputObjectSchema } from "./ThemeUpdateWithoutUserInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./ThemeWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
			update: z.union([
				z.lazy(() => ThemeUpdateWithoutUserInputObjectSchema),
				z.lazy(() => ThemeUncheckedUpdateWithoutUserInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => ThemeCreateWithoutUserInputObjectSchema),
				z.lazy(() => ThemeUncheckedCreateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const ThemeUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ThemeUpsertWithWhereUniqueWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUpsertWithWhereUniqueWithoutUserInput>;
export const ThemeUpsertWithWhereUniqueWithoutUserInputObjectZodSchema =
	makeSchema();
