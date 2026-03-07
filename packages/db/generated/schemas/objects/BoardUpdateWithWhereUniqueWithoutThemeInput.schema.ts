import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardUncheckedUpdateWithoutThemeInputObjectSchema } from "./BoardUncheckedUpdateWithoutThemeInput.schema";
import { BoardUpdateWithoutThemeInputObjectSchema } from "./BoardUpdateWithoutThemeInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./BoardWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => BoardWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => BoardUpdateWithoutThemeInputObjectSchema),
				z.lazy(() => BoardUncheckedUpdateWithoutThemeInputObjectSchema),
			]),
		})
		.strict();
export const BoardUpdateWithWhereUniqueWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardUpdateWithWhereUniqueWithoutThemeInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateWithWhereUniqueWithoutThemeInput>;
export const BoardUpdateWithWhereUniqueWithoutThemeInputObjectZodSchema =
	makeSchema();
