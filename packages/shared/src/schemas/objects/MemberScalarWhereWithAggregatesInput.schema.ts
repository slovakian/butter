import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const memberscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => MemberScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => MemberScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MemberScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MemberScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => MemberScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  boardId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  role: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const MemberScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.MemberScalarWhereWithAggregatesInput> = memberscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.MemberScalarWhereWithAggregatesInput>;
export const MemberScalarWhereWithAggregatesInputObjectZodSchema = memberscalarwherewithaggregatesinputSchema;
