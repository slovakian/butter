import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MessageScalarFieldEnumSchema } from "./enums/MessageScalarFieldEnum.schema";
import { MessageAvgAggregateInputObjectSchema } from "./objects/MessageAvgAggregateInput.schema";
import { MessageCountAggregateInputObjectSchema } from "./objects/MessageCountAggregateInput.schema";
import { MessageMaxAggregateInputObjectSchema } from "./objects/MessageMaxAggregateInput.schema";
import { MessageMinAggregateInputObjectSchema } from "./objects/MessageMinAggregateInput.schema";
import { MessageOrderByWithAggregationInputObjectSchema } from "./objects/MessageOrderByWithAggregationInput.schema";
import { MessageScalarWhereWithAggregatesInputObjectSchema } from "./objects/MessageScalarWhereWithAggregatesInput.schema";
import { MessageSumAggregateInputObjectSchema } from "./objects/MessageSumAggregateInput.schema";
import { MessageWhereInputObjectSchema } from "./objects/MessageWhereInput.schema";

export const MessageGroupBySchema: z.ZodType<Prisma.MessageGroupByArgs> = z
	.object({
		where: MessageWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				MessageOrderByWithAggregationInputObjectSchema,
				MessageOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: MessageScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(MessageScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), MessageCountAggregateInputObjectSchema])
			.optional(),
		_min: MessageMinAggregateInputObjectSchema.optional(),
		_max: MessageMaxAggregateInputObjectSchema.optional(),
		_avg: MessageAvgAggregateInputObjectSchema.optional(),
		_sum: MessageSumAggregateInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.MessageGroupByArgs>;

export const MessageGroupByZodSchema = z
	.object({
		where: MessageWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				MessageOrderByWithAggregationInputObjectSchema,
				MessageOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: MessageScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(MessageScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), MessageCountAggregateInputObjectSchema])
			.optional(),
		_min: MessageMinAggregateInputObjectSchema.optional(),
		_max: MessageMaxAggregateInputObjectSchema.optional(),
		_avg: MessageAvgAggregateInputObjectSchema.optional(),
		_sum: MessageSumAggregateInputObjectSchema.optional(),
	})
	.strict();
