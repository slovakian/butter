import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  id: z.number().int().optional()
}).strict();
export const MemberWhereUniqueInputObjectSchema: z.ZodType<Prisma.MemberWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberWhereUniqueInput>;
export const MemberWhereUniqueInputObjectZodSchema = makeSchema();
