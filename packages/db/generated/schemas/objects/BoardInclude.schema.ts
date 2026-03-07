import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MemberFindManySchema as MemberFindManySchema } from '../findManyMember.schema';
import { InvitationFindManySchema as InvitationFindManySchema } from '../findManyInvitation.schema';
import { ThemeArgsObjectSchema as ThemeArgsObjectSchema } from './ThemeArgs.schema';
import { ChatroomFindManySchema as ChatroomFindManySchema } from '../findManyChatroom.schema';
import { BoardCountOutputTypeArgsObjectSchema as BoardCountOutputTypeArgsObjectSchema } from './BoardCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  members: z.union([z.boolean(), z.lazy(() => MemberFindManySchema)]).optional(),
  invitations: z.union([z.boolean(), z.lazy(() => InvitationFindManySchema)]).optional(),
  theme: z.union([z.boolean(), z.lazy(() => ThemeArgsObjectSchema)]).optional(),
  chatrooms: z.union([z.boolean(), z.lazy(() => ChatroomFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => BoardCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const BoardIncludeObjectSchema: z.ZodType<Prisma.BoardInclude> = makeSchema() as unknown as z.ZodType<Prisma.BoardInclude>;
export const BoardIncludeObjectZodSchema = makeSchema();
