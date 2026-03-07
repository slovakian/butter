import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { ChatroomSelectObjectSchema as ChatroomSelectObjectSchema } from './objects/ChatroomSelect.schema';
import { ChatroomIncludeObjectSchema as ChatroomIncludeObjectSchema } from './objects/ChatroomInclude.schema';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './objects/ChatroomWhereUniqueInput.schema';
import { ChatroomCreateInputObjectSchema as ChatroomCreateInputObjectSchema } from './objects/ChatroomCreateInput.schema';
import { ChatroomUncheckedCreateInputObjectSchema as ChatroomUncheckedCreateInputObjectSchema } from './objects/ChatroomUncheckedCreateInput.schema';
import { ChatroomUpdateInputObjectSchema as ChatroomUpdateInputObjectSchema } from './objects/ChatroomUpdateInput.schema';
import { ChatroomUncheckedUpdateInputObjectSchema as ChatroomUncheckedUpdateInputObjectSchema } from './objects/ChatroomUncheckedUpdateInput.schema';

export const ChatroomUpsertOneSchema: z.ZodType<Prisma.ChatroomUpsertArgs> = z.object({ select: ChatroomSelectObjectSchema.optional(), include: ChatroomIncludeObjectSchema.optional(), where: ChatroomWhereUniqueInputObjectSchema, create: z.union([ ChatroomCreateInputObjectSchema, ChatroomUncheckedCreateInputObjectSchema ]), update: z.union([ ChatroomUpdateInputObjectSchema, ChatroomUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ChatroomUpsertArgs>;

export const ChatroomUpsertOneZodSchema = z.object({ select: ChatroomSelectObjectSchema.optional(), include: ChatroomIncludeObjectSchema.optional(), where: ChatroomWhereUniqueInputObjectSchema, create: z.union([ ChatroomCreateInputObjectSchema, ChatroomUncheckedCreateInputObjectSchema ]), update: z.union([ ChatroomUpdateInputObjectSchema, ChatroomUncheckedUpdateInputObjectSchema ]) }).strict();