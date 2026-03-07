import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { BoardArgsObjectSchema as BoardArgsObjectSchema } from './BoardArgs.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  board: z.union([z.boolean(), z.lazy(() => BoardArgsObjectSchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const InvitationIncludeObjectSchema: z.ZodType<Prisma.InvitationInclude> = makeSchema() as unknown as z.ZodType<Prisma.InvitationInclude>;
export const InvitationIncludeObjectZodSchema = makeSchema();
