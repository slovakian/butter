import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { InvitationUncheckedCreateNestedManyWithoutBoardInputObjectSchema as InvitationUncheckedCreateNestedManyWithoutBoardInputObjectSchema } from './InvitationUncheckedCreateNestedManyWithoutBoardInput.schema';
import { ChatroomUncheckedCreateNestedManyWithoutBoardInputObjectSchema as ChatroomUncheckedCreateNestedManyWithoutBoardInputObjectSchema } from './ChatroomUncheckedCreateNestedManyWithoutBoardInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional().nullable(),
  isOfficial: z.boolean().optional(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional(),
  themeId: z.number().int().optional().nullable(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutBoardInputObjectSchema).optional(),
  chatrooms: z.lazy(() => ChatroomUncheckedCreateNestedManyWithoutBoardInputObjectSchema).optional()
}).strict();
export const BoardUncheckedCreateWithoutMembersInputObjectSchema: z.ZodType<Prisma.BoardUncheckedCreateWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUncheckedCreateWithoutMembersInput>;
export const BoardUncheckedCreateWithoutMembersInputObjectZodSchema = makeSchema();
