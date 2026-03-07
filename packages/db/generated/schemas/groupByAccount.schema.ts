import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { AccountScalarFieldEnumSchema } from "./enums/AccountScalarFieldEnum.schema";
import { AccountAvgAggregateInputObjectSchema } from "./objects/AccountAvgAggregateInput.schema";
import { AccountCountAggregateInputObjectSchema } from "./objects/AccountCountAggregateInput.schema";
import { AccountMaxAggregateInputObjectSchema } from "./objects/AccountMaxAggregateInput.schema";
import { AccountMinAggregateInputObjectSchema } from "./objects/AccountMinAggregateInput.schema";
import { AccountOrderByWithAggregationInputObjectSchema } from "./objects/AccountOrderByWithAggregationInput.schema";
import { AccountScalarWhereWithAggregatesInputObjectSchema } from "./objects/AccountScalarWhereWithAggregatesInput.schema";
import { AccountSumAggregateInputObjectSchema } from "./objects/AccountSumAggregateInput.schema";
import { AccountWhereInputObjectSchema } from "./objects/AccountWhereInput.schema";

export const AccountGroupBySchema: z.ZodType<Prisma.AccountGroupByArgs> = z
	.object({
		where: AccountWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				AccountOrderByWithAggregationInputObjectSchema,
				AccountOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: AccountScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(AccountScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), AccountCountAggregateInputObjectSchema])
			.optional(),
		_min: AccountMinAggregateInputObjectSchema.optional(),
		_max: AccountMaxAggregateInputObjectSchema.optional(),
		_avg: AccountAvgAggregateInputObjectSchema.optional(),
		_sum: AccountSumAggregateInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.AccountGroupByArgs>;

export const AccountGroupByZodSchema = z
	.object({
		where: AccountWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				AccountOrderByWithAggregationInputObjectSchema,
				AccountOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: AccountScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(AccountScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), AccountCountAggregateInputObjectSchema])
			.optional(),
		_min: AccountMinAggregateInputObjectSchema.optional(),
		_max: AccountMaxAggregateInputObjectSchema.optional(),
		_avg: AccountAvgAggregateInputObjectSchema.optional(),
		_sum: AccountSumAggregateInputObjectSchema.optional(),
	})
	.strict();
