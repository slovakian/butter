import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { BoardIncludeObjectSchema } from "./objects/BoardInclude.schema";
import { BoardSelectObjectSchema } from "./objects/BoardSelect.schema";
import { BoardWhereUniqueInputObjectSchema } from "./objects/BoardWhereUniqueInput.schema";

export const BoardDeleteOneSchema: z.ZodType<Prisma.BoardDeleteArgs> = z
	.object({
		select: BoardSelectObjectSchema.optional(),
		include: BoardIncludeObjectSchema.optional(),
		where: BoardWhereUniqueInputObjectSchema,
	})
	.strict() as unknown as z.ZodType<Prisma.BoardDeleteArgs>;

export const BoardDeleteOneZodSchema = z
	.object({
		select: BoardSelectObjectSchema.optional(),
		include: BoardIncludeObjectSchema.optional(),
		where: BoardWhereUniqueInputObjectSchema,
	})
	.strict();
