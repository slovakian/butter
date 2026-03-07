import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { ChatroomWhereInputObjectSchema as ChatroomWhereInputObjectSchema } from './ChatroomWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ChatroomWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => ChatroomWhereInputObjectSchema).optional()
}).strict();
export const ChatroomScalarRelationFilterObjectSchema: z.ZodType<Prisma.ChatroomScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomScalarRelationFilter>;
export const ChatroomScalarRelationFilterObjectZodSchema = makeSchema();
