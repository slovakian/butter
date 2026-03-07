import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { InvitationCountAggregateInputObjectSchema } from "./objects/InvitationCountAggregateInput.schema";
import { InvitationOrderByWithRelationInputObjectSchema } from "./objects/InvitationOrderByWithRelationInput.schema";
import { InvitationWhereInputObjectSchema } from "./objects/InvitationWhereInput.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./objects/InvitationWhereUniqueInput.schema";

export const InvitationCountSchema: z.ZodType<Prisma.InvitationCountArgs> = z
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
		select: z
			.union([z.literal(true), InvitationCountAggregateInputObjectSchema])
			.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.InvitationCountArgs>;

export const InvitationCountZodSchema = z
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
		select: z
			.union([z.literal(true), InvitationCountAggregateInputObjectSchema])
			.optional(),
	})
	.strict();
