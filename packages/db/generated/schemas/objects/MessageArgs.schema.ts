import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageIncludeObjectSchema } from "./MessageInclude.schema";
import { MessageSelectObjectSchema } from "./MessageSelect.schema";

const makeSchema = () =>
	z
		.object({
			select: z.lazy(() => MessageSelectObjectSchema).optional(),
			include: z.lazy(() => MessageIncludeObjectSchema).optional(),
		})
		.strict();
export const MessageArgsObjectSchema = makeSchema();
export const MessageArgsObjectZodSchema = makeSchema();
