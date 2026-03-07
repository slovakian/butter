import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema'

const chatroomscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ChatroomScalarWhereInputObjectSchema), z.lazy(() => ChatroomScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ChatroomScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ChatroomScalarWhereInputObjectSchema), z.lazy(() => ChatroomScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  boardId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const ChatroomScalarWhereInputObjectSchema: z.ZodType<Prisma.ChatroomScalarWhereInput> = chatroomscalarwhereinputSchema as unknown as z.ZodType<Prisma.ChatroomScalarWhereInput>;
export const ChatroomScalarWhereInputObjectZodSchema = chatroomscalarwhereinputSchema;
