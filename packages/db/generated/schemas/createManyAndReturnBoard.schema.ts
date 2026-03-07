import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { BoardCreateManyInputObjectSchema } from "./objects/BoardCreateManyInput.schema";
import { BoardSelectObjectSchema } from "./objects/BoardSelect.schema";

export const BoardCreateManyAndReturnSchema: z.ZodType<Prisma.BoardCreateManyAndReturnArgs> =
	z
		.object({
			select: BoardSelectObjectSchema.optional(),
			data: z.union([
				BoardCreateManyInputObjectSchema,
				z.array(BoardCreateManyInputObjectSchema),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.BoardCreateManyAndReturnArgs>;

export const BoardCreateManyAndReturnZodSchema = z
	.object({
		select: BoardSelectObjectSchema.optional(),
		data: z.union([
			BoardCreateManyInputObjectSchema,
			z.array(BoardCreateManyInputObjectSchema),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();
