import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ThemeScalarFieldEnumSchema } from "./enums/ThemeScalarFieldEnum.schema";
import { ThemeAvgAggregateInputObjectSchema } from "./objects/ThemeAvgAggregateInput.schema";
import { ThemeCountAggregateInputObjectSchema } from "./objects/ThemeCountAggregateInput.schema";
import { ThemeMaxAggregateInputObjectSchema } from "./objects/ThemeMaxAggregateInput.schema";
import { ThemeMinAggregateInputObjectSchema } from "./objects/ThemeMinAggregateInput.schema";
import { ThemeOrderByWithAggregationInputObjectSchema } from "./objects/ThemeOrderByWithAggregationInput.schema";
import { ThemeScalarWhereWithAggregatesInputObjectSchema } from "./objects/ThemeScalarWhereWithAggregatesInput.schema";
import { ThemeSumAggregateInputObjectSchema } from "./objects/ThemeSumAggregateInput.schema";
import { ThemeWhereInputObjectSchema } from "./objects/ThemeWhereInput.schema";

export const ThemeGroupBySchema: z.ZodType<Prisma.ThemeGroupByArgs> = z
	.object({
		where: ThemeWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				ThemeOrderByWithAggregationInputObjectSchema,
				ThemeOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: ThemeScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(ThemeScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), ThemeCountAggregateInputObjectSchema])
			.optional(),
		_min: ThemeMinAggregateInputObjectSchema.optional(),
		_max: ThemeMaxAggregateInputObjectSchema.optional(),
		_avg: ThemeAvgAggregateInputObjectSchema.optional(),
		_sum: ThemeSumAggregateInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.ThemeGroupByArgs>;

export const ThemeGroupByZodSchema = z
	.object({
		where: ThemeWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				ThemeOrderByWithAggregationInputObjectSchema,
				ThemeOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: ThemeScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(ThemeScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), ThemeCountAggregateInputObjectSchema])
			.optional(),
		_min: ThemeMinAggregateInputObjectSchema.optional(),
		_max: ThemeMaxAggregateInputObjectSchema.optional(),
		_avg: ThemeAvgAggregateInputObjectSchema.optional(),
		_sum: ThemeSumAggregateInputObjectSchema.optional(),
	})
	.strict();
