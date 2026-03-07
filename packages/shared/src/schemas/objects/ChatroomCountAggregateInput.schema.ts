import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  slug: z.literal(true).optional(),
  boardId: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ChatroomCountAggregateInputObjectSchema: z.ZodType<Prisma.ChatroomCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomCountAggregateInputType>;
export const ChatroomCountAggregateInputObjectZodSchema = makeSchema();
