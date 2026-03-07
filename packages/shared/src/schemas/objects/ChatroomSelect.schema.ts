import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardArgsObjectSchema as BoardArgsObjectSchema } from './BoardArgs.schema';
import { MessageFindManySchema as MessageFindManySchema } from '../findManyMessage.schema';
import { ChatroomCountOutputTypeArgsObjectSchema as ChatroomCountOutputTypeArgsObjectSchema } from './ChatroomCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  boardId: z.boolean().optional(),
  board: z.union([z.boolean(), z.lazy(() => BoardArgsObjectSchema)]).optional(),
  messages: z.union([z.boolean(), z.lazy(() => MessageFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ChatroomCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ChatroomSelectObjectSchema: z.ZodType<Prisma.ChatroomSelect> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomSelect>;
export const ChatroomSelectObjectZodSchema = makeSchema();
