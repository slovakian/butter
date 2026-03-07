import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeCreateOrConnectWithoutBoardsUsingInputObjectSchema } from "./ThemeCreateOrConnectWithoutBoardsUsingInput.schema";
import { ThemeCreateWithoutBoardsUsingInputObjectSchema } from "./ThemeCreateWithoutBoardsUsingInput.schema";
import { ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema } from "./ThemeUncheckedCreateWithoutBoardsUsingInput.schema";
import { ThemeUncheckedUpdateWithoutBoardsUsingInputObjectSchema } from "./ThemeUncheckedUpdateWithoutBoardsUsingInput.schema";
import { ThemeUpdateToOneWithWhereWithoutBoardsUsingInputObjectSchema } from "./ThemeUpdateToOneWithWhereWithoutBoardsUsingInput.schema";
import { ThemeUpdateWithoutBoardsUsingInputObjectSchema } from "./ThemeUpdateWithoutBoardsUsingInput.schema";
import { ThemeUpsertWithoutBoardsUsingInputObjectSchema } from "./ThemeUpsertWithoutBoardsUsingInput.schema";
import { ThemeWhereInputObjectSchema } from "./ThemeWhereInput.schema";
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
			upsert: z
				.lazy(() => ThemeUpsertWithoutBoardsUsingInputObjectSchema)
				.optional(),
			disconnect: z
				.union([z.boolean(), z.lazy(() => ThemeWhereInputObjectSchema)])
				.optional(),
			delete: z
				.union([z.boolean(), z.lazy(() => ThemeWhereInputObjectSchema)])
				.optional(),
			connect: z.lazy(() => ThemeWhereUniqueInputObjectSchema).optional(),
			update: z
				.union([
					z.lazy(
						() => ThemeUpdateToOneWithWhereWithoutBoardsUsingInputObjectSchema,
					),
					z.lazy(() => ThemeUpdateWithoutBoardsUsingInputObjectSchema),
					z.lazy(() => ThemeUncheckedUpdateWithoutBoardsUsingInputObjectSchema),
				])
				.optional(),
		})
		.strict();
export const ThemeUpdateOneWithoutBoardsUsingNestedInputObjectSchema: z.ZodType<Prisma.ThemeUpdateOneWithoutBoardsUsingNestedInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateOneWithoutBoardsUsingNestedInput>;
export const ThemeUpdateOneWithoutBoardsUsingNestedInputObjectZodSchema =
	makeSchema();
