import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeUncheckedUpdateWithoutBoardsUsingInputObjectSchema } from "./ThemeUncheckedUpdateWithoutBoardsUsingInput.schema";
import { ThemeUpdateWithoutBoardsUsingInputObjectSchema } from "./ThemeUpdateWithoutBoardsUsingInput.schema";
import { ThemeWhereInputObjectSchema } from "./ThemeWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ThemeWhereInputObjectSchema).optional(),
			data: z.union([
				z.lazy(() => ThemeUpdateWithoutBoardsUsingInputObjectSchema),
				z.lazy(() => ThemeUncheckedUpdateWithoutBoardsUsingInputObjectSchema),
			]),
		})
		.strict();
export const ThemeUpdateToOneWithWhereWithoutBoardsUsingInputObjectSchema: z.ZodType<Prisma.ThemeUpdateToOneWithWhereWithoutBoardsUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateToOneWithWhereWithoutBoardsUsingInput>;
export const ThemeUpdateToOneWithWhereWithoutBoardsUsingInputObjectZodSchema =
	makeSchema();
