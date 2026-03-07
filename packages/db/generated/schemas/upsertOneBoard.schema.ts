import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { BoardSelectObjectSchema as BoardSelectObjectSchema } from './objects/BoardSelect.schema';
import { BoardIncludeObjectSchema as BoardIncludeObjectSchema } from './objects/BoardInclude.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './objects/BoardWhereUniqueInput.schema';
import { BoardCreateInputObjectSchema as BoardCreateInputObjectSchema } from './objects/BoardCreateInput.schema';
import { BoardUncheckedCreateInputObjectSchema as BoardUncheckedCreateInputObjectSchema } from './objects/BoardUncheckedCreateInput.schema';
import { BoardUpdateInputObjectSchema as BoardUpdateInputObjectSchema } from './objects/BoardUpdateInput.schema';
import { BoardUncheckedUpdateInputObjectSchema as BoardUncheckedUpdateInputObjectSchema } from './objects/BoardUncheckedUpdateInput.schema';

export const BoardUpsertOneSchema: z.ZodType<Prisma.BoardUpsertArgs> = z.object({ select: BoardSelectObjectSchema.optional(), include: BoardIncludeObjectSchema.optional(), where: BoardWhereUniqueInputObjectSchema, create: z.union([ BoardCreateInputObjectSchema, BoardUncheckedCreateInputObjectSchema ]), update: z.union([ BoardUpdateInputObjectSchema, BoardUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.BoardUpsertArgs>;

export const BoardUpsertOneZodSchema = z.object({ select: BoardSelectObjectSchema.optional(), include: BoardIncludeObjectSchema.optional(), where: BoardWhereUniqueInputObjectSchema, create: z.union([ BoardCreateInputObjectSchema, BoardUncheckedCreateInputObjectSchema ]), update: z.union([ BoardUpdateInputObjectSchema, BoardUncheckedUpdateInputObjectSchema ]) }).strict();