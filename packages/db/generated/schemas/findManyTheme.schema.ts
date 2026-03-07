import * as z from "zod";
import type { Prisma } from "../../prisma/generated/client";
import { ThemeScalarFieldEnumSchema } from "./enums/ThemeScalarFieldEnum.schema";
import { ThemeIncludeObjectSchema } from "./objects/ThemeInclude.schema";
import { ThemeOrderByWithRelationInputObjectSchema } from "./objects/ThemeOrderByWithRelationInput.schema";
import { ThemeWhereInputObjectSchema } from "./objects/ThemeWhereInput.schema";
import { ThemeWhereUniqueInputObjectSchema } from "./objects/ThemeWhereUniqueInput.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ThemeFindManySelectSchema: z.ZodType<Prisma.ThemeSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		isDark: z.boolean().optional(),
		variables: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.boolean().optional(),
		usersUsing: z.boolean().optional(),
		boardsUsing: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.ThemeSelect>;

export const ThemeFindManySelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		isDark: z.boolean().optional(),
		variables: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.boolean().optional(),
		usersUsing: z.boolean().optional(),
		boardsUsing: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict();

export const ThemeFindManySchema: z.ZodType<Prisma.ThemeFindManyArgs> = z
	.object({
		select: ThemeFindManySelectSchema.optional(),
		include: z.lazy(() => ThemeIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				ThemeOrderByWithRelationInputObjectSchema,
				ThemeOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: ThemeWhereInputObjectSchema.optional(),
		cursor: ThemeWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([ThemeScalarFieldEnumSchema, ThemeScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.ThemeFindManyArgs>;

export const ThemeFindManyZodSchema = z
	.object({
		select: ThemeFindManySelectSchema.optional(),
		include: z.lazy(() => ThemeIncludeObjectSchema.optional()),
		orderBy: z
			.union([
				ThemeOrderByWithRelationInputObjectSchema,
				ThemeOrderByWithRelationInputObjectSchema.array(),
			])
			.optional(),
		where: ThemeWhereInputObjectSchema.optional(),
		cursor: ThemeWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([ThemeScalarFieldEnumSchema, ThemeScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict();
