import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { ChatroomUpdateManyMutationInputObjectSchema as ChatroomUpdateManyMutationInputObjectSchema } from './objects/ChatroomUpdateManyMutationInput.schema';
import { ChatroomWhereInputObjectSchema as ChatroomWhereInputObjectSchema } from './objects/ChatroomWhereInput.schema';

export const ChatroomUpdateManySchema: z.ZodType<Prisma.ChatroomUpdateManyArgs> = z.object({ data: ChatroomUpdateManyMutationInputObjectSchema, where: ChatroomWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ChatroomUpdateManyArgs>;

export const ChatroomUpdateManyZodSchema = z.object({ data: ChatroomUpdateManyMutationInputObjectSchema, where: ChatroomWhereInputObjectSchema.optional() }).strict();