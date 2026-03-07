import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  slug: z.literal(true).optional(),
  boardId: z.literal(true).optional()
}).strict();
export const ChatroomMinAggregateInputObjectSchema: z.ZodType<Prisma.ChatroomMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomMinAggregateInputType>;
export const ChatroomMinAggregateInputObjectZodSchema = makeSchema();
