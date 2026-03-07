import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { BoardScalarFieldEnumSchema } from "./enums/BoardScalarFieldEnum.schema";
import { BoardAvgAggregateInputObjectSchema } from "./objects/BoardAvgAggregateInput.schema";
import { BoardCountAggregateInputObjectSchema } from "./objects/BoardCountAggregateInput.schema";
import { BoardMaxAggregateInputObjectSchema } from "./objects/BoardMaxAggregateInput.schema";
import { BoardMinAggregateInputObjectSchema } from "./objects/BoardMinAggregateInput.schema";
import { BoardOrderByWithAggregationInputObjectSchema } from "./objects/BoardOrderByWithAggregationInput.schema";
import { BoardScalarWhereWithAggregatesInputObjectSchema } from "./objects/BoardScalarWhereWithAggregatesInput.schema";
import { BoardSumAggregateInputObjectSchema } from "./objects/BoardSumAggregateInput.schema";
import { BoardWhereInputObjectSchema } from "./objects/BoardWhereInput.schema";

export const BoardGroupBySchema: z.ZodType<Prisma.BoardGroupByArgs> = z
	.object({
		where: BoardWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				BoardOrderByWithAggregationInputObjectSchema,
				BoardOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: BoardScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(BoardScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), BoardCountAggregateInputObjectSchema])
			.optional(),
		_min: BoardMinAggregateInputObjectSchema.optional(),
		_max: BoardMaxAggregateInputObjectSchema.optional(),
		_avg: BoardAvgAggregateInputObjectSchema.optional(),
		_sum: BoardSumAggregateInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.BoardGroupByArgs>;

export const BoardGroupByZodSchema = z
	.object({
		where: BoardWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				BoardOrderByWithAggregationInputObjectSchema,
				BoardOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: BoardScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(BoardScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), BoardCountAggregateInputObjectSchema])
			.optional(),
		_min: BoardMinAggregateInputObjectSchema.optional(),
		_max: BoardMaxAggregateInputObjectSchema.optional(),
		_avg: BoardAvgAggregateInputObjectSchema.optional(),
		_sum: BoardSumAggregateInputObjectSchema.optional(),
	})
	.strict();
