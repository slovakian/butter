import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  boardId: z.number().int(),
  slug: z.string()
}).strict();
export const ChatroomBoardIdSlugCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ChatroomBoardIdSlugCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomBoardIdSlugCompoundUniqueInput>;
export const ChatroomBoardIdSlugCompoundUniqueInputObjectZodSchema = makeSchema();
