import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { ChatroomWhereInputObjectSchema as ChatroomWhereInputObjectSchema } from './ChatroomWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ChatroomWhereInputObjectSchema).optional(),
  some: z.lazy(() => ChatroomWhereInputObjectSchema).optional(),
  none: z.lazy(() => ChatroomWhereInputObjectSchema).optional()
}).strict();
export const ChatroomListRelationFilterObjectSchema: z.ZodType<Prisma.ChatroomListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomListRelationFilter>;
export const ChatroomListRelationFilterObjectZodSchema = makeSchema();
