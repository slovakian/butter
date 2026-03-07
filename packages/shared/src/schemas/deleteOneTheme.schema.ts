import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { ThemeSelectObjectSchema as ThemeSelectObjectSchema } from './objects/ThemeSelect.schema';
import { ThemeIncludeObjectSchema as ThemeIncludeObjectSchema } from './objects/ThemeInclude.schema';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './objects/ThemeWhereUniqueInput.schema';

export const ThemeDeleteOneSchema: z.ZodType<Prisma.ThemeDeleteArgs> = z.object({ select: ThemeSelectObjectSchema.optional(), include: ThemeIncludeObjectSchema.optional(), where: ThemeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ThemeDeleteArgs>;

export const ThemeDeleteOneZodSchema = z.object({ select: ThemeSelectObjectSchema.optional(), include: ThemeIncludeObjectSchema.optional(), where: ThemeWhereUniqueInputObjectSchema }).strict();