import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ChatroomAvgAggregateInputObjectSchema } from "./objects/ChatroomAvgAggregateInput.schema";
import { ChatroomCountAggregateInputObjectSchema } from "./objects/ChatroomCountAggregateInput.schema";
import { ChatroomMaxAggregateInputObjectSchema } from "./objects/ChatroomMaxAggregateInput.schema";
import { ChatroomMinAggregateInputObjectSchema } from "./objects/ChatroomMinAggregateInput.schema";
import { ChatroomOrderByWithRelationInputObjectSchema } from "./objects/ChatroomOrderByWithRelationInput.schema";
import { ChatroomSumAggregateInputObjectSchema } from "./objects/ChatroomSumAggregateInput.schema";
import { ChatroomWhereInputObjectSchema } from "./objects/ChatroomWhereInput.schema";
import { ChatroomWhereUniqueInputObjectSchema } from "./objects/ChatroomWhereUniqueInput.schema";

export const ChatroomAggregateSchema: z.ZodType<Prisma.ChatroomAggregateArgs> =
	z
		.object({
			orderBy: z
				.union([
					ChatroomOrderByWithRelationInputObjectSchema,
					ChatroomOrderByWithRelationInputObjectSchema.array(),
				])
				.optional(),
			where: ChatroomWhereInputObjectSchema.optional(),
			cursor: ChatroomWhereUniqueInputObjectSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			_count: z
				.union([z.literal(true), ChatroomCountAggregateInputObjectSchema])
				.optional(),
			_min: ChatroomMinAggregateInputObjectSchema.optional(),
			_max: ChatroomMaxAggregateInputObjectSchema.optional(),
			_avg: ChatroomAvgAggregateInputObjectSchema.optional(),
			_sum: ChatroomSumAggregateInputObjectSchema.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.ChatroomAggregateArgs>;

export const ChatroomAggregateZodSchema = z
	.object({
		orderBy: z
			.union([
				ChatroomOrderByWithRelationInputObjectSchema,
				ChatroomOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: ChatroomWhereInputObjectSchema.optional(),
		cursor: ChatroomWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		_count: z
			.union([z.literal(true), ChatroomCountAggregateInputObjectSchema])
			.optional(),
		_min: ChatroomMinAggregateInputObjectSchema.optional(),
		_max: ChatroomMaxAggregateInputObjectSchema.optional(),
		_avg: ChatroomAvgAggregateInputObjectSchema.optional(),
		_sum: ChatroomSumAggregateInputObjectSchema.optional(),
	})
	.strict();
