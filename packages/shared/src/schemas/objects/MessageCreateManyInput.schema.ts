import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  content: z.string(),
  pageNumber: z.number().int(),
  chatroomId: z.number().int(),
  userId: z.number().int()
}).strict();
export const MessageCreateManyInputObjectSchema: z.ZodType<Prisma.MessageCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageCreateManyInput>;
export const MessageCreateManyInputObjectZodSchema = makeSchema();
