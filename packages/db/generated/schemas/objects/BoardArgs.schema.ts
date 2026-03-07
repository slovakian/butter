import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardIncludeObjectSchema } from "./BoardInclude.schema";
import { BoardSelectObjectSchema } from "./BoardSelect.schema";

const makeSchema = () =>
	z
		.object({
			select: z.lazy(() => BoardSelectObjectSchema).optional(),
			include: z.lazy(() => BoardIncludeObjectSchema).optional(),
		})
		.strict();
export const BoardArgsObjectSchema = makeSchema();
export const BoardArgsObjectZodSchema = makeSchema();
