import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { BoardIncludeObjectSchema as BoardIncludeObjectSchema } from './objects/BoardInclude.schema';
import { BoardOrderByWithRelationInputObjectSchema as BoardOrderByWithRelationInputObjectSchema } from './objects/BoardOrderByWithRelationInput.schema';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './objects/BoardWhereInput.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './objects/BoardWhereUniqueInput.schema';
import { BoardScalarFieldEnumSchema } from './enums/BoardScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BoardFindManySelectSchema: z.ZodType<Prisma.BoardSelect> = z.object({
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
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.BoardSelect>;

export const BoardFindManySelectZodSchema = z.object({
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
    _count: z.boolean().optional()
  }).strict();

export const BoardFindManySchema: z.ZodType<Prisma.BoardFindManyArgs> = z.object({ select: BoardFindManySelectSchema.optional(), include: z.lazy(() => BoardIncludeObjectSchema.optional()), orderBy: z.union([BoardOrderByWithRelationInputObjectSchema, BoardOrderByWithRelationInputObjectSchema.array()]).optional(), where: BoardWhereInputObjectSchema.optional(), cursor: BoardWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BoardScalarFieldEnumSchema, BoardScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.BoardFindManyArgs>;

export const BoardFindManyZodSchema = z.object({ select: BoardFindManySelectSchema.optional(), include: z.lazy(() => BoardIncludeObjectSchema.optional()), orderBy: z.union([BoardOrderByWithRelationInputObjectSchema, BoardOrderByWithRelationInputObjectSchema.array()]).optional(), where: BoardWhereInputObjectSchema.optional(), cursor: BoardWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([BoardScalarFieldEnumSchema, BoardScalarFieldEnumSchema.array()]).optional() }).strict();