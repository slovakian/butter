import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { InvitationScalarFieldEnumSchema } from "./enums/InvitationScalarFieldEnum.schema";
import { InvitationAvgAggregateInputObjectSchema } from "./objects/InvitationAvgAggregateInput.schema";
import { InvitationCountAggregateInputObjectSchema } from "./objects/InvitationCountAggregateInput.schema";
import { InvitationMaxAggregateInputObjectSchema } from "./objects/InvitationMaxAggregateInput.schema";
import { InvitationMinAggregateInputObjectSchema } from "./objects/InvitationMinAggregateInput.schema";
import { InvitationOrderByWithAggregationInputObjectSchema } from "./objects/InvitationOrderByWithAggregationInput.schema";
import { InvitationScalarWhereWithAggregatesInputObjectSchema } from "./objects/InvitationScalarWhereWithAggregatesInput.schema";
import { InvitationSumAggregateInputObjectSchema } from "./objects/InvitationSumAggregateInput.schema";
import { InvitationWhereInputObjectSchema } from "./objects/InvitationWhereInput.schema";

export const InvitationGroupBySchema: z.ZodType<Prisma.InvitationGroupByArgs> =
	z
		.object({
			where: InvitationWhereInputObjectSchema.optional(),
			orderBy: z
				.union([
					InvitationOrderByWithAggregationInputObjectSchema,
					InvitationOrderByWithAggregationInputObjectSchema.array(),
				])
				.optional(),
			having: InvitationScalarWhereWithAggregatesInputObjectSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			by: z.array(InvitationScalarFieldEnumSchema),
			_count: z
				.union([z.literal(true), InvitationCountAggregateInputObjectSchema])
				.optional(),
			_min: InvitationMinAggregateInputObjectSchema.optional(),
			_max: InvitationMaxAggregateInputObjectSchema.optional(),
			_avg: InvitationAvgAggregateInputObjectSchema.optional(),
			_sum: InvitationSumAggregateInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.InvitationGroupByArgs>;

export const InvitationGroupByZodSchema = z
	.object({
		where: InvitationWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				InvitationOrderByWithAggregationInputObjectSchema,
				InvitationOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: InvitationScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(InvitationScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), InvitationCountAggregateInputObjectSchema])
			.optional(),
		_min: InvitationMinAggregateInputObjectSchema.optional(),
		_max: InvitationMaxAggregateInputObjectSchema.optional(),
		_avg: InvitationAvgAggregateInputObjectSchema.optional(),
		_sum: InvitationSumAggregateInputObjectSchema.optional(),
	})
	.strict();
