import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { UserFindManySchema as UserFindManySchema } from '../findManyUser.schema';
import { BoardFindManySchema as BoardFindManySchema } from '../findManyBoard.schema';
import { ThemeCountOutputTypeArgsObjectSchema as ThemeCountOutputTypeArgsObjectSchema } from './ThemeCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  usersUsing: z.union([z.boolean(), z.lazy(() => UserFindManySchema)]).optional(),
  boardsUsing: z.union([z.boolean(), z.lazy(() => BoardFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ThemeCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ThemeIncludeObjectSchema: z.ZodType<Prisma.ThemeInclude> = makeSchema() as unknown as z.ZodType<Prisma.ThemeInclude>;
export const ThemeIncludeObjectZodSchema = makeSchema();
