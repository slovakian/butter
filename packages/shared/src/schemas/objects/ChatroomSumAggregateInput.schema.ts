import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  boardId: z.literal(true).optional()
}).strict();
export const ChatroomSumAggregateInputObjectSchema: z.ZodType<Prisma.ChatroomSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomSumAggregateInputType>;
export const ChatroomSumAggregateInputObjectZodSchema = makeSchema();
