import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { ThemeSelectObjectSchema as ThemeSelectObjectSchema } from './objects/ThemeSelect.schema';
import { ThemeIncludeObjectSchema as ThemeIncludeObjectSchema } from './objects/ThemeInclude.schema';
import { ThemeCreateInputObjectSchema as ThemeCreateInputObjectSchema } from './objects/ThemeCreateInput.schema';
import { ThemeUncheckedCreateInputObjectSchema as ThemeUncheckedCreateInputObjectSchema } from './objects/ThemeUncheckedCreateInput.schema';

export const ThemeCreateOneSchema: z.ZodType<Prisma.ThemeCreateArgs> = z.object({ select: ThemeSelectObjectSchema.optional(), include: ThemeIncludeObjectSchema.optional(), data: z.union([ThemeCreateInputObjectSchema, ThemeUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ThemeCreateArgs>;

export const ThemeCreateOneZodSchema = z.object({ select: ThemeSelectObjectSchema.optional(), include: ThemeIncludeObjectSchema.optional(), data: z.union([ThemeCreateInputObjectSchema, ThemeUncheckedCreateInputObjectSchema]) }).strict();