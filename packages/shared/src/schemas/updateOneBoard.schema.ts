import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { BoardSelectObjectSchema as BoardSelectObjectSchema } from './objects/BoardSelect.schema';
import { BoardIncludeObjectSchema as BoardIncludeObjectSchema } from './objects/BoardInclude.schema';
import { BoardUpdateInputObjectSchema as BoardUpdateInputObjectSchema } from './objects/BoardUpdateInput.schema';
import { BoardUncheckedUpdateInputObjectSchema as BoardUncheckedUpdateInputObjectSchema } from './objects/BoardUncheckedUpdateInput.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './objects/BoardWhereUniqueInput.schema';

export const BoardUpdateOneSchema: z.ZodType<Prisma.BoardUpdateArgs> = z.object({ select: BoardSelectObjectSchema.optional(), include: BoardIncludeObjectSchema.optional(), data: z.union([BoardUpdateInputObjectSchema, BoardUncheckedUpdateInputObjectSchema]), where: BoardWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BoardUpdateArgs>;

export const BoardUpdateOneZodSchema = z.object({ select: BoardSelectObjectSchema.optional(), include: BoardIncludeObjectSchema.optional(), data: z.union([BoardUpdateInputObjectSchema, BoardUncheckedUpdateInputObjectSchema]), where: BoardWhereUniqueInputObjectSchema }).strict();