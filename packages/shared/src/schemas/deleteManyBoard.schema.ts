import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './objects/BoardWhereInput.schema';

export const BoardDeleteManySchema: z.ZodType<Prisma.BoardDeleteManyArgs> = z.object({ where: BoardWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.BoardDeleteManyArgs>;

export const BoardDeleteManyZodSchema = z.object({ where: BoardWhereInputObjectSchema.optional() }).strict();