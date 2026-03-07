import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			name: z.string(),
			slug: z.string(),
			logo: z.string().optional().nullable(),
			isOfficial: z.boolean().optional(),
			createdAt: z.coerce.date(),
			metadata: z.string().optional(),
			themeId: z.number().int().optional().nullable(),
		})
		.strict();
export const BoardCreateManyInputObjectSchema: z.ZodType<Prisma.BoardCreateManyInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardCreateManyInput>;
export const BoardCreateManyInputObjectZodSchema = makeSchema();
