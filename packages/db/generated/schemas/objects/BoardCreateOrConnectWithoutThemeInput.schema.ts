import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCreateWithoutThemeInputObjectSchema } from "./BoardCreateWithoutThemeInput.schema";
import { BoardUncheckedCreateWithoutThemeInputObjectSchema } from "./BoardUncheckedCreateWithoutThemeInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./BoardWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => BoardWhereUniqueInputObjectSchema),
			create: z.union([
				z.lazy(() => BoardCreateWithoutThemeInputObjectSchema),
				z.lazy(() => BoardUncheckedCreateWithoutThemeInputObjectSchema),
			]),
		})
		.strict();
export const BoardCreateOrConnectWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardCreateOrConnectWithoutThemeInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardCreateOrConnectWithoutThemeInput>;
export const BoardCreateOrConnectWithoutThemeInputObjectZodSchema =
	makeSchema();
