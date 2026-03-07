import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { ThemeOrderByWithRelationInputObjectSchema as ThemeOrderByWithRelationInputObjectSchema } from './objects/ThemeOrderByWithRelationInput.schema';
import { ThemeWhereInputObjectSchema as ThemeWhereInputObjectSchema } from './objects/ThemeWhereInput.schema';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './objects/ThemeWhereUniqueInput.schema';
import { ThemeCountAggregateInputObjectSchema as ThemeCountAggregateInputObjectSchema } from './objects/ThemeCountAggregateInput.schema';
import { ThemeMinAggregateInputObjectSchema as ThemeMinAggregateInputObjectSchema } from './objects/ThemeMinAggregateInput.schema';
import { ThemeMaxAggregateInputObjectSchema as ThemeMaxAggregateInputObjectSchema } from './objects/ThemeMaxAggregateInput.schema';
import { ThemeAvgAggregateInputObjectSchema as ThemeAvgAggregateInputObjectSchema } from './objects/ThemeAvgAggregateInput.schema';
import { ThemeSumAggregateInputObjectSchema as ThemeSumAggregateInputObjectSchema } from './objects/ThemeSumAggregateInput.schema';

export const ThemeAggregateSchema: z.ZodType<Prisma.ThemeAggregateArgs> = z.object({ orderBy: z.union([ThemeOrderByWithRelationInputObjectSchema, ThemeOrderByWithRelationInputObjectSchema.array()]).optional(), where: ThemeWhereInputObjectSchema.optional(), cursor: ThemeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ThemeCountAggregateInputObjectSchema ]).optional(), _min: ThemeMinAggregateInputObjectSchema.optional(), _max: ThemeMaxAggregateInputObjectSchema.optional(), _avg: ThemeAvgAggregateInputObjectSchema.optional(), _sum: ThemeSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ThemeAggregateArgs>;

export const ThemeAggregateZodSchema = z.object({ orderBy: z.union([ThemeOrderByWithRelationInputObjectSchema, ThemeOrderByWithRelationInputObjectSchema.array()]).optional(), where: ThemeWhereInputObjectSchema.optional(), cursor: ThemeWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), ThemeCountAggregateInputObjectSchema ]).optional(), _min: ThemeMinAggregateInputObjectSchema.optional(), _max: ThemeMaxAggregateInputObjectSchema.optional(), _avg: ThemeAvgAggregateInputObjectSchema.optional(), _sum: ThemeSumAggregateInputObjectSchema.optional() }).strict();