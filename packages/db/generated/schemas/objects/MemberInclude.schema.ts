import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { BoardArgsObjectSchema as BoardArgsObjectSchema } from './BoardArgs.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  board: z.union([z.boolean(), z.lazy(() => BoardArgsObjectSchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const MemberIncludeObjectSchema: z.ZodType<Prisma.MemberInclude> = makeSchema() as unknown as z.ZodType<Prisma.MemberInclude>;
export const MemberIncludeObjectZodSchema = makeSchema();
