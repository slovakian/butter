import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ThemeCountOutputTypeSelectObjectSchema } from "./ThemeCountOutputTypeSelect.schema";

const makeSchema = () =>
	z
		.object({
			select: z.lazy(() => ThemeCountOutputTypeSelectObjectSchema).optional(),
		})
		.strict();
export const ThemeCountOutputTypeArgsObjectSchema = makeSchema();
export const ThemeCountOutputTypeArgsObjectZodSchema = makeSchema();
