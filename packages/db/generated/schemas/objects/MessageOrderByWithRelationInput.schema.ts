import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ChatroomOrderByWithRelationInputObjectSchema as ChatroomOrderByWithRelationInputObjectSchema } from './ChatroomOrderByWithRelationInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  pageNumber: SortOrderSchema.optional(),
  chatroomId: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  chatroom: z.lazy(() => ChatroomOrderByWithRelationInputObjectSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const MessageOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.MessageOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageOrderByWithRelationInput>;
export const MessageOrderByWithRelationInputObjectZodSchema = makeSchema();
