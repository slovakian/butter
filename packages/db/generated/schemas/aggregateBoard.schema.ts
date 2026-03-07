import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { BoardOrderByWithRelationInputObjectSchema as BoardOrderByWithRelationInputObjectSchema } from './objects/BoardOrderByWithRelationInput.schema';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './objects/BoardWhereInput.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './objects/BoardWhereUniqueInput.schema';
import { BoardCountAggregateInputObjectSchema as BoardCountAggregateInputObjectSchema } from './objects/BoardCountAggregateInput.schema';
import { BoardMinAggregateInputObjectSchema as BoardMinAggregateInputObjectSchema } from './objects/BoardMinAggregateInput.schema';
import { BoardMaxAggregateInputObjectSchema as BoardMaxAggregateInputObjectSchema } from './objects/BoardMaxAggregateInput.schema';
import { BoardAvgAggregateInputObjectSchema as BoardAvgAggregateInputObjectSchema } from './objects/BoardAvgAggregateInput.schema';
import { BoardSumAggregateInputObjectSchema as BoardSumAggregateInputObjectSchema } from './objects/BoardSumAggregateInput.schema';

export const BoardAggregateSchema: z.ZodType<Prisma.BoardAggregateArgs> = z.object({ orderBy: z.union([BoardOrderByWithRelationInputObjectSchema, BoardOrderByWithRelationInputObjectSchema.array()]).optional(), where: BoardWhereInputObjectSchema.optional(), cursor: BoardWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), BoardCountAggregateInputObjectSchema ]).optional(), _min: BoardMinAggregateInputObjectSchema.optional(), _max: BoardMaxAggregateInputObjectSchema.optional(), _avg: BoardAvgAggregateInputObjectSchema.optional(), _sum: BoardSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BoardAggregateArgs>;

export const BoardAggregateZodSchema = z.object({ orderBy: z.union([BoardOrderByWithRelationInputObjectSchema, BoardOrderByWithRelationInputObjectSchema.array()]).optional(), where: BoardWhereInputObjectSchema.optional(), cursor: BoardWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), BoardCountAggregateInputObjectSchema ]).optional(), _min: BoardMinAggregateInputObjectSchema.optional(), _max: BoardMaxAggregateInputObjectSchema.optional(), _avg: BoardAvgAggregateInputObjectSchema.optional(), _sum: BoardSumAggregateInputObjectSchema.optional() }).strict();