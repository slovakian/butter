import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoardScalarRelationFilterObjectSchema as BoardScalarRelationFilterObjectSchema } from './BoardScalarRelationFilter.schema';
import { BoardWhereInputObjectSchema as BoardWhereInputObjectSchema } from './BoardWhereInput.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const invitationwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => InvitationWhereInputObjectSchema), z.lazy(() => InvitationWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => InvitationWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => InvitationWhereInputObjectSchema), z.lazy(() => InvitationWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  boardId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  inviterId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  board: z.union([z.lazy(() => BoardScalarRelationFilterObjectSchema), z.lazy(() => BoardWhereInputObjectSchema)]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const InvitationWhereInputObjectSchema: z.ZodType<Prisma.InvitationWhereInput> = invitationwhereinputSchema as unknown as z.ZodType<Prisma.InvitationWhereInput>;
export const InvitationWhereInputObjectZodSchema = invitationwhereinputSchema;
