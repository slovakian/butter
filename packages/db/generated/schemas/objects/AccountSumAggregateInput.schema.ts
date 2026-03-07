import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const AccountSumAggregateInputObjectSchema: z.ZodType<Prisma.AccountSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AccountSumAggregateInputType>;
export const AccountSumAggregateInputObjectZodSchema = makeSchema();
