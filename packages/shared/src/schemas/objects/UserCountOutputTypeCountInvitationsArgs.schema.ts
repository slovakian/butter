import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { InvitationWhereInputObjectSchema as InvitationWhereInputObjectSchema } from './InvitationWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => InvitationWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountInvitationsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountInvitationsArgsObjectZodSchema = makeSchema();
