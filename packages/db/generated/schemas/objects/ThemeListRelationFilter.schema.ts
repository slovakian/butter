import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeWhereInputObjectSchema } from "./ThemeWhereInput.schema";

const makeSchema = () =>
	z
		.object({
			every: z.lazy(() => ThemeWhereInputObjectSchema).optional(),
			some: z.lazy(() => ThemeWhereInputObjectSchema).optional(),
			none: z.lazy(() => ThemeWhereInputObjectSchema).optional(),
		})
		.strict();
export const ThemeListRelationFilterObjectSchema: z.ZodType<Prisma.ThemeListRelationFilter> =
	makeSchema() as unknown as z.ZodType<Prisma.ThemeListRelationFilter>;
export const ThemeListRelationFilterObjectZodSchema = makeSchema();
