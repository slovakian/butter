import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  slug: z.string().optional()
}).strict();
export const BoardWhereUniqueInputObjectSchema: z.ZodType<Prisma.BoardWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardWhereUniqueInput>;
export const BoardWhereUniqueInputObjectZodSchema = makeSchema();
