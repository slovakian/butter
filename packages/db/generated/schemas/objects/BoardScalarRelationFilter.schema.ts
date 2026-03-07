import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './BoardWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => BoardWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => BoardWhereInputObjectSchema).optional()
}).strict();
export const BoardScalarRelationFilterObjectSchema: z.ZodType<Prisma.BoardScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.BoardScalarRelationFilter>;
export const BoardScalarRelationFilterObjectZodSchema = makeSchema();
