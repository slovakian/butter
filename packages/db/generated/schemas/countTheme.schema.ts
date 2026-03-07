import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { ThemeOrderByWithRelationInputObjectSchema as ThemeOrderByWithRelationInputObjectSchema } from './objects/ThemeOrderByWithRelationInput.schema';
import { ThemeWhereInputObjectSchema as ThemeWhereInputObjectSchema } from './objects/ThemeWhereInput.schema';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './objects/ThemeWhereUniqueInput.schema';
import { ThemeCountAggregateInputObjectSchema as ThemeCountAggregateInputObjectSchema } from './objects/ThemeCountAggregateInput.schema';

export const ThemeCountSchema: z.ZodType<Prisma.ThemeCountArgs> = z.object({ orderBy: z.union([ThemeOrderByWithRelationInputObjectSchema, ThemeOrderByWithRelationInputObjectSchema.array()]).optional(), where: ThemeWhereInputObjectSchema.optional(), cursor: ThemeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ThemeCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ThemeCountArgs>;

export const ThemeCountZodSchema = z.object({ orderBy: z.union([ThemeOrderByWithRelationInputObjectSchema, ThemeOrderByWithRelationInputObjectSchema.array()]).optional(), where: ThemeWhereInputObjectSchema.optional(), cursor: ThemeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ThemeCountAggregateInputObjectSchema ]).optional() }).strict();