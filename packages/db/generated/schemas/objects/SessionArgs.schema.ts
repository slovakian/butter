import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { SessionIncludeObjectSchema } from "./SessionInclude.schema";
import { SessionSelectObjectSchema } from "./SessionSelect.schema";

const makeSchema = () =>
	z
		.object({
			select: z.lazy(() => SessionSelectObjectSchema).optional(),
			include: z.lazy(() => SessionIncludeObjectSchema).optional(),
		})
		.strict();
export const SessionArgsObjectSchema = makeSchema();
export const SessionArgsObjectZodSchema = makeSchema();
