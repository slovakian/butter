import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeCreateWithoutBoardsUsingInputObjectSchema } from "./ThemeCreateWithoutBoardsUsingInput.schema";
import { ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema } from "./ThemeUncheckedCreateWithoutBoardsUsingInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./ThemeWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => ThemeWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => ThemeCreateWithoutBoardsUsingInputObjectSchema),
				z.lazy(() => ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema),
			]),
		})
		.strict();
export const ThemeCreateOrConnectWithoutBoardsUsingInputObjectSchema: z.ZodType<Prisma.ThemeCreateOrConnectWithoutBoardsUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateOrConnectWithoutBoardsUsingInput>;
export const ThemeCreateOrConnectWithoutBoardsUsingInputObjectZodSchema =
	makeSchema();
