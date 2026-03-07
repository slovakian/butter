import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { MemberScalarFieldEnumSchema } from "./enums/MemberScalarFieldEnum.schema";
import { MemberIncludeObjectSchema } from "./objects/MemberInclude.schema";
import { MemberOrderByWithRelationInputObjectSchema } from "./objects/MemberOrderByWithRelationInput.schema";
import { MemberWhereInputObjectSchema } from "./objects/MemberWhereInput.schema";
import { MemberWhereUniqueInputObjectSchema } from "./objects/MemberWhereUniqueInput.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MemberFindFirstSelectSchema: z.ZodType<Prisma.MemberSelect> = z
	.object({
		id: z.boolean().optional(),
		boardId: z.boolean().optional(),
		board: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.boolean().optional(),
		role: z.boolean().optional(),
		createdAt: z.boolean().optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.MemberSelect>;

export const MemberFindFirstSelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		boardId: z.boolean().optional(),
		board: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.boolean().optional(),
		role: z.boolean().optional(),
		createdAt: z.boolean().optional(),
	})
	.strict();

export const MemberFindFirstSchema: z.ZodType<Prisma.MemberFindFirstArgs> = z
	.object({
		select: MemberFindFirstSelectSchema.optional(),
		include: z.lazy(() => MemberIncludeObjectSchema.optional()),
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
		distinct: z
			.union([MemberScalarFieldEnumSchema, MemberScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.MemberFindFirstArgs>;

export const MemberFindFirstZodSchema = z
	.object({
		select: MemberFindFirstSelectSchema.optional(),
		include: z.lazy(() => MemberIncludeObjectSchema.optional()),
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
		distinct: z
			.union([MemberScalarFieldEnumSchema, MemberScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict();
