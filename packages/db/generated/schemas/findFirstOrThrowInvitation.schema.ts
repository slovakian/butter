import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { InvitationScalarFieldEnumSchema } from "./enums/InvitationScalarFieldEnum.schema";
import { InvitationIncludeObjectSchema } from "./objects/InvitationInclude.schema";
import { InvitationOrderByWithRelationInputObjectSchema } from "./objects/InvitationOrderByWithRelationInput.schema";
import { InvitationWhereInputObjectSchema } from "./objects/InvitationWhereInput.schema";
import { InvitationWhereUniqueInputObjectSchema } from "./objects/InvitationWhereUniqueInput.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const InvitationFindFirstOrThrowSelectSchema: z.ZodType<Prisma.InvitationSelect> =
	z
		.object({
			id: z.boolean().optional(),
			boardId: z.boolean().optional(),
			board: z.boolean().optional(),
			email: z.boolean().optional(),
			role: z.boolean().optional(),
			status: z.boolean().optional(),
			expiresAt: z.boolean().optional(),
			createdAt: z.boolean().optional(),
			inviterId: z.boolean().optional(),
			user: z.boolean().optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.InvitationSelect>;

export const InvitationFindFirstOrThrowSelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		boardId: z.boolean().optional(),
		board: z.boolean().optional(),
		email: z.boolean().optional(),
		role: z.boolean().optional(),
		status: z.boolean().optional(),
		expiresAt: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		inviterId: z.boolean().optional(),
		user: z.boolean().optional(),
	})
	.strict();

export const InvitationFindFirstOrThrowSchema: z.ZodType<Prisma.InvitationFindFirstOrThrowArgs> =
	z
		.object({
			select: InvitationFindFirstOrThrowSelectSchema.optional(),
			include: z.lazy(() => InvitationIncludeObjectSchema.optional()),
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
			distinct: z
				.union([
					InvitationScalarFieldEnumSchema,
					InvitationScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict() as unknown as z.ZodType<Prisma.InvitationFindFirstOrThrowArgs>;

export const InvitationFindFirstOrThrowZodSchema = z
	.object({
		select: InvitationFindFirstOrThrowSelectSchema.optional(),
		include: z.lazy(() => InvitationIncludeObjectSchema.optional()),
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
		distinct: z
			.union([
				InvitationScalarFieldEnumSchema,
				InvitationScalarFieldEnumSchema.array(),
			])
			.optional(),
	})
	.strict();
