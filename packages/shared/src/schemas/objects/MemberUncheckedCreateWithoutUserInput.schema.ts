import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  boardId: z.number().int(),
  role: z.string().optional(),
  createdAt: z.coerce.date()
}).strict();
export const MemberUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberUncheckedCreateWithoutUserInput>;
export const MemberUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
