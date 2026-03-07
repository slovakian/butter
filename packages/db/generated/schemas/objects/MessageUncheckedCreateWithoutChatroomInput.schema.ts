import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  content: z.string(),
  pageNumber: z.number().int(),
  userId: z.number().int()
}).strict();
export const MessageUncheckedCreateWithoutChatroomInputObjectSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutChatroomInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageUncheckedCreateWithoutChatroomInput>;
export const MessageUncheckedCreateWithoutChatroomInputObjectZodSchema = makeSchema();
