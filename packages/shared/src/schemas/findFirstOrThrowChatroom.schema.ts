import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { ChatroomIncludeObjectSchema as ChatroomIncludeObjectSchema } from './objects/ChatroomInclude.schema';
import { ChatroomOrderByWithRelationInputObjectSchema as ChatroomOrderByWithRelationInputObjectSchema } from './objects/ChatroomOrderByWithRelationInput.schema';
import { ChatroomWhereInputObjectSchema as ChatroomWhereInputObjectSchema } from './objects/ChatroomWhereInput.schema';
import { ChatroomWhereUniqueInputObjectSchema as ChatroomWhereUniqueInputObjectSchema } from './objects/ChatroomWhereUniqueInput.schema';
import { ChatroomScalarFieldEnumSchema } from './enums/ChatroomScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ChatroomFindFirstOrThrowSelectSchema: z.ZodType<Prisma.ChatroomSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    slug: z.boolean().optional(),
    boardId: z.boolean().optional(),
    board: z.boolean().optional(),
    messages: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ChatroomSelect>;

export const ChatroomFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    slug: z.boolean().optional(),
    boardId: z.boolean().optional(),
    board: z.boolean().optional(),
    messages: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const ChatroomFindFirstOrThrowSchema: z.ZodType<Prisma.ChatroomFindFirstOrThrowArgs> = z.object({ select: ChatroomFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ChatroomIncludeObjectSchema.optional()), orderBy: z.union([ChatroomOrderByWithRelationInputObjectSchema, ChatroomOrderByWithRelationInputObjectSchema.array()]).optional(), where: ChatroomWhereInputObjectSchema.optional(), cursor: ChatroomWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ChatroomScalarFieldEnumSchema, ChatroomScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ChatroomFindFirstOrThrowArgs>;

export const ChatroomFindFirstOrThrowZodSchema = z.object({ select: ChatroomFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => ChatroomIncludeObjectSchema.optional()), orderBy: z.union([ChatroomOrderByWithRelationInputObjectSchema, ChatroomOrderByWithRelationInputObjectSchema.array()]).optional(), where: ChatroomWhereInputObjectSchema.optional(), cursor: ChatroomWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ChatroomScalarFieldEnumSchema, ChatroomScalarFieldEnumSchema.array()]).optional() }).strict();