import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ThemeAvgAggregateInputObjectSchema } from "./objects/ThemeAvgAggregateInput.schema";
import { ThemeCountAggregateInputObjectSchema } from "./objects/ThemeCountAggregateInput.schema";
import { ThemeMaxAggregateInputObjectSchema } from "./objects/ThemeMaxAggregateInput.schema";
import { ThemeMinAggregateInputObjectSchema } from "./objects/ThemeMinAggregateInput.schema";
import { ThemeOrderByWithRelationInputObjectSchema } from "./objects/ThemeOrderByWithRelationInput.schema";
import { ThemeSumAggregateInputObjectSchema } from "./objects/ThemeSumAggregateInput.schema";
import { ThemeWhereInputObjectSchema } from "./objects/ThemeWhereInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./objects/ThemeWhereUniqueInput.schema";

export const ThemeAggregateSchema: z.ZodType<Prisma.ThemeAggregateArgs> = z
	.object({
		orderBy: z
			.union([
				ThemeOrderByWithRelationInputObjectSchema,
				ThemeOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: ThemeWhereInputObjectSchema.optional(),
		cursor: ThemeWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		_count: z
			.union([z.literal(true), ThemeCountAggregateInputObjectSchema])
			.optional(),
		_min: ThemeMinAggregateInputObjectSchema.optional(),
		_max: ThemeMaxAggregateInputObjectSchema.optional(),
		_avg: ThemeAvgAggregateInputObjectSchema.optional(),
		_sum: ThemeSumAggregateInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.ThemeAggregateArgs>;

export const ThemeAggregateZodSchema = z
	.object({
		orderBy: z
			.union([
				ThemeOrderByWithRelationInputObjectSchema,
				ThemeOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: ThemeWhereInputObjectSchema.optional(),
		cursor: ThemeWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		_count: z
			.union([z.literal(true), ThemeCountAggregateInputObjectSchema])
			.optional(),
		_min: ThemeMinAggregateInputObjectSchema.optional(),
		_max: ThemeMaxAggregateInputObjectSchema.optional(),
		_avg: ThemeAvgAggregateInputObjectSchema.optional(),
		_sum: ThemeSumAggregateInputObjectSchema.optional(),
	})
	.strict();
