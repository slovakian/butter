import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './objects/BoardWhereInput.schema';
import { BoardOrderByWithAggregationInputObjectSchema as BoardOrderByWithAggregationInputObjectSchema } from './objects/BoardOrderByWithAggregationInput.schema';
import { BoardScalarWhereWithAggregatesInputObjectSchema as BoardScalarWhereWithAggregatesInputObjectSchema } from './objects/BoardScalarWhereWithAggregatesInput.schema';
import { BoardScalarFieldEnumSchema } from './enums/BoardScalarFieldEnum.schema';
import { BoardCountAggregateInputObjectSchema as BoardCountAggregateInputObjectSchema } from './objects/BoardCountAggregateInput.schema';
import { BoardMinAggregateInputObjectSchema as BoardMinAggregateInputObjectSchema } from './objects/BoardMinAggregateInput.schema';
import { BoardMaxAggregateInputObjectSchema as BoardMaxAggregateInputObjectSchema } from './objects/BoardMaxAggregateInput.schema';
import { BoardAvgAggregateInputObjectSchema as BoardAvgAggregateInputObjectSchema } from './objects/BoardAvgAggregateInput.schema';
import { BoardSumAggregateInputObjectSchema as BoardSumAggregateInputObjectSchema } from './objects/BoardSumAggregateInput.schema';

export const BoardGroupBySchema: z.ZodType<Prisma.BoardGroupByArgs> = z.object({ where: BoardWhereInputObjectSchema.optional(), orderBy: z.union([BoardOrderByWithAggregationInputObjectSchema, BoardOrderByWithAggregationInputObjectSchema.array()]).optional(), having: BoardScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(BoardScalarFieldEnumSchema), _count: z.union([ z.literal(true), BoardCountAggregateInputObjectSchema ]).optional(), _min: BoardMinAggregateInputObjectSchema.optional(), _max: BoardMaxAggregateInputObjectSchema.optional(), _avg: BoardAvgAggregateInputObjectSchema.optional(), _sum: BoardSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BoardGroupByArgs>;

export const BoardGroupByZodSchema = z.object({ where: BoardWhereInputObjectSchema.optional(), orderBy: z.union([BoardOrderByWithAggregationInputObjectSchema, BoardOrderByWithAggregationInputObjectSchema.array()]).optional(), having: BoardScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(BoardScalarFieldEnumSchema), _count: z.union([ z.literal(true), BoardCountAggregateInputObjectSchema ]).optional(), _min: BoardMinAggregateInputObjectSchema.optional(), _max: BoardMaxAggregateInputObjectSchema.optional(), _avg: BoardAvgAggregateInputObjectSchema.optional(), _sum: BoardSumAggregateInputObjectSchema.optional() }).strict();