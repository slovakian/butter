import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ChatroomCountOutputTypeCountMessagesArgsObjectSchema as ChatroomCountOutputTypeCountMessagesArgsObjectSchema } from './ChatroomCountOutputTypeCountMessagesArgs.schema'

const makeSchema = () => z.object({
  messages: z.union([z.boolean(), z.lazy(() => ChatroomCountOutputTypeCountMessagesArgsObjectSchema)]).optional()
}).strict();
export const ChatroomCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ChatroomCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomCountOutputTypeSelect>;
export const ChatroomCountOutputTypeSelectObjectZodSchema = makeSchema();
