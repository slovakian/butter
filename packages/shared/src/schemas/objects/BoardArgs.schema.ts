import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardSelectObjectSchema as BoardSelectObjectSchema } from './BoardSelect.schema';
import { BoardIncludeObjectSchema as BoardIncludeObjectSchema } from './BoardInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => BoardSelectObjectSchema).optional(),
  include: z.lazy(() => BoardIncludeObjectSchema).optional()
}).strict();
export const BoardArgsObjectSchema = makeSchema();
export const BoardArgsObjectZodSchema = makeSchema();
