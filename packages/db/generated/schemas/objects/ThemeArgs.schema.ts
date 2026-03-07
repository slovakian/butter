import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeIncludeObjectSchema } from "./ThemeInclude.schema";
import { ThemeSelectObjectSchema } from "./ThemeSelect.schema";

const makeSchema = () =>
	z
		.object({
			select: z.lazy(() => ThemeSelectObjectSchema).optional(),
			include: z.lazy(() => ThemeIncludeObjectSchema).optional(),
		})
		.strict();
export const ThemeArgsObjectSchema = makeSchema();
export const ThemeArgsObjectZodSchema = makeSchema();
