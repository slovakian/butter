import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const memberscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => MemberScalarWhereInputObjectSchema), z.lazy(() => MemberScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MemberScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MemberScalarWhereInputObjectSchema), z.lazy(() => MemberScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  boardId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  role: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const MemberScalarWhereInputObjectSchema: z.ZodType<Prisma.MemberScalarWhereInput> = memberscalarwhereinputSchema as unknown as z.ZodType<Prisma.MemberScalarWhereInput>;
export const MemberScalarWhereInputObjectZodSchema = memberscalarwhereinputSchema;
