import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { VerificationScalarFieldEnumSchema } from "./enums/VerificationScalarFieldEnum.schema";
import { VerificationAvgAggregateInputObjectSchema } from "./objects/VerificationAvgAggregateInput.schema";
import { VerificationCountAggregateInputObjectSchema } from "./objects/VerificationCountAggregateInput.schema";
import { VerificationMaxAggregateInputObjectSchema } from "./objects/VerificationMaxAggregateInput.schema";
import { VerificationMinAggregateInputObjectSchema } from "./objects/VerificationMinAggregateInput.schema";
import { VerificationOrderByWithAggregationInputObjectSchema } from "./objects/VerificationOrderByWithAggregationInput.schema";
import { VerificationScalarWhereWithAggregatesInputObjectSchema } from "./objects/VerificationScalarWhereWithAggregatesInput.schema";
import { VerificationSumAggregateInputObjectSchema } from "./objects/VerificationSumAggregateInput.schema";
import { VerificationWhereInputObjectSchema } from "./objects/VerificationWhereInput.schema";

export const VerificationGroupBySchema: z.ZodType<Prisma.VerificationGroupByArgs> =
	z
		.object({
			where: VerificationWhereInputObjectSchema.optional(),
			orderBy: z
				.union([
					VerificationOrderByWithAggregationInputObjectSchema,
					VerificationOrderByWithAggregationInputObjectSchema.array(),
				])
				.optional(),
			having: VerificationScalarWhereWithAggregatesInputObjectSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			by: z.array(VerificationScalarFieldEnumSchema),
			_count: z
				.union([z.literal(true), VerificationCountAggregateInputObjectSchema])
				.optional(),
			_min: VerificationMinAggregateInputObjectSchema.optional(),
			_max: VerificationMaxAggregateInputObjectSchema.optional(),
			_avg: VerificationAvgAggregateInputObjectSchema.optional(),
			_sum: VerificationSumAggregateInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.VerificationGroupByArgs>;

export const VerificationGroupByZodSchema = z
	.object({
		where: VerificationWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				VerificationOrderByWithAggregationInputObjectSchema,
				VerificationOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: VerificationScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(VerificationScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), VerificationCountAggregateInputObjectSchema])
			.optional(),
		_min: VerificationMinAggregateInputObjectSchema.optional(),
		_max: VerificationMaxAggregateInputObjectSchema.optional(),
		_avg: VerificationAvgAggregateInputObjectSchema.optional(),
		_sum: VerificationSumAggregateInputObjectSchema.optional(),
	})
	.strict();
