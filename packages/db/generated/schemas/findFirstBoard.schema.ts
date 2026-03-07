import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { BoardScalarFieldEnumSchema } from "./enums/BoardScalarFieldEnum.schema";
import { BoardIncludeObjectSchema } from "./objects/BoardInclude.schema";
import { BoardOrderByWithRelationInputObjectSchema } from "./objects/BoardOrderByWithRelationInput.schema";
import { BoardWhereInputObjectSchema } from "./objects/BoardWhereInput.schema";
import { BoardWhereUniqueInputObjectSchema } from "./objects/BoardWhereUniqueInput.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BoardFindFirstSelectSchema: z.ZodType<Prisma.BoardSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		slug: z.boolean().optional(),
		logo: z.boolean().optional(),
		isOfficial: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		metadata: z.boolean().optional(),
		members: z.boolean().optional(),
		invitations: z.boolean().optional(),
		themeId: z.boolean().optional(),
		theme: z.boolean().optional(),
		chatrooms: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.BoardSelect>;

export const BoardFindFirstSelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		slug: z.boolean().optional(),
		logo: z.boolean().optional(),
		isOfficial: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		metadata: z.boolean().optional(),
		members: z.boolean().optional(),
		invitations: z.boolean().optional(),
		themeId: z.boolean().optional(),
		theme: z.boolean().optional(),
		chatrooms: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict();

export const BoardFindFirstSchema: z.ZodType<Prisma.BoardFindFirstArgs> = z
	.object({
		select: BoardFindFirstSelectSchema.optional(),
		include: z.lazy(() => BoardIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				BoardOrderByWithRelationInputObjectSchema,
				BoardOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: BoardWhereInputObjectSchema.optional(),
		cursor: BoardWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([BoardScalarFieldEnumSchema, BoardScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.BoardFindFirstArgs>;

export const BoardFindFirstZodSchema = z
	.object({
		select: BoardFindFirstSelectSchema.optional(),
		include: z.lazy(() => BoardIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				BoardOrderByWithRelationInputObjectSchema,
				BoardOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: BoardWhereInputObjectSchema.optional(),
		cursor: BoardWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([BoardScalarFieldEnumSchema, BoardScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict();
