import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { BoardOrderByWithRelationInputObjectSchema as BoardOrderByWithRelationInputObjectSchema } from './objects/BoardOrderByWithRelationInput.schema';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './objects/BoardWhereInput.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './objects/BoardWhereUniqueInput.schema';
import { BoardCountAggregateInputObjectSchema as BoardCountAggregateInputObjectSchema } from './objects/BoardCountAggregateInput.schema';

export const BoardCountSchema: z.ZodType<Prisma.BoardCountArgs> = z.object({ orderBy: z.union([BoardOrderByWithRelationInputObjectSchema, BoardOrderByWithRelationInputObjectSchema.array()]).optional(), where: BoardWhereInputObjectSchema.optional(), cursor: BoardWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BoardCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.BoardCountArgs>;

export const BoardCountZodSchema = z.object({ orderBy: z.union([BoardOrderByWithRelationInputObjectSchema, BoardOrderByWithRelationInputObjectSchema.array()]).optional(), where: BoardWhereInputObjectSchema.optional(), cursor: BoardWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BoardCountAggregateInputObjectSchema ]).optional() }).strict();