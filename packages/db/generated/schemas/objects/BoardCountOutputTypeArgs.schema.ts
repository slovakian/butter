import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardCountOutputTypeSelectObjectSchema } from "./BoardCountOutputTypeSelect.schema";

const makeSchema = () =>
	z
		.object({
			select: z.lazy(() => BoardCountOutputTypeSelectObjectSchema).optional(),
		})
		.strict();
export const BoardCountOutputTypeArgsObjectSchema = makeSchema();
export const BoardCountOutputTypeArgsObjectZodSchema = makeSchema();
