import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { UserFindManySchema as UserFindManySchema } from '../findManyUser.schema';
import { BoardFindManySchema as BoardFindManySchema } from '../findManyBoard.schema';
import { ThemeCountOutputTypeArgsObjectSchema as ThemeCountOutputTypeArgsObjectSchema } from './ThemeCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  isDark: z.boolean().optional(),
  variables: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  usersUsing: z.union([z.boolean(), z.lazy(() => UserFindManySchema)]).optional(),
  boardsUsing: z.union([z.boolean(), z.lazy(() => BoardFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ThemeCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ThemeSelectObjectSchema: z.ZodType<Prisma.ThemeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ThemeSelect>;
export const ThemeSelectObjectZodSchema = makeSchema();
