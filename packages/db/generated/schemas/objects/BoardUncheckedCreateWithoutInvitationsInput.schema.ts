import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MemberUncheckedCreateNestedManyWithoutBoardInputObjectSchema as MemberUncheckedCreateNestedManyWithoutBoardInputObjectSchema } from './MemberUncheckedCreateNestedManyWithoutBoardInput.schema';
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
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutBoardInputObjectSchema).optional(),
  chatrooms: z.lazy(() => ChatroomUncheckedCreateNestedManyWithoutBoardInputObjectSchema).optional()
}).strict();
export const BoardUncheckedCreateWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.BoardUncheckedCreateWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUncheckedCreateWithoutInvitationsInput>;
export const BoardUncheckedCreateWithoutInvitationsInputObjectZodSchema = makeSchema();
