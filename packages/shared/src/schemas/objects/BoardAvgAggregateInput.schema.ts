import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  themeId: z.literal(true).optional()
}).strict();
export const BoardAvgAggregateInputObjectSchema: z.ZodType<Prisma.BoardAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BoardAvgAggregateInputType>;
export const BoardAvgAggregateInputObjectZodSchema = makeSchema();
