import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MemberCreateNestedManyWithoutBoardInputObjectSchema as MemberCreateNestedManyWithoutBoardInputObjectSchema } from './MemberCreateNestedManyWithoutBoardInput.schema';
import { InvitationCreateNestedManyWithoutBoardInputObjectSchema as InvitationCreateNestedManyWithoutBoardInputObjectSchema } from './InvitationCreateNestedManyWithoutBoardInput.schema';
import { ChatroomCreateNestedManyWithoutBoardInputObjectSchema as ChatroomCreateNestedManyWithoutBoardInputObjectSchema } from './ChatroomCreateNestedManyWithoutBoardInput.schema'

const makeSchema = () => z.object({
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional().nullable(),
  isOfficial: z.boolean().optional(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutBoardInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutBoardInputObjectSchema).optional(),
  chatrooms: z.lazy(() => ChatroomCreateNestedManyWithoutBoardInputObjectSchema).optional()
}).strict();
export const BoardCreateWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardCreateWithoutThemeInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardCreateWithoutThemeInput>;
export const BoardCreateWithoutThemeInputObjectZodSchema = makeSchema();
