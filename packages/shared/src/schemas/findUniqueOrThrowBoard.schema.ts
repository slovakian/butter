import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { BoardSelectObjectSchema as BoardSelectObjectSchema } from './objects/BoardSelect.schema';
import { BoardIncludeObjectSchema as BoardIncludeObjectSchema } from './objects/BoardInclude.schema';
import { BoardWhereUniqueInputObjectSchema as BoardWhereUniqueInputObjectSchema } from './objects/BoardWhereUniqueInput.schema';

export const BoardFindUniqueOrThrowSchema: z.ZodType<Prisma.BoardFindUniqueOrThrowArgs> = z.object({ select: BoardSelectObjectSchema.optional(), include: BoardIncludeObjectSchema.optional(), where: BoardWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.BoardFindUniqueOrThrowArgs>;

export const BoardFindUniqueOrThrowZodSchema = z.object({ select: BoardSelectObjectSchema.optional(), include: BoardIncludeObjectSchema.optional(), where: BoardWhereUniqueInputObjectSchema }).strict();