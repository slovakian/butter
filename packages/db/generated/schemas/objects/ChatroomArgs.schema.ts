import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomIncludeObjectSchema } from "./ChatroomInclude.schema";
import { ChatroomSelectObjectSchema } from "./ChatroomSelect.schema";

const makeSchema = () =>
	z
		.object({
			select: z.lazy(() => ChatroomSelectObjectSchema).optional(),
			include: z.lazy(() => ChatroomIncludeObjectSchema).optional(),
		})
		.strict();
export const ChatroomArgsObjectSchema = makeSchema();
export const ChatroomArgsObjectZodSchema = makeSchema();
