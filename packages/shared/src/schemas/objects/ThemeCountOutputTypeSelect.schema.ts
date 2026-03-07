import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeCountOutputTypeCountUsersUsingArgsObjectSchema as ThemeCountOutputTypeCountUsersUsingArgsObjectSchema } from './ThemeCountOutputTypeCountUsersUsingArgs.schema';
import { ThemeCountOutputTypeCountBoardsUsingArgsObjectSchema as ThemeCountOutputTypeCountBoardsUsingArgsObjectSchema } from './ThemeCountOutputTypeCountBoardsUsingArgs.schema'

const makeSchema = () => z.object({
  usersUsing: z.union([z.boolean(), z.lazy(() => ThemeCountOutputTypeCountUsersUsingArgsObjectSchema)]).optional(),
  boardsUsing: z.union([z.boolean(), z.lazy(() => ThemeCountOutputTypeCountBoardsUsingArgsObjectSchema)]).optional()
}).strict();
export const ThemeCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ThemeCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ThemeCountOutputTypeSelect>;
export const ThemeCountOutputTypeSelectObjectZodSchema = makeSchema();
