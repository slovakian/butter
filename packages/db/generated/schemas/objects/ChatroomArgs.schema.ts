import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { ChatroomSelectObjectSchema as ChatroomSelectObjectSchema } from './ChatroomSelect.schema';
import { ChatroomIncludeObjectSchema as ChatroomIncludeObjectSchema } from './ChatroomInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ChatroomSelectObjectSchema).optional(),
  include: z.lazy(() => ChatroomIncludeObjectSchema).optional()
}).strict();
export const ChatroomArgsObjectSchema = makeSchema();
export const ChatroomArgsObjectZodSchema = makeSchema();
