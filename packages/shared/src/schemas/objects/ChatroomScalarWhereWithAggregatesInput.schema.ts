import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'

const chatroomscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ChatroomScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ChatroomScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ChatroomScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ChatroomScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ChatroomScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  boardId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const ChatroomScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ChatroomScalarWhereWithAggregatesInput> = chatroomscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ChatroomScalarWhereWithAggregatesInput>;
export const ChatroomScalarWhereWithAggregatesInputObjectZodSchema = chatroomscalarwherewithaggregatesinputSchema;
