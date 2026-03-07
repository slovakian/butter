import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  content: z.literal(true).optional(),
  pageNumber: z.literal(true).optional(),
  chatroomId: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const MessageCountAggregateInputObjectSchema: z.ZodType<Prisma.MessageCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MessageCountAggregateInputType>;
export const MessageCountAggregateInputObjectZodSchema = makeSchema();
