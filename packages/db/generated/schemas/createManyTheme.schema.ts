import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { ThemeCreateManyInputObjectSchema as ThemeCreateManyInputObjectSchema } from './objects/ThemeCreateManyInput.schema';

export const ThemeCreateManySchema: z.ZodType<Prisma.ThemeCreateManyArgs> = z.object({ data: z.union([ ThemeCreateManyInputObjectSchema, z.array(ThemeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ThemeCreateManyArgs>;

export const ThemeCreateManyZodSchema = z.object({ data: z.union([ ThemeCreateManyInputObjectSchema, z.array(ThemeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();