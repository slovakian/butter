import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { ChatroomSelectObjectSchema as ChatroomSelectObjectSchema } from './objects/ChatroomSelect.schema';
import { ChatroomIncludeObjectSchema as ChatroomIncludeObjectSchema } from './objects/ChatroomInclude.schema';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './objects/ChatroomWhereUniqueInput.schema';

export const ChatroomFindUniqueSchema: z.ZodType<Prisma.ChatroomFindUniqueArgs> = z.object({ select: ChatroomSelectObjectSchema.optional(), include: ChatroomIncludeObjectSchema.optional(), where: ChatroomWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ChatroomFindUniqueArgs>;

export const ChatroomFindUniqueZodSchema = z.object({ select: ChatroomSelectObjectSchema.optional(), include: ChatroomIncludeObjectSchema.optional(), where: ChatroomWhereUniqueInputObjectSchema }).strict();