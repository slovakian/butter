import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { ChatroomCountOutputTypeSelectObjectSchema } from "./ChatroomCountOutputTypeSelect.schema";

const makeSchema = () =>
	z
		.object({
			select: z
				.lazy(() => ChatroomCountOutputTypeSelectObjectSchema)
				.optional(),
		})
		.strict();
export const ChatroomCountOutputTypeArgsObjectSchema = makeSchema();
export const ChatroomCountOutputTypeArgsObjectZodSchema = makeSchema();
