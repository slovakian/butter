import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { BoardIncludeObjectSchema } from "./objects/BoardInclude.schema";
import { BoardSelectObjectSchema } from "./objects/BoardSelect.schema";
import { BoardUncheckedUpdateInputObjectSchema } from "./objects/BoardUncheckedUpdateInput.schema";
import { BoardUpdateInputObjectSchema } from "./objects/BoardUpdateInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./objects/BoardWhereUniqueInput.schema";

export const BoardUpdateOneSchema: z.ZodType<Prisma.BoardUpdateArgs> = z
	.object({
		select: BoardSelectObjectSchema.optional(),
		include: BoardIncludeObjectSchema.optional(),
		data: z.union([
			BoardUpdateInputObjectSchema,
			BoardUncheckedUpdateInputObjectSchema,
		]),
		where: BoardWhereUniqueInputObjectSchema,
	})
	.strict() as unknown as z.ZodType<Prisma.BoardUpdateArgs>;

export const BoardUpdateOneZodSchema = z
	.object({
		select: BoardSelectObjectSchema.optional(),
		include: BoardIncludeObjectSchema.optional(),
		data: z.union([
			BoardUpdateInputObjectSchema,
			BoardUncheckedUpdateInputObjectSchema,
		]),
		where: BoardWhereUniqueInputObjectSchema,
	})
	.strict();
