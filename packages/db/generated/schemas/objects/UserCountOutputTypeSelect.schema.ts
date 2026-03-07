import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { UserCountOutputTypeCountSessionsArgsObjectSchema as UserCountOutputTypeCountSessionsArgsObjectSchema } from './UserCountOutputTypeCountSessionsArgs.schema';
import { UserCountOutputTypeCountAccountsArgsObjectSchema as UserCountOutputTypeCountAccountsArgsObjectSchema } from './UserCountOutputTypeCountAccountsArgs.schema';
import { UserCountOutputTypeCountMembersArgsObjectSchema as UserCountOutputTypeCountMembersArgsObjectSchema } from './UserCountOutputTypeCountMembersArgs.schema';
import { UserCountOutputTypeCountInvitationsArgsObjectSchema as UserCountOutputTypeCountInvitationsArgsObjectSchema } from './UserCountOutputTypeCountInvitationsArgs.schema';
import { UserCountOutputTypeCountThemesArgsObjectSchema as UserCountOutputTypeCountThemesArgsObjectSchema } from './UserCountOutputTypeCountThemesArgs.schema';
import { UserCountOutputTypeCountThemesUsingArgsObjectSchema as UserCountOutputTypeCountThemesUsingArgsObjectSchema } from './UserCountOutputTypeCountThemesUsingArgs.schema';
import { UserCountOutputTypeCountMessagesArgsObjectSchema as UserCountOutputTypeCountMessagesArgsObjectSchema } from './UserCountOutputTypeCountMessagesArgs.schema'

const makeSchema = () => z.object({
  sessions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountSessionsArgsObjectSchema)]).optional(),
  accounts: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAccountsArgsObjectSchema)]).optional(),
  members: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountMembersArgsObjectSchema)]).optional(),
  invitations: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountInvitationsArgsObjectSchema)]).optional(),
  themes: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountThemesArgsObjectSchema)]).optional(),
  themesUsing: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountThemesUsingArgsObjectSchema)]).optional(),
  messages: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountMessagesArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
