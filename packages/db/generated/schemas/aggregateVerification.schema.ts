import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { VerificationAvgAggregateInputObjectSchema } from "./objects/VerificationAvgAggregateInput.schema";
import { VerificationCountAggregateInputObjectSchema } from "./objects/VerificationCountAggregateInput.schema";
import { VerificationMaxAggregateInputObjectSchema } from "./objects/VerificationMaxAggregateInput.schema";
import { VerificationMinAggregateInputObjectSchema } from "./objects/VerificationMinAggregateInput.schema";
import { VerificationOrderByWithRelationInputObjectSchema } from "./objects/VerificationOrderByWithRelationInput.schema";
import { VerificationSumAggregateInputObjectSchema } from "./objects/VerificationSumAggregateInput.schema";
import { VerificationWhereInputObjectSchema } from "./objects/VerificationWhereInput.schema";
import { VerificationWhereUniqueInputObjectSchema } from "./objects/VerificationWhereUniqueInput.schema";

export const VerificationAggregateSchema: z.ZodType<Prisma.VerificationAggregateArgs> =
	z
		.object({
			orderBy: z
				.union([
					VerificationOrderByWithRelationInputObjectSchema,
					VerificationOrderByWithRelationInputObjectSchema.array(),
				])
				.optional(),
			where: VerificationWhereInputObjectSchema.optional(),
			cursor: VerificationWhereUniqueInputObjectSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			_count: z
				.union([z.literal(true), VerificationCountAggregateInputObjectSchema])
				.optional(),
			_min: VerificationMinAggregateInputObjectSchema.optional(),
			_max: VerificationMaxAggregateInputObjectSchema.optional(),
			_avg: VerificationAvgAggregateInputObjectSchema.optional(),
			_sum: VerificationSumAggregateInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.VerificationAggregateArgs>;

export const VerificationAggregateZodSchema = z
	.object({
		orderBy: z
			.union([
				VerificationOrderByWithRelationInputObjectSchema,
				VerificationOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: VerificationWhereInputObjectSchema.optional(),
		cursor: VerificationWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		_count: z
			.union([z.literal(true), VerificationCountAggregateInputObjectSchema])
			.optional(),
		_min: VerificationMinAggregateInputObjectSchema.optional(),
		_max: VerificationMaxAggregateInputObjectSchema.optional(),
		_avg: VerificationAvgAggregateInputObjectSchema.optional(),
		_sum: VerificationSumAggregateInputObjectSchema.optional(),
	})
	.strict();
