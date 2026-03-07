import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { ThemeWhereInputObjectSchema as ThemeWhereInputObjectSchema } from './objects/ThemeWhereInput.schema';
import { ThemeOrderByWithAggregationInputObjectSchema as ThemeOrderByWithAggregationInputObjectSchema } from './objects/ThemeOrderByWithAggregationInput.schema';
import { ThemeScalarWhereWithAggregatesInputObjectSchema as ThemeScalarWhereWithAggregatesInputObjectSchema } from './objects/ThemeScalarWhereWithAggregatesInput.schema';
import { ThemeScalarFieldEnumSchema } from './enums/ThemeScalarFieldEnum.schema';
import { ThemeCountAggregateInputObjectSchema as ThemeCountAggregateInputObjectSchema } from './objects/ThemeCountAggregateInput.schema';
import { ThemeMinAggregateInputObjectSchema as ThemeMinAggregateInputObjectSchema } from './objects/ThemeMinAggregateInput.schema';
import { ThemeMaxAggregateInputObjectSchema as ThemeMaxAggregateInputObjectSchema } from './objects/ThemeMaxAggregateInput.schema';
import { ThemeAvgAggregateInputObjectSchema as ThemeAvgAggregateInputObjectSchema } from './objects/ThemeAvgAggregateInput.schema';
import { ThemeSumAggregateInputObjectSchema as ThemeSumAggregateInputObjectSchema } from './objects/ThemeSumAggregateInput.schema';

export const ThemeGroupBySchema: z.ZodType<Prisma.ThemeGroupByArgs> = z.object({ where: ThemeWhereInputObjectSchema.optional(), orderBy: z.union([ThemeOrderByWithAggregationInputObjectSchema, ThemeOrderByWithAggregationInputObjectSchema.array()]).optional(), having: ThemeScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(ThemeScalarFieldEnumSchema), _count: z.union([ z.literal(true), ThemeCountAggregateInputObjectSchema ]).optional(), _min: ThemeMinAggregateInputObjectSchema.optional(), _max: ThemeMaxAggregateInputObjectSchema.optional(), _avg: ThemeAvgAggregateInputObjectSchema.optional(), _sum: ThemeSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ThemeGroupByArgs>;

export const ThemeGroupByZodSchema = z.object({ where: ThemeWhereInputObjectSchema.optional(), orderBy: z.union([ThemeOrderByWithAggregationInputObjectSchema, ThemeOrderByWithAggregationInputObjectSchema.array()]).optional(), having: ThemeScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(ThemeScalarFieldEnumSchema), _count: z.union([ z.literal(true), ThemeCountAggregateInputObjectSchema ]).optional(), _min: ThemeMinAggregateInputObjectSchema.optional(), _max: ThemeMaxAggregateInputObjectSchema.optional(), _avg: ThemeAvgAggregateInputObjectSchema.optional(), _sum: ThemeSumAggregateInputObjectSchema.optional() }).strict();