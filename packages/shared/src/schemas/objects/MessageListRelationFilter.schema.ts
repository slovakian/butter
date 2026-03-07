import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MessageWhereInputObjectSchema as MessageWhereInputObjectSchema } from './MessageWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => MessageWhereInputObjectSchema).optional(),
  some: z.lazy(() => MessageWhereInputObjectSchema).optional(),
  none: z.lazy(() => MessageWhereInputObjectSchema).optional()
}).strict();
export const MessageListRelationFilterObjectSchema: z.ZodType<Prisma.MessageListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.MessageListRelationFilter>;
export const MessageListRelationFilterObjectZodSchema = makeSchema();
