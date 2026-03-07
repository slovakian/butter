import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { MemberListRelationFilterObjectSchema as MemberListRelationFilterObjectSchema } from './MemberListRelationFilter.schema';
import { InvitationListRelationFilterObjectSchema as InvitationListRelationFilterObjectSchema } from './InvitationListRelationFilter.schema';
import { ThemeNullableScalarRelationFilterObjectSchema as ThemeNullableScalarRelationFilterObjectSchema } from './ThemeNullableScalarRelationFilter.schema';
import { ThemeWhereInputObjectSchema as ThemeWhereInputObjectSchema } from './ThemeWhereInput.schema';
import { ChatroomListRelationFilterObjectSchema as ChatroomListRelationFilterObjectSchema } from './ChatroomListRelationFilter.schema'

const boardwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => BoardWhereInputObjectSchema), z.lazy(() => BoardWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BoardWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BoardWhereInputObjectSchema), z.lazy(() => BoardWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  logo: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  isOfficial: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  metadata: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  themeId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  members: z.lazy(() => MemberListRelationFilterObjectSchema).optional(),
  invitations: z.lazy(() => InvitationListRelationFilterObjectSchema).optional(),
  theme: z.union([z.lazy(() => ThemeNullableScalarRelationFilterObjectSchema), z.lazy(() => ThemeWhereInputObjectSchema)]).optional(),
  chatrooms: z.lazy(() => ChatroomListRelationFilterObjectSchema).optional()
}).strict();
export const BoardWhereInputObjectSchema: z.ZodType<Prisma.BoardWhereInput> = boardwhereinputSchema as unknown as z.ZodType<Prisma.BoardWhereInput>;
export const BoardWhereInputObjectZodSchema = boardwhereinputSchema;
