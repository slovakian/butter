import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  boardId: z.literal(true).optional()
}).strict();
export const ChatroomAvgAggregateInputObjectSchema: z.ZodType<Prisma.ChatroomAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomAvgAggregateInputType>;
export const ChatroomAvgAggregateInputObjectZodSchema = makeSchema();
