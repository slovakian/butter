import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			boardId: z.number().int(),
			userId: z.number().int(),
			role: z.string().optional(),
			createdAt: z.coerce.date(),
		})
		.strict();
export const MemberCreateManyInputObjectSchema: z.ZodType<Prisma.MemberCreateManyInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberCreateManyInput>;
export const MemberCreateManyInputObjectZodSchema = makeSchema();
