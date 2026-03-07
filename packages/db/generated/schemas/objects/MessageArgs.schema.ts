import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MessageSelectObjectSchema as MessageSelectObjectSchema } from './MessageSelect.schema';
import { MessageIncludeObjectSchema as MessageIncludeObjectSchema } from './MessageInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => MessageSelectObjectSchema).optional(),
  include: z.lazy(() => MessageIncludeObjectSchema).optional()
}).strict();
export const MessageArgsObjectSchema = makeSchema();
export const MessageArgsObjectZodSchema = makeSchema();
