import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberAvgAggregateInputObjectSchema } from "./objects/MemberAvgAggregateInput.schema";
import { MemberCountAggregateInputObjectSchema } from "./objects/MemberCountAggregateInput.schema";
import { MemberMaxAggregateInputObjectSchema } from "./objects/MemberMaxAggregateInput.schema";
import { MemberMinAggregateInputObjectSchema } from "./objects/MemberMinAggregateInput.schema";
import { MemberOrderByWithRelationInputObjectSchema } from "./objects/MemberOrderByWithRelationInput.schema";
import { MemberSumAggregateInputObjectSchema } from "./objects/MemberSumAggregateInput.schema";
import { MemberWhereInputObjectSchema } from "./objects/MemberWhereInput.schema";
import { MemberWhereUniqueInputObjectSchema } from "./objects/MemberWhereUniqueInput.schema";

export const MemberAggregateSchema: z.ZodType<Prisma.MemberAggregateArgs> = z
	.object({
		orderBy: z
			.union([
				MemberOrderByWithRelationInputObjectSchema,
				MemberOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: MemberWhereInputObjectSchema.optional(),
		cursor: MemberWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		_count: z
			.union([z.literal(true), MemberCountAggregateInputObjectSchema])
			.optional(),
		_min: MemberMinAggregateInputObjectSchema.optional(),
		_max: MemberMaxAggregateInputObjectSchema.optional(),
		_avg: MemberAvgAggregateInputObjectSchema.optional(),
		_sum: MemberSumAggregateInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.MemberAggregateArgs>;

export const MemberAggregateZodSchema = z
	.object({
		orderBy: z
			.union([
				MemberOrderByWithRelationInputObjectSchema,
				MemberOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: MemberWhereInputObjectSchema.optional(),
		cursor: MemberWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		_count: z
			.union([z.literal(true), MemberCountAggregateInputObjectSchema])
			.optional(),
		_min: MemberMinAggregateInputObjectSchema.optional(),
		_max: MemberMaxAggregateInputObjectSchema.optional(),
		_avg: MemberAvgAggregateInputObjectSchema.optional(),
		_sum: MemberSumAggregateInputObjectSchema.optional(),
	})
	.strict();
