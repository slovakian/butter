import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";

const makeSchema = () =>
	z
		.object({
			id: z.literal(true).optional(),
			name: z.literal(true).optional(),
			slug: z.literal(true).optional(),
			logo: z.literal(true).optional(),
			isOfficial: z.literal(true).optional(),
			createdAt: z.literal(true).optional(),
			metadata: z.literal(true).optional(),
			themeId: z.literal(true).optional(),
			_all: z.literal(true).optional(),
		})
		.strict();
export const BoardCountAggregateInputObjectSchema: z.ZodType<Prisma.BoardCountAggregateInputType> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardCountAggregateInputType>;
export const BoardCountAggregateInputObjectZodSchema = makeSchema();
