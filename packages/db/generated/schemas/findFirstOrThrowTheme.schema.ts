import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { ThemeIncludeObjectSchema as ThemeIncludeObjectSchema } from './objects/ThemeInclude.schema';
import { ThemeOrderByWithRelationInputObjectSchema as ThemeOrderByWithRelationInputObjectSchema } from './objects/ThemeOrderByWithRelationInput.schema';
import { ThemeWhereInputObjectSchema as ThemeWhereInputObjectSchema } from './objects/ThemeWhereInput.schema';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './objects/ThemeWhereUniqueInput.schema';
import { ThemeScalarFieldEnumSchema } from './enums/ThemeScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ThemeFindFirstOrThrowSelectSchema: z.ZodType<Prisma.ThemeSelect> = z.object({
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
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ThemeSelect>;

export const ThemeFindFirstOrThrowSelectZodSchema = z.object({
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
    _count: z.boolean().optional()
  }).strict();

export const ThemeFindFirstOrThrowSchema: z.ZodType<Prisma.ThemeFindFirstOrThrowArgs> = z.object({ select: ThemeFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ThemeIncludeObjectSchema.optional()), orderBy: z.union([ThemeOrderByWithRelationInputObjectSchema, ThemeOrderByWithRelationInputObjectSchema.array()]).optional(), where: ThemeWhereInputObjectSchema.optional(), cursor: ThemeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ThemeScalarFieldEnumSchema, ThemeScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ThemeFindFirstOrThrowArgs>;

export const ThemeFindFirstOrThrowZodSchema = z.object({ select: ThemeFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ThemeIncludeObjectSchema.optional()), orderBy: z.union([ThemeOrderByWithRelationInputObjectSchema, ThemeOrderByWithRelationInputObjectSchema.array()]).optional(), where: ThemeWhereInputObjectSchema.optional(), cursor: ThemeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ThemeScalarFieldEnumSchema, ThemeScalarFieldEnumSchema.array()]).optional() }).strict();