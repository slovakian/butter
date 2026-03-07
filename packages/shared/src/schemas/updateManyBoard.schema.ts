import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { BoardUpdateManyMutationInputObjectSchema as BoardUpdateManyMutationInputObjectSchema } from './objects/BoardUpdateManyMutationInput.schema';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './objects/BoardWhereInput.schema';

export const BoardUpdateManySchema: z.ZodType<Prisma.BoardUpdateManyArgs> = z.object({ data: BoardUpdateManyMutationInputObjectSchema, where: BoardWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BoardUpdateManyArgs>;

export const BoardUpdateManyZodSchema = z.object({ data: BoardUpdateManyMutationInputObjectSchema, where: BoardWhereInputObjectSchema.optional() }).strict();