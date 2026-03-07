import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { BoardCreateInputObjectSchema } from "./objects/BoardCreateInput.schema";
import { BoardIncludeObjectSchema } from "./objects/BoardInclude.schema";
import { BoardSelectObjectSchema } from "./objects/BoardSelect.schema";
import { BoardUncheckedCreateInputObjectSchema } from "./objects/BoardUncheckedCreateInput.schema";

export const BoardCreateOneSchema: z.ZodType<Prisma.BoardCreateArgs> = z
	.object({
		select: BoardSelectObjectSchema.optional(),
		include: BoardIncludeObjectSchema.optional(),
		data: z.union([
			BoardCreateInputObjectSchema,
			BoardUncheckedCreateInputObjectSchema,
		]),
	})
	.strict() as unknown as z.ZodType<Prisma.BoardCreateArgs>;

export const BoardCreateOneZodSchema = z
	.object({
		select: BoardSelectObjectSchema.optional(),
		include: BoardIncludeObjectSchema.optional(),
		data: z.union([
			BoardCreateInputObjectSchema,
			BoardUncheckedCreateInputObjectSchema,
		]),
	})
	.strict();
