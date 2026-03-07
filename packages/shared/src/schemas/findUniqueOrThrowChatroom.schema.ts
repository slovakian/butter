import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { ChatroomSelectObjectSchema as ChatroomSelectObjectSchema } from './objects/ChatroomSelect.schema';
import { ChatroomIncludeObjectSchema as ChatroomIncludeObjectSchema } from './objects/ChatroomInclude.schema';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './objects/ChatroomWhereUniqueInput.schema';

export const ChatroomFindUniqueOrThrowSchema: z.ZodType<Prisma.ChatroomFindUniqueOrThrowArgs> = z.object({ select: ChatroomSelectObjectSchema.optional(), include: ChatroomIncludeObjectSchema.optional(), where: ChatroomWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ChatroomFindUniqueOrThrowArgs>;

export const ChatroomFindUniqueOrThrowZodSchema = z.object({ select: ChatroomSelectObjectSchema.optional(), include: ChatroomIncludeObjectSchema.optional(), where: ChatroomWhereUniqueInputObjectSchema }).strict();