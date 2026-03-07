import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateWithoutThemeInputObjectSchema } from "./BoardCreateWithoutThemeInput.schema";
import { BoardUncheckedCreateWithoutThemeInputObjectSchema } from "./BoardUncheckedCreateWithoutThemeInput.schema";
import { BoardUncheckedUpdateWithoutThemeInputObjectSchema } from "./BoardUncheckedUpdateWithoutThemeInput.schema";
import { BoardUpdateWithoutThemeInputObjectSchema } from "./BoardUpdateWithoutThemeInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./BoardWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => BoardWhereUniqueInputObjectSchema),
			update: z.union([
				z.lazy(() => BoardUpdateWithoutThemeInputObjectSchema),
				z.lazy(() => BoardUncheckedUpdateWithoutThemeInputObjectSchema),
			]),
			create: z.union([
				z.lazy(() => BoardCreateWithoutThemeInputObjectSchema),
				z.lazy(() => BoardUncheckedCreateWithoutThemeInputObjectSchema),
			]),
		})
		.strict();
export const BoardUpsertWithWhereUniqueWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardUpsertWithWhereUniqueWithoutThemeInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUpsertWithWhereUniqueWithoutThemeInput>;
export const BoardUpsertWithWhereUniqueWithoutThemeInputObjectZodSchema =
	makeSchema();
