import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardCountOutputTypeCountMembersArgsObjectSchema as BoardCountOutputTypeCountMembersArgsObjectSchema } from './BoardCountOutputTypeCountMembersArgs.schema';
import { BoardCountOutputTypeCountInvitationsArgsObjectSchema as BoardCountOutputTypeCountInvitationsArgsObjectSchema } from './BoardCountOutputTypeCountInvitationsArgs.schema';
import { BoardCountOutputTypeCountChatroomsArgsObjectSchema as BoardCountOutputTypeCountChatroomsArgsObjectSchema } from './BoardCountOutputTypeCountChatroomsArgs.schema'

const makeSchema = () => z.object({
  members: z.union([z.boolean(), z.lazy(() => BoardCountOutputTypeCountMembersArgsObjectSchema)]).optional(),
  invitations: z.union([z.boolean(), z.lazy(() => BoardCountOutputTypeCountInvitationsArgsObjectSchema)]).optional(),
  chatrooms: z.union([z.boolean(), z.lazy(() => BoardCountOutputTypeCountChatroomsArgsObjectSchema)]).optional()
}).strict();
export const BoardCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.BoardCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.BoardCountOutputTypeSelect>;
export const BoardCountOutputTypeSelectObjectZodSchema = makeSchema();
