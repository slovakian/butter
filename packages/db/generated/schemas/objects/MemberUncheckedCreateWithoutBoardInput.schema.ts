import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  role: z.string().optional(),
  createdAt: z.coerce.date()
}).strict();
export const MemberUncheckedCreateWithoutBoardInputObjectSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutBoardInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedCreateWithoutBoardInput>;
export const MemberUncheckedCreateWithoutBoardInputObjectZodSchema = makeSchema();
