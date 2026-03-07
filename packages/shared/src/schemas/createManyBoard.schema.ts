import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { BoardCreateManyInputObjectSchema as BoardCreateManyInputObjectSchema } from './objects/BoardCreateManyInput.schema';

export const BoardCreateManySchema: z.ZodType<Prisma.BoardCreateManyArgs> = z.object({ data: z.union([ BoardCreateManyInputObjectSchema, z.array(BoardCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.BoardCreateManyArgs>;

export const BoardCreateManyZodSchema = z.object({ data: z.union([ BoardCreateManyInputObjectSchema, z.array(BoardCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();