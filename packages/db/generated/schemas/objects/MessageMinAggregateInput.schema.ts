import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  content: z.literal(true).optional(),
  pageNumber: z.literal(true).optional(),
  chatroomId: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const MessageMinAggregateInputObjectSchema: z.ZodType<Prisma.MessageMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MessageMinAggregateInputType>;
export const MessageMinAggregateInputObjectZodSchema = makeSchema();
