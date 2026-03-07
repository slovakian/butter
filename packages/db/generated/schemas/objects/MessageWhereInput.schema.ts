import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { ChatroomScalarRelationFilterObjectSchema as ChatroomScalarRelationFilterObjectSchema } from './ChatroomScalarRelationFilter.schema';
import { ChatroomWhereInputObjectSchema as ChatroomWhereInputObjectSchema } from './ChatroomWhereInput.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const messagewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => MessageWhereInputObjectSchema), z.lazy(() => MessageWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MessageWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MessageWhereInputObjectSchema), z.lazy(() => MessageWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  content: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  pageNumber: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  chatroomId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  chatroom: z.union([z.lazy(() => ChatroomScalarRelationFilterObjectSchema), z.lazy(() => ChatroomWhereInputObjectSchema)]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const MessageWhereInputObjectSchema: z.ZodType<Prisma.MessageWhereInput> = messagewhereinputSchema as unknown as z.ZodType<Prisma.MessageWhereInput>;
export const MessageWhereInputObjectZodSchema = messagewhereinputSchema;
