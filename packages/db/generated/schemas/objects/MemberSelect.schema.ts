import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { BoardArgsObjectSchema as BoardArgsObjectSchema } from './BoardArgs.schema';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  boardId: z.boolean().optional(),
  board: z.union([z.boolean(), z.lazy(() => BoardArgsObjectSchema)]).optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const MemberSelectObjectSchema: z.ZodType<Prisma.MemberSelect> = makeSchema() as unknown as z.ZodType<Prisma.MemberSelect>;
export const MemberSelectObjectZodSchema = makeSchema();
