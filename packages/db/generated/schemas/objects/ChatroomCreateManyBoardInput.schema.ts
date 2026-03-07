import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			name: z.string(),
			slug: z.string(),
		})
		.strict();
export const ChatroomCreateManyBoardInputObjectSchema: z.ZodType<Prisma.ChatroomCreateManyBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomCreateManyBoardInput>;
export const ChatroomCreateManyBoardInputObjectZodSchema = makeSchema();
