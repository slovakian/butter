import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './BoardWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BoardWhereInputObjectSchema).optional()
}).strict();
export const ThemeCountOutputTypeCountBoardsUsingArgsObjectSchema = makeSchema();
export const ThemeCountOutputTypeCountBoardsUsingArgsObjectZodSchema = makeSchema();
