import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';


const makeSchema = () => z.object({
  id: z.number().int().optional()
}).strict();
export const MessageWhereUniqueInputObjectSchema: z.ZodType<Prisma.MessageWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.MessageWhereUniqueInput>;
export const MessageWhereUniqueInputObjectZodSchema = makeSchema();
