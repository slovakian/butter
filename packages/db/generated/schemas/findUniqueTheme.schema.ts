import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { ThemeSelectObjectSchema as ThemeSelectObjectSchema } from './objects/ThemeSelect.schema';
import { ThemeIncludeObjectSchema as ThemeIncludeObjectSchema } from './objects/ThemeInclude.schema';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './objects/ThemeWhereUniqueInput.schema';

export const ThemeFindUniqueSchema: z.ZodType<Prisma.ThemeFindUniqueArgs> = z.object({ select: ThemeSelectObjectSchema.optional(), include: ThemeIncludeObjectSchema.optional(), where: ThemeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ThemeFindUniqueArgs>;

export const ThemeFindUniqueZodSchema = z.object({ select: ThemeSelectObjectSchema.optional(), include: ThemeIncludeObjectSchema.optional(), where: ThemeWhereUniqueInputObjectSchema }).strict();