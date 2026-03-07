import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { AccountAvgAggregateInputObjectSchema } from "./objects/AccountAvgAggregateInput.schema";
import { AccountCountAggregateInputObjectSchema } from "./objects/AccountCountAggregateInput.schema";
import { AccountMaxAggregateInputObjectSchema } from "./objects/AccountMaxAggregateInput.schema";
import { AccountMinAggregateInputObjectSchema } from "./objects/AccountMinAggregateInput.schema";
import { AccountOrderByWithRelationInputObjectSchema } from "./objects/AccountOrderByWithRelationInput.schema";
import { AccountSumAggregateInputObjectSchema } from "./objects/AccountSumAggregateInput.schema";
import { AccountWhereInputObjectSchema } from "./objects/AccountWhereInput.schema";
import { AccountWhereUniqueInputObjectSchema } from "./objects/AccountWhereUniqueInput.schema";

export const AccountAggregateSchema: z.ZodType<Prisma.AccountAggregateArgs> = z
	.object({
		orderBy: z
			.union([
				AccountOrderByWithRelationInputObjectSchema,
				AccountOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: AccountWhereInputObjectSchema.optional(),
		cursor: AccountWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		_count: z
			.union([z.literal(true), AccountCountAggregateInputObjectSchema])
			.optional(),
		_min: AccountMinAggregateInputObjectSchema.optional(),
		_max: AccountMaxAggregateInputObjectSchema.optional(),
		_avg: AccountAvgAggregateInputObjectSchema.optional(),
		_sum: AccountSumAggregateInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.AccountAggregateArgs>;

export const AccountAggregateZodSchema = z
	.object({
		orderBy: z
			.union([
				AccountOrderByWithRelationInputObjectSchema,
				AccountOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: AccountWhereInputObjectSchema.optional(),
		cursor: AccountWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		_count: z
			.union([z.literal(true), AccountCountAggregateInputObjectSchema])
			.optional(),
		_min: AccountMinAggregateInputObjectSchema.optional(),
		_max: AccountMaxAggregateInputObjectSchema.optional(),
		_avg: AccountAvgAggregateInputObjectSchema.optional(),
		_sum: AccountSumAggregateInputObjectSchema.optional(),
	})
	.strict();
