import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { ChatroomBoardIdSlugCompoundUniqueInputObjectSchema as ChatroomBoardIdSlugCompoundUniqueInputObjectSchema } from './ChatroomBoardIdSlugCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  boardId_slug: z.lazy(() => ChatroomBoardIdSlugCompoundUniqueInputObjectSchema).optional()
}).strict();
export const ChatroomWhereUniqueInputObjectSchema: z.ZodType<Prisma.ChatroomWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomWhereUniqueInput>;
export const ChatroomWhereUniqueInputObjectZodSchema = makeSchema();
