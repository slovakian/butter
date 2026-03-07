import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { ThemeSelectObjectSchema as ThemeSelectObjectSchema } from './objects/ThemeSelect.schema';
import { ThemeIncludeObjectSchema as ThemeIncludeObjectSchema } from './objects/ThemeInclude.schema';
import { ThemeUpdateInputObjectSchema as ThemeUpdateInputObjectSchema } from './objects/ThemeUpdateInput.schema';
import { ThemeUncheckedUpdateInputObjectSchema as ThemeUncheckedUpdateInputObjectSchema } from './objects/ThemeUncheckedUpdateInput.schema';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './objects/ThemeWhereUniqueInput.schema';

export const ThemeUpdateOneSchema: z.ZodType<Prisma.ThemeUpdateArgs> = z.object({ select: ThemeSelectObjectSchema.optional(), include: ThemeIncludeObjectSchema.optional(), data: z.union([ThemeUpdateInputObjectSchema, ThemeUncheckedUpdateInputObjectSchema]), where: ThemeWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ThemeUpdateArgs>;

export const ThemeUpdateOneZodSchema = z.object({ select: ThemeSelectObjectSchema.optional(), include: ThemeIncludeObjectSchema.optional(), data: z.union([ThemeUpdateInputObjectSchema, ThemeUncheckedUpdateInputObjectSchema]), where: ThemeWhereUniqueInputObjectSchema }).strict();