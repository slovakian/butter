import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { InvitationAvgAggregateInputObjectSchema } from "./objects/InvitationAvgAggregateInput.schema";
import { InvitationCountAggregateInputObjectSchema } from "./objects/InvitationCountAggregateInput.schema";
import { InvitationMaxAggregateInputObjectSchema } from "./objects/InvitationMaxAggregateInput.schema";
import { InvitationMinAggregateInputObjectSchema } from "./objects/InvitationMinAggregateInput.schema";
import { InvitationOrderByWithRelationInputObjectSchema } from "./objects/InvitationOrderByWithRelationInput.schema";
import { InvitationSumAggregateInputObjectSchema } from "./objects/InvitationSumAggregateInput.schema";
import { InvitationWhereInputObjectSchema } from "./objects/InvitationWhereInput.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./objects/InvitationWhereUniqueInput.schema";

export const InvitationAggregateSchema: z.ZodType<Prisma.InvitationAggregateArgs> =
	z
		.object({
			orderBy: z
				.union([
					InvitationOrderByWithRelationInputObjectSchema,
					InvitationOrderByWithRelationInputObjectSchema.array(),
				])
				.optional(),
			where: InvitationWhereInputObjectSchema.optional(),
			cursor: InvitationWhereUniqueInputObjectSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			_count: z
				.union([z.literal(true), InvitationCountAggregateInputObjectSchema])
				.optional(),
			_min: InvitationMinAggregateInputObjectSchema.optional(),
			_max: InvitationMaxAggregateInputObjectSchema.optional(),
			_avg: InvitationAvgAggregateInputObjectSchema.optional(),
			_sum: InvitationSumAggregateInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.InvitationAggregateArgs>;

export const InvitationAggregateZodSchema = z
	.object({
		orderBy: z
			.union([
				InvitationOrderByWithRelationInputObjectSchema,
				InvitationOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: InvitationWhereInputObjectSchema.optional(),
		cursor: InvitationWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		_count: z
			.union([z.literal(true), InvitationCountAggregateInputObjectSchema])
			.optional(),
		_min: InvitationMinAggregateInputObjectSchema.optional(),
		_max: InvitationMaxAggregateInputObjectSchema.optional(),
		_avg: InvitationAvgAggregateInputObjectSchema.optional(),
		_sum: InvitationSumAggregateInputObjectSchema.optional(),
	})
	.strict();
