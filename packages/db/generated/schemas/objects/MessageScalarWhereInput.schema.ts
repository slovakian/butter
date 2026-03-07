import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema'

const messagescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => MessageScalarWhereInputObjectSchema), z.lazy(() => MessageScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MessageScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MessageScalarWhereInputObjectSchema), z.lazy(() => MessageScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  content: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  pageNumber: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  chatroomId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const MessageScalarWhereInputObjectSchema: z.ZodType<Prisma.MessageScalarWhereInput> = messagescalarwhereinputSchema as unknown as z.ZodType<Prisma.MessageScalarWhereInput>;
export const MessageScalarWhereInputObjectZodSchema = messagescalarwhereinputSchema;
