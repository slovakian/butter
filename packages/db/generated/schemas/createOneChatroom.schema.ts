import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { ChatroomSelectObjectSchema as ChatroomSelectObjectSchema } from './objects/ChatroomSelect.schema';
import { ChatroomIncludeObjectSchema as ChatroomIncludeObjectSchema } from './objects/ChatroomInclude.schema';
import { ChatroomCreateInputObjectSchema as ChatroomCreateInputObjectSchema } from './objects/ChatroomCreateInput.schema';
import { ChatroomUncheckedCreateInputObjectSchema as ChatroomUncheckedCreateInputObjectSchema } from './objects/ChatroomUncheckedCreateInput.schema';

export const ChatroomCreateOneSchema: z.ZodType<Prisma.ChatroomCreateArgs> = z.object({ select: ChatroomSelectObjectSchema.optional(), include: ChatroomIncludeObjectSchema.optional(), data: z.union([ChatroomCreateInputObjectSchema, ChatroomUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ChatroomCreateArgs>;

export const ChatroomCreateOneZodSchema = z.object({ select: ChatroomSelectObjectSchema.optional(), include: ChatroomIncludeObjectSchema.optional(), data: z.union([ChatroomCreateInputObjectSchema, ChatroomUncheckedCreateInputObjectSchema]) }).strict();