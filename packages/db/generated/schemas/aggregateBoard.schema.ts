import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { BoardAvgAggregateInputObjectSchema } from "./objects/BoardAvgAggregateInput.schema";
import { BoardCountAggregateInputObjectSchema } from "./objects/BoardCountAggregateInput.schema";
import { BoardMaxAggregateInputObjectSchema } from "./objects/BoardMaxAggregateInput.schema";
import { BoardMinAggregateInputObjectSchema } from "./objects/BoardMinAggregateInput.schema";
import { BoardOrderByWithRelationInputObjectSchema } from "./objects/BoardOrderByWithRelationInput.schema";
import { BoardSumAggregateInputObjectSchema } from "./objects/BoardSumAggregateInput.schema";
import { BoardWhereInputObjectSchema } from "./objects/BoardWhereInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./objects/BoardWhereUniqueInput.schema";

export const BoardAggregateSchema: z.ZodType<Prisma.BoardAggregateArgs> = z
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
		_count: z
			.union([z.literal(true), BoardCountAggregateInputObjectSchema])
			.optional(),
		_min: BoardMinAggregateInputObjectSchema.optional(),
		_max: BoardMaxAggregateInputObjectSchema.optional(),
		_avg: BoardAvgAggregateInputObjectSchema.optional(),
		_sum: BoardSumAggregateInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.BoardAggregateArgs>;

export const BoardAggregateZodSchema = z
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
		_count: z
			.union([z.literal(true), BoardCountAggregateInputObjectSchema])
			.optional(),
		_min: BoardMinAggregateInputObjectSchema.optional(),
		_max: BoardMaxAggregateInputObjectSchema.optional(),
		_avg: BoardAvgAggregateInputObjectSchema.optional(),
		_sum: BoardSumAggregateInputObjectSchema.optional(),
	})
	.strict();
