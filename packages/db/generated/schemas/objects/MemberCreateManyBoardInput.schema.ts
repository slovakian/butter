import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			userId: z.number().int(),
			role: z.string().optional(),
			createdAt: z.coerce.date(),
		})
		.strict();
export const MemberCreateManyBoardInputObjectSchema: z.ZodType<Prisma.MemberCreateManyBoardInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberCreateManyBoardInput>;
export const MemberCreateManyBoardInputObjectZodSchema = makeSchema();
