import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { BoardCreateInputObjectSchema } from "./objects/BoardCreateInput.schema";
import { BoardIncludeObjectSchema } from "./objects/BoardInclude.schema";
import { BoardSelectObjectSchema } from "./objects/BoardSelect.schema";
import { BoardUncheckedCreateInputObjectSchema } from "./objects/BoardUncheckedCreateInput.schema";
import { BoardUncheckedUpdateInputObjectSchema } from "./objects/BoardUncheckedUpdateInput.schema";
import { BoardUpdateInputObjectSchema } from "./objects/BoardUpdateInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./objects/BoardWhereUniqueInput.schema";

export const BoardUpsertOneSchema: z.ZodType<Prisma.BoardUpsertArgs> = z
	.object({
		select: BoardSelectObjectSchema.optional(),
		include: BoardIncludeObjectSchema.optional(),
		where: BoardWhereUniqueInputObjectSchema,
		create: z.union([
			BoardCreateInputObjectSchema,
			BoardUncheckedCreateInputObjectSchema,
		]),
		update: z.union([
			BoardUpdateInputObjectSchema,
			BoardUncheckedUpdateInputObjectSchema,
		]),
	})
	.strict() as unknown as z.ZodType<Prisma.BoardUpsertArgs>;

export const BoardUpsertOneZodSchema = z
	.object({
		select: BoardSelectObjectSchema.optional(),
		include: BoardIncludeObjectSchema.optional(),
		where: BoardWhereUniqueInputObjectSchema,
		create: z.union([
			BoardCreateInputObjectSchema,
			BoardUncheckedCreateInputObjectSchema,
		]),
		update: z.union([
			BoardUpdateInputObjectSchema,
			BoardUncheckedUpdateInputObjectSchema,
		]),
	})
	.strict();
