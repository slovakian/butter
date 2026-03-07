import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { ChatroomSelectObjectSchema as ChatroomSelectObjectSchema } from './objects/ChatroomSelect.schema';
import { ChatroomIncludeObjectSchema as ChatroomIncludeObjectSchema } from './objects/ChatroomInclude.schema';
import { ChatroomUpdateInputObjectSchema as ChatroomUpdateInputObjectSchema } from './objects/ChatroomUpdateInput.schema';
import { ChatroomUncheckedUpdateInputObjectSchema as ChatroomUncheckedUpdateInputObjectSchema } from './objects/ChatroomUncheckedUpdateInput.schema';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './objects/ChatroomWhereUniqueInput.schema';

export const ChatroomUpdateOneSchema: z.ZodType<Prisma.ChatroomUpdateArgs> = z.object({ select: ChatroomSelectObjectSchema.optional(), include: ChatroomIncludeObjectSchema.optional(), data: z.union([ChatroomUpdateInputObjectSchema, ChatroomUncheckedUpdateInputObjectSchema]), where: ChatroomWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ChatroomUpdateArgs>;

export const ChatroomUpdateOneZodSchema = z.object({ select: ChatroomSelectObjectSchema.optional(), include: ChatroomIncludeObjectSchema.optional(), data: z.union([ChatroomUpdateInputObjectSchema, ChatroomUncheckedUpdateInputObjectSchema]), where: ChatroomWhereUniqueInputObjectSchema }).strict();