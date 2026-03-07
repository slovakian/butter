import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { SessionCreateNestedManyWithoutUserInputObjectSchema as SessionCreateNestedManyWithoutUserInputObjectSchema } from './SessionCreateNestedManyWithoutUserInput.schema';
import { AccountCreateNestedManyWithoutUserInputObjectSchema as AccountCreateNestedManyWithoutUserInputObjectSchema } from './AccountCreateNestedManyWithoutUserInput.schema';
import { MemberCreateNestedManyWithoutUserInputObjectSchema as MemberCreateNestedManyWithoutUserInputObjectSchema } from './MemberCreateNestedManyWithoutUserInput.schema';
import { ThemeCreateNestedManyWithoutUserInputObjectSchema as ThemeCreateNestedManyWithoutUserInputObjectSchema } from './ThemeCreateNestedManyWithoutUserInput.schema';
import { ThemeCreateNestedManyWithoutUsersUsingInputObjectSchema as ThemeCreateNestedManyWithoutUsersUsingInputObjectSchema } from './ThemeCreateNestedManyWithoutUsersUsingInput.schema';
import { MessageCreateNestedManyWithoutUserInputObjectSchema as MessageCreateNestedManyWithoutUserInputObjectSchema } from './MessageCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
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
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema).optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutUserInputObjectSchema).optional(),
  themes: z.lazy(() => ThemeCreateNestedManyWithoutUserInputObjectSchema).optional(),
  themesUsing: z.lazy(() => ThemeCreateNestedManyWithoutUsersUsingInputObjectSchema).optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutInvitationsInput>;
export const UserCreateWithoutInvitationsInputObjectZodSchema = makeSchema();
