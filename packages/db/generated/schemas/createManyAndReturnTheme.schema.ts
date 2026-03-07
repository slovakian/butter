import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { ThemeSelectObjectSchema as ThemeSelectObjectSchema } from './objects/ThemeSelect.schema';
import { ThemeCreateManyInputObjectSchema as ThemeCreateManyInputObjectSchema } from './objects/ThemeCreateManyInput.schema';

export const ThemeCreateManyAndReturnSchema: z.ZodType<Prisma.ThemeCreateManyAndReturnArgs> = z.object({ select: ThemeSelectObjectSchema.optional(), data: z.union([ ThemeCreateManyInputObjectSchema, z.array(ThemeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ThemeCreateManyAndReturnArgs>;

export const ThemeCreateManyAndReturnZodSchema = z.object({ select: ThemeSelectObjectSchema.optional(), data: z.union([ ThemeCreateManyInputObjectSchema, z.array(ThemeCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();