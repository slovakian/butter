import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { ChatroomOrderByWithRelationInputObjectSchema as ChatroomOrderByWithRelationInputObjectSchema } from './objects/ChatroomOrderByWithRelationInput.schema';
import { ChatroomWhereInputObjectSchema as ChatroomWhereInputObjectSchema } from './objects/ChatroomWhereInput.schema';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './objects/ChatroomWhereUniqueInput.schema';
import { ChatroomCountAggregateInputObjectSchema as ChatroomCountAggregateInputObjectSchema } from './objects/ChatroomCountAggregateInput.schema';

export const ChatroomCountSchema: z.ZodType<Prisma.ChatroomCountArgs> = z.object({ orderBy: z.union([ChatroomOrderByWithRelationInputObjectSchema, ChatroomOrderByWithRelationInputObjectSchema.array()]).optional(), where: ChatroomWhereInputObjectSchema.optional(), cursor: ChatroomWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ChatroomCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ChatroomCountArgs>;

export const ChatroomCountZodSchema = z.object({ orderBy: z.union([ChatroomOrderByWithRelationInputObjectSchema, ChatroomOrderByWithRelationInputObjectSchema.array()]).optional(), where: ChatroomWhereInputObjectSchema.optional(), cursor: ChatroomWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ChatroomCountAggregateInputObjectSchema ]).optional() }).strict();