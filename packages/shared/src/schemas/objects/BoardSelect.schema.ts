import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { MemberFindManySchema as MemberFindManySchema } from '../findManyMember.schema';
import { InvitationFindManySchema as InvitationFindManySchema } from '../findManyInvitation.schema';
import { ThemeArgsObjectSchema as ThemeArgsObjectSchema } from './ThemeArgs.schema';
import { ChatroomFindManySchema as ChatroomFindManySchema } from '../findManyChatroom.schema';
import { BoardCountOutputTypeArgsObjectSchema as BoardCountOutputTypeArgsObjectSchema } from './BoardCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  logo: z.boolean().optional(),
  isOfficial: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  metadata: z.boolean().optional(),
  members: z.union([z.boolean(), z.lazy(() => MemberFindManySchema)]).optional(),
  invitations: z.union([z.boolean(), z.lazy(() => InvitationFindManySchema)]).optional(),
  themeId: z.boolean().optional(),
  theme: z.union([z.boolean(), z.lazy(() => ThemeArgsObjectSchema)]).optional(),
  chatrooms: z.union([z.boolean(), z.lazy(() => ChatroomFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => BoardCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const BoardSelectObjectSchema: z.ZodType<Prisma.BoardSelect> = makeSchema() as unknown as z.ZodType<Prisma.BoardSelect>;
export const BoardSelectObjectZodSchema = makeSchema();
