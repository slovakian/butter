import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  boardId: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const MemberAvgAggregateInputObjectSchema: z.ZodType<Prisma.MemberAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MemberAvgAggregateInputType>;
export const MemberAvgAggregateInputObjectZodSchema = makeSchema();
