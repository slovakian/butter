import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MessageAvgAggregateInputObjectSchema } from "./objects/MessageAvgAggregateInput.schema";
import { MessageCountAggregateInputObjectSchema } from "./objects/MessageCountAggregateInput.schema";
import { MessageMaxAggregateInputObjectSchema } from "./objects/MessageMaxAggregateInput.schema";
import { MessageMinAggregateInputObjectSchema } from "./objects/MessageMinAggregateInput.schema";
import { MessageOrderByWithRelationInputObjectSchema } from "./objects/MessageOrderByWithRelationInput.schema";
import { MessageSumAggregateInputObjectSchema } from "./objects/MessageSumAggregateInput.schema";
import { MessageWhereInputObjectSchema } from "./objects/MessageWhereInput.schema";
import { MessageWhereUniqueInputObjectSchema } from "./objects/MessageWhereUniqueInput.schema";

export const MessageAggregateSchema: z.ZodType<Prisma.MessageAggregateArgs> = z
	.object({
		orderBy: z
			.union([
				MessageOrderByWithRelationInputObjectSchema,
				MessageOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: MessageWhereInputObjectSchema.optional(),
		cursor: MessageWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		_count: z
			.union([z.literal(true), MessageCountAggregateInputObjectSchema])
			.optional(),
		_min: MessageMinAggregateInputObjectSchema.optional(),
		_max: MessageMaxAggregateInputObjectSchema.optional(),
		_avg: MessageAvgAggregateInputObjectSchema.optional(),
		_sum: MessageSumAggregateInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.MessageAggregateArgs>;

export const MessageAggregateZodSchema = z
	.object({
		orderBy: z
			.union([
				MessageOrderByWithRelationInputObjectSchema,
				MessageOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: MessageWhereInputObjectSchema.optional(),
		cursor: MessageWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		_count: z
			.union([z.literal(true), MessageCountAggregateInputObjectSchema])
			.optional(),
		_min: MessageMinAggregateInputObjectSchema.optional(),
		_max: MessageMaxAggregateInputObjectSchema.optional(),
		_avg: MessageAvgAggregateInputObjectSchema.optional(),
		_sum: MessageSumAggregateInputObjectSchema.optional(),
	})
	.strict();
