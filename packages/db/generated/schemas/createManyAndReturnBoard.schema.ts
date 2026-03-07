import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { BoardSelectObjectSchema as BoardSelectObjectSchema } from './objects/BoardSelect.schema';
import { BoardCreateManyInputObjectSchema as BoardCreateManyInputObjectSchema } from './objects/BoardCreateManyInput.schema';

export const BoardCreateManyAndReturnSchema: z.ZodType<Prisma.BoardCreateManyAndReturnArgs> = z.object({ select: BoardSelectObjectSchema.optional(), data: z.union([ BoardCreateManyInputObjectSchema, z.array(BoardCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.BoardCreateManyAndReturnArgs>;

export const BoardCreateManyAndReturnZodSchema = z.object({ select: BoardSelectObjectSchema.optional(), data: z.union([ BoardCreateManyInputObjectSchema, z.array(BoardCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();