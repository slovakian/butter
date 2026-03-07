import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeCreateOrConnectWithoutBoardsUsingInputObjectSchema } from "./ThemeCreateOrConnectWithoutBoardsUsingInput.schema";
import { ThemeCreateWithoutBoardsUsingInputObjectSchema } from "./ThemeCreateWithoutBoardsUsingInput.schema";
import { ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema } from "./ThemeUncheckedCreateWithoutBoardsUsingInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./ThemeWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			create: z
				.union([
					z.lazy(() => ThemeCreateWithoutBoardsUsingInputObjectSchema),
					z.lazy(() => ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema),
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => ThemeCreateOrConnectWithoutBoardsUsingInputObjectSchema)
				.optional(),
			connect: z.lazy(() => ThemeWhereUniqueInputObjectSchema).optional(),
		})
		.strict();
export const ThemeCreateNestedOneWithoutBoardsUsingInputObjectSchema: z.ZodType<Prisma.ThemeCreateNestedOneWithoutBoardsUsingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateNestedOneWithoutBoardsUsingInput>;
export const ThemeCreateNestedOneWithoutBoardsUsingInputObjectZodSchema =
	makeSchema();
