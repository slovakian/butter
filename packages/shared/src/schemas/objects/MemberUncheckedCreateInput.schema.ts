import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  boardId: z.number().int(),
  userId: z.number().int(),
  role: z.string().optional(),
  createdAt: z.coerce.date()
}).strict();
export const MemberUncheckedCreateInputObjectSchema: z.ZodType<Prisma.MemberUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedCreateInput>;
export const MemberUncheckedCreateInputObjectZodSchema = makeSchema();
