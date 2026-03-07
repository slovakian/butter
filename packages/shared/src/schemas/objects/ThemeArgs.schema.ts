import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeSelectObjectSchema as ThemeSelectObjectSchema } from './ThemeSelect.schema';
import { ThemeIncludeObjectSchema as ThemeIncludeObjectSchema } from './ThemeInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ThemeSelectObjectSchema).optional(),
  include: z.lazy(() => ThemeIncludeObjectSchema).optional()
}).strict();
export const ThemeArgsObjectSchema = makeSchema();
export const ThemeArgsObjectZodSchema = makeSchema();
