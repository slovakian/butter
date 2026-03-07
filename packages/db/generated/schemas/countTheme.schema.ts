import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ThemeCountAggregateInputObjectSchema } from "./objects/ThemeCountAggregateInput.schema";
import { ThemeOrderByWithRelationInputObjectSchema } from "./objects/ThemeOrderByWithRelationInput.schema";
import { ThemeWhereInputObjectSchema } from "./objects/ThemeWhereInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./objects/ThemeWhereUniqueInput.schema";

export const ThemeCountSchema: z.ZodType<Prisma.ThemeCountArgs> = z
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
		select: z
			.union([z.literal(true), ThemeCountAggregateInputObjectSchema])
			.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.ThemeCountArgs>;

export const ThemeCountZodSchema = z
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
		select: z
			.union([z.literal(true), ThemeCountAggregateInputObjectSchema])
			.optional(),
	})
	.strict();
