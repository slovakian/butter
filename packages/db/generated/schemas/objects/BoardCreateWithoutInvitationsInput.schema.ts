import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MemberCreateNestedManyWithoutBoardInputObjectSchema as MemberCreateNestedManyWithoutBoardInputObjectSchema } from './MemberCreateNestedManyWithoutBoardInput.schema';
import { ThemeCreateNestedOneWithoutBoardsUsingInputObjectSchema as ThemeCreateNestedOneWithoutBoardsUsingInputObjectSchema } from './ThemeCreateNestedOneWithoutBoardsUsingInput.schema';
import { ChatroomCreateNestedManyWithoutBoardInputObjectSchema as ChatroomCreateNestedManyWithoutBoardInputObjectSchema } from './ChatroomCreateNestedManyWithoutBoardInput.schema'

const makeSchema = () => z.object({
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional().nullable(),
  isOfficial: z.boolean().optional(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutBoardInputObjectSchema).optional(),
  theme: z.lazy(() => ThemeCreateNestedOneWithoutBoardsUsingInputObjectSchema).optional(),
  chatrooms: z.lazy(() => ChatroomCreateNestedManyWithoutBoardInputObjectSchema).optional()
}).strict();
export const BoardCreateWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.BoardCreateWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardCreateWithoutInvitationsInput>;
export const BoardCreateWithoutInvitationsInputObjectZodSchema = makeSchema();
