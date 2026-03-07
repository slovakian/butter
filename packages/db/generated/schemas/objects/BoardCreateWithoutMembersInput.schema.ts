import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { InvitationCreateNestedManyWithoutBoardInputObjectSchema as InvitationCreateNestedManyWithoutBoardInputObjectSchema } from './InvitationCreateNestedManyWithoutBoardInput.schema';
import { ThemeCreateNestedOneWithoutBoardsUsingInputObjectSchema as ThemeCreateNestedOneWithoutBoardsUsingInputObjectSchema } from './ThemeCreateNestedOneWithoutBoardsUsingInput.schema';
import { ChatroomCreateNestedManyWithoutBoardInputObjectSchema as ChatroomCreateNestedManyWithoutBoardInputObjectSchema } from './ChatroomCreateNestedManyWithoutBoardInput.schema'

const makeSchema = () => z.object({
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional().nullable(),
  isOfficial: z.boolean().optional(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutBoardInputObjectSchema).optional(),
  theme: z.lazy(() => ThemeCreateNestedOneWithoutBoardsUsingInputObjectSchema).optional(),
  chatrooms: z.lazy(() => ChatroomCreateNestedManyWithoutBoardInputObjectSchema).optional()
}).strict();
export const BoardCreateWithoutMembersInputObjectSchema: z.ZodType<Prisma.BoardCreateWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardCreateWithoutMembersInput>;
export const BoardCreateWithoutMembersInputObjectZodSchema = makeSchema();
