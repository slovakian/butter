import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  slug: z.string(),
  boardId: z.number().int()
}).strict();
export const ChatroomUncheckedCreateWithoutMessagesInputObjectSchema: z.ZodType<Prisma.ChatroomUncheckedCreateWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomUncheckedCreateWithoutMessagesInput>;
export const ChatroomUncheckedCreateWithoutMessagesInputObjectZodSchema = makeSchema();
