import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberScalarFieldEnumSchema } from "./enums/MemberScalarFieldEnum.schema";
import { MemberAvgAggregateInputObjectSchema } from "./objects/MemberAvgAggregateInput.schema";
import { MemberCountAggregateInputObjectSchema } from "./objects/MemberCountAggregateInput.schema";
import { MemberMaxAggregateInputObjectSchema } from "./objects/MemberMaxAggregateInput.schema";
import { MemberMinAggregateInputObjectSchema } from "./objects/MemberMinAggregateInput.schema";
import { MemberOrderByWithAggregationInputObjectSchema } from "./objects/MemberOrderByWithAggregationInput.schema";
import { MemberScalarWhereWithAggregatesInputObjectSchema } from "./objects/MemberScalarWhereWithAggregatesInput.schema";
import { MemberSumAggregateInputObjectSchema } from "./objects/MemberSumAggregateInput.schema";
import { MemberWhereInputObjectSchema } from "./objects/MemberWhereInput.schema";

export const MemberGroupBySchema: z.ZodType<Prisma.MemberGroupByArgs> = z
	.object({
		where: MemberWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				MemberOrderByWithAggregationInputObjectSchema,
				MemberOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: MemberScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(MemberScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), MemberCountAggregateInputObjectSchema])
			.optional(),
		_min: MemberMinAggregateInputObjectSchema.optional(),
		_max: MemberMaxAggregateInputObjectSchema.optional(),
		_avg: MemberAvgAggregateInputObjectSchema.optional(),
		_sum: MemberSumAggregateInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.MemberGroupByArgs>;

export const MemberGroupByZodSchema = z
	.object({
		where: MemberWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				MemberOrderByWithAggregationInputObjectSchema,
				MemberOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: MemberScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(MemberScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), MemberCountAggregateInputObjectSchema])
			.optional(),
		_min: MemberMinAggregateInputObjectSchema.optional(),
		_max: MemberMaxAggregateInputObjectSchema.optional(),
		_avg: MemberAvgAggregateInputObjectSchema.optional(),
		_sum: MemberSumAggregateInputObjectSchema.optional(),
	})
	.strict();
