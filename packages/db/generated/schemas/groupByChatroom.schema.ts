import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ChatroomScalarFieldEnumSchema } from "./enums/ChatroomScalarFieldEnum.schema";
import { ChatroomAvgAggregateInputObjectSchema } from "./objects/ChatroomAvgAggregateInput.schema";
import { ChatroomCountAggregateInputObjectSchema } from "./objects/ChatroomCountAggregateInput.schema";
import { ChatroomMaxAggregateInputObjectSchema } from "./objects/ChatroomMaxAggregateInput.schema";
import { ChatroomMinAggregateInputObjectSchema } from "./objects/ChatroomMinAggregateInput.schema";
import { ChatroomOrderByWithAggregationInputObjectSchema } from "./objects/ChatroomOrderByWithAggregationInput.schema";
import { ChatroomScalarWhereWithAggregatesInputObjectSchema } from "./objects/ChatroomScalarWhereWithAggregatesInput.schema";
import { ChatroomSumAggregateInputObjectSchema } from "./objects/ChatroomSumAggregateInput.schema";
import { ChatroomWhereInputObjectSchema } from "./objects/ChatroomWhereInput.schema";

export const ChatroomGroupBySchema: z.ZodType<Prisma.ChatroomGroupByArgs> = z
	.object({
		where: ChatroomWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				ChatroomOrderByWithAggregationInputObjectSchema,
				ChatroomOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: ChatroomScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(ChatroomScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), ChatroomCountAggregateInputObjectSchema])
			.optional(),
		_min: ChatroomMinAggregateInputObjectSchema.optional(),
		_max: ChatroomMaxAggregateInputObjectSchema.optional(),
		_avg: ChatroomAvgAggregateInputObjectSchema.optional(),
		_sum: ChatroomSumAggregateInputObjectSchema.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.ChatroomGroupByArgs>;

export const ChatroomGroupByZodSchema = z
	.object({
		where: ChatroomWhereInputObjectSchema.optional(),
		orderBy: z
			.union([
				ChatroomOrderByWithAggregationInputObjectSchema,
				ChatroomOrderByWithAggregationInputObjectSchema.array(),
			])
			.optional(),
		having: ChatroomScalarWhereWithAggregatesInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		by: z.array(ChatroomScalarFieldEnumSchema),
		_count: z
			.union([z.literal(true), ChatroomCountAggregateInputObjectSchema])
			.optional(),
		_min: ChatroomMinAggregateInputObjectSchema.optional(),
		_max: ChatroomMaxAggregateInputObjectSchema.optional(),
		_avg: ChatroomAvgAggregateInputObjectSchema.optional(),
		_sum: ChatroomSumAggregateInputObjectSchema.optional(),
	})
	.strict();
