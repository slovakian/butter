import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './BoardWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => BoardWhereInputObjectSchema).optional(),
  some: z.lazy(() => BoardWhereInputObjectSchema).optional(),
  none: z.lazy(() => BoardWhereInputObjectSchema).optional()
}).strict();
export const BoardListRelationFilterObjectSchema: z.ZodType<Prisma.BoardListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.BoardListRelationFilter>;
export const BoardListRelationFilterObjectZodSchema = makeSchema();
