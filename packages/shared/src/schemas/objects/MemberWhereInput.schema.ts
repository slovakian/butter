import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoardScalarRelationFilterObjectSchema as BoardScalarRelationFilterObjectSchema } from './BoardScalarRelationFilter.schema';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './BoardWhereInput.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const memberwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => MemberWhereInputObjectSchema), z.lazy(() => MemberWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MemberWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MemberWhereInputObjectSchema), z.lazy(() => MemberWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  boardId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  role: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  board: z.union([z.lazy(() => BoardScalarRelationFilterObjectSchema), z.lazy(() => BoardWhereInputObjectSchema)]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const MemberWhereInputObjectSchema: z.ZodType<Prisma.MemberWhereInput> = memberwhereinputSchema as unknown as z.ZodType<Prisma.MemberWhereInput>;
export const MemberWhereInputObjectZodSchema = memberwhereinputSchema;
