import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { ChatroomWhereInputObjectSchema as ChatroomWhereInputObjectSchema } from './objects/ChatroomWhereInput.schema';

export const ChatroomDeleteManySchema: z.ZodType<Prisma.ChatroomDeleteManyArgs> = z.object({ where: ChatroomWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ChatroomDeleteManyArgs>;

export const ChatroomDeleteManyZodSchema = z.object({ where: ChatroomWhereInputObjectSchema.optional() }).strict();