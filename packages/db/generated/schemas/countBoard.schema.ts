import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { BoardCountAggregateInputObjectSchema } from "./objects/BoardCountAggregateInput.schema";
import { BoardOrderByWithRelationInputObjectSchema } from "./objects/BoardOrderByWithRelationInput.schema";
import { BoardWhereInputObjectSchema } from "./objects/BoardWhereInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./objects/BoardWhereUniqueInput.schema";

export const BoardCountSchema: z.ZodType<Prisma.BoardCountArgs> = z
	.object({
		orderBy: z
			.union([
				BoardOrderByWithRelationInputObjectSchema,
				BoardOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: BoardWhereInputObjectSchema.optional(),
		cursor: BoardWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		select: z
			.union([z.literal(true), BoardCountAggregateInputObjectSchema])
			.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.BoardCountArgs>;

export const BoardCountZodSchema = z
	.object({
		orderBy: z
			.union([
				BoardOrderByWithRelationInputObjectSchema,
				BoardOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: BoardWhereInputObjectSchema.optional(),
		cursor: BoardWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		select: z
			.union([z.literal(true), BoardCountAggregateInputObjectSchema])
			.optional(),
	})
	.strict();
