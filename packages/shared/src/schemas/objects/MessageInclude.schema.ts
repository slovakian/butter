import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ChatroomArgsObjectSchema as ChatroomArgsObjectSchema } from './ChatroomArgs.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  chatroom: z.union([z.boolean(), z.lazy(() => ChatroomArgsObjectSchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const MessageIncludeObjectSchema: z.ZodType<Prisma.MessageInclude> = makeSchema() as unknown as z.ZodType<Prisma.MessageInclude>;
export const MessageIncludeObjectZodSchema = makeSchema();
