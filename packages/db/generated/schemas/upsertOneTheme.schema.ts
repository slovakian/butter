import type { Prisma } from '../../prisma/generated/client';
import * as z from 'zod';
import { ThemeSelectObjectSchema as ThemeSelectObjectSchema } from './objects/ThemeSelect.schema';
import { ThemeIncludeObjectSchema as ThemeIncludeObjectSchema } from './objects/ThemeInclude.schema';
import { ThemeWhereUniqueInputObjectSchema as ThemeWhereUniqueInputObjectSchema } from './objects/ThemeWhereUniqueInput.schema';
import { ThemeCreateInputObjectSchema as ThemeCreateInputObjectSchema } from './objects/ThemeCreateInput.schema';
import { ThemeUncheckedCreateInputObjectSchema as ThemeUncheckedCreateInputObjectSchema } from './objects/ThemeUncheckedCreateInput.schema';
import { ThemeUpdateInputObjectSchema as ThemeUpdateInputObjectSchema } from './objects/ThemeUpdateInput.schema';
import { ThemeUncheckedUpdateInputObjectSchema as ThemeUncheckedUpdateInputObjectSchema } from './objects/ThemeUncheckedUpdateInput.schema';

export const ThemeUpsertOneSchema: z.ZodType<Prisma.ThemeUpsertArgs> = z.object({ select: ThemeSelectObjectSchema.optional(), include: ThemeIncludeObjectSchema.optional(), where: ThemeWhereUniqueInputObjectSchema, create: z.union([ ThemeCreateInputObjectSchema, ThemeUncheckedCreateInputObjectSchema ]), update: z.union([ ThemeUpdateInputObjectSchema, ThemeUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ThemeUpsertArgs>;

export const ThemeUpsertOneZodSchema = z.object({ select: ThemeSelectObjectSchema.optional(), include: ThemeIncludeObjectSchema.optional(), where: ThemeWhereUniqueInputObjectSchema, create: z.union([ ThemeCreateInputObjectSchema, ThemeUncheckedCreateInputObjectSchema ]), update: z.union([ ThemeUpdateInputObjectSchema, ThemeUncheckedUpdateInputObjectSchema ]) }).strict();