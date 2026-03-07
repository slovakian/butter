import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { BoardSelectObjectSchema as BoardSelectObjectSchema } from './objects/BoardSelect.schema';
import { BoardUpdateManyMutationInputObjectSchema as BoardUpdateManyMutationInputObjectSchema } from './objects/BoardUpdateManyMutationInput.schema';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './objects/BoardWhereInput.schema';

export const BoardUpdateManyAndReturnSchema: z.ZodType<Prisma.BoardUpdateManyAndReturnArgs> = z.object({ select: BoardSelectObjectSchema.optional(), data: BoardUpdateManyMutationInputObjectSchema, where: BoardWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BoardUpdateManyAndReturnArgs>;

export const BoardUpdateManyAndReturnZodSchema = z.object({ select: BoardSelectObjectSchema.optional(), data: BoardUpdateManyMutationInputObjectSchema, where: BoardWhereInputObjectSchema.optional() }).strict();