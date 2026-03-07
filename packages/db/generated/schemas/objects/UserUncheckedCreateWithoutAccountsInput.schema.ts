import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema as SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutUserInput.schema';
import { MemberUncheckedCreateNestedManyWithoutUserInputObjectSchema as MemberUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './MemberUncheckedCreateNestedManyWithoutUserInput.schema';
import { InvitationUncheckedCreateNestedManyWithoutUserInputObjectSchema as InvitationUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './InvitationUncheckedCreateNestedManyWithoutUserInput.schema';
import { ThemeUncheckedCreateNestedManyWithoutUserInputObjectSchema as ThemeUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ThemeUncheckedCreateNestedManyWithoutUserInput.schema';
import { ThemeUncheckedCreateNestedManyWithoutUsersUsingInputObjectSchema as ThemeUncheckedCreateNestedManyWithoutUsersUsingInputObjectSchema } from './ThemeUncheckedCreateNestedManyWithoutUsersUsingInput.schema';
import { MessageUncheckedCreateNestedManyWithoutUserInputObjectSchema as MessageUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './MessageUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  isAnonymous: z.boolean().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  themes: z.lazy(() => ThemeUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  themesUsing: z.lazy(() => ThemeUncheckedCreateNestedManyWithoutUsersUsingInputObjectSchema).optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutAccountsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput>;
export const UserUncheckedCreateWithoutAccountsInputObjectZodSchema = makeSchema();
