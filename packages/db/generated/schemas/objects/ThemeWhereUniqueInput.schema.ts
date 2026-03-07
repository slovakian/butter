import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
		})
		.strict();
export const ThemeWhereUniqueInputObjectSchema: z.ZodType<Prisma.ThemeWhereUniqueInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeWhereUniqueInput>;
export const ThemeWhereUniqueInputObjectZodSchema = makeSchema();
