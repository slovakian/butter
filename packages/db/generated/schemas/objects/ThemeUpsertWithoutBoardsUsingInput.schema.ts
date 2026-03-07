import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeCreateWithoutBoardsUsingInputObjectSchema } from "./ThemeCreateWithoutBoardsUsingInput.schema";
import { ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema } from "./ThemeUncheckedCreateWithoutBoardsUsingInput.schema";
import { ThemeUncheckedUpdateWithoutBoardsUsingInputObjectSchema } from "./ThemeUncheckedUpdateWithoutBoardsUsingInput.schema";
import { ThemeUpdateWithoutBoardsUsingInputObjectSchema } from "./ThemeUpdateWithoutBoardsUsingInput.schema";
import { ThemeWhereInputObjectSchema } from "./ThemeWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			update: z.union([
				z.lazy(() => ThemeUpdateWithoutBoardsUsingInputObjectSchema),
				z.lazy(() => ThemeUncheckedUpdateWithoutBoardsUsingInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => ThemeCreateWithoutBoardsUsingInputObjectSchema),
				z.lazy(() => ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema),
			]),
			where: z.lazy(() => ThemeWhereInputObjectSchema).optional(),
		})
		.strict();
export const ThemeUpsertWithoutBoardsUsingInputObjectSchema: z.ZodType<Prisma.ThemeUpsertWithoutBoardsUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUpsertWithoutBoardsUsingInput>;
export const ThemeUpsertWithoutBoardsUsingInputObjectZodSchema = makeSchema();
