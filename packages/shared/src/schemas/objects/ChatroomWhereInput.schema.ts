import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoardScalarRelationFilterObjectSchema as BoardScalarRelationFilterObjectSchema } from './BoardScalarRelationFilter.schema';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './BoardWhereInput.schema';
import { MessageListRelationFilterObjectSchema as MessageListRelationFilterObjectSchema } from './MessageListRelationFilter.schema'

const chatroomwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ChatroomWhereInputObjectSchema), z.lazy(() => ChatroomWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ChatroomWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ChatroomWhereInputObjectSchema), z.lazy(() => ChatroomWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  boardId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  board: z.union([z.lazy(() => BoardScalarRelationFilterObjectSchema), z.lazy(() => BoardWhereInputObjectSchema)]).optional(),
  messages: z.lazy(() => MessageListRelationFilterObjectSchema).optional()
}).strict();
export const ChatroomWhereInputObjectSchema: z.ZodType<Prisma.ChatroomWhereInput> = chatroomwhereinputSchema as unknown as z.ZodType<Prisma.ChatroomWhereInput>;
export const ChatroomWhereInputObjectZodSchema = chatroomwhereinputSchema;
