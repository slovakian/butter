import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { ChatroomSelectObjectSchema as ChatroomSelectObjectSchema } from './objects/ChatroomSelect.schema';
import { ChatroomIncludeObjectSchema as ChatroomIncludeObjectSchema } from './objects/ChatroomInclude.schema';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './objects/ChatroomWhereUniqueInput.schema';

export const ChatroomDeleteOneSchema: z.ZodType<Prisma.ChatroomDeleteArgs> = z.object({ select: ChatroomSelectObjectSchema.optional(), include: ChatroomIncludeObjectSchema.optional(), where: ChatroomWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ChatroomDeleteArgs>;

export const ChatroomDeleteOneZodSchema = z.object({ select: ChatroomSelectObjectSchema.optional(), include: ChatroomIncludeObjectSchema.optional(), where: ChatroomWhereUniqueInputObjectSchema }).strict();