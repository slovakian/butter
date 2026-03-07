import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ChatroomCreateManyBoardInputObjectSchema as ChatroomCreateManyBoardInputObjectSchema } from './ChatroomCreateManyBoardInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ChatroomCreateManyBoardInputObjectSchema), z.lazy(() => ChatroomCreateManyBoardInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ChatroomCreateManyBoardInputEnvelopeObjectSchema: z.ZodType<Prisma.ChatroomCreateManyBoardInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ChatroomCreateManyBoardInputEnvelope>;
export const ChatroomCreateManyBoardInputEnvelopeObjectZodSchema = makeSchema();
