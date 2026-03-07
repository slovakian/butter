import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberCountAggregateInputObjectSchema } from "./objects/MemberCountAggregateInput.schema";
import { MemberOrderByWithRelationInputObjectSchema } from "./objects/MemberOrderByWithRelationInput.schema";
import { MemberWhereInputObjectSchema } from "./objects/MemberWhereInput.schema";
import { MemberWhereUniqueInputObjectSchema } from "./objects/MemberWhereUniqueInput.schema";

export const MemberCountSchema: z.ZodType<Prisma.MemberCountArgs> = z
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
		select: z
			.union([z.literal(true), MemberCountAggregateInputObjectSchema])
			.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.MemberCountArgs>;

export const MemberCountZodSchema = z
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
		select: z
			.union([z.literal(true), MemberCountAggregateInputObjectSchema])
			.optional(),
	})
	.strict();
