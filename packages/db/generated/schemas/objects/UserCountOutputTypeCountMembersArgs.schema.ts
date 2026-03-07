import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountMembersArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountMembersArgsObjectZodSchema = makeSchema();
