import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { ThemeSelectObjectSchema as ThemeSelectObjectSchema } from './objects/ThemeSelect.schema';
import { ThemeUpdateManyMutationInputObjectSchema as ThemeUpdateManyMutationInputObjectSchema } from './objects/ThemeUpdateManyMutationInput.schema';
import { ThemeWhereInputObjectSchema as ThemeWhereInputObjectSchema } from './objects/ThemeWhereInput.schema';

export const ThemeUpdateManyAndReturnSchema: z.ZodType<Prisma.ThemeUpdateManyAndReturnArgs> = z.object({ select: ThemeSelectObjectSchema.optional(), data: ThemeUpdateManyMutationInputObjectSchema, where: ThemeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ThemeUpdateManyAndReturnArgs>;

export const ThemeUpdateManyAndReturnZodSchema = z.object({ select: ThemeSelectObjectSchema.optional(), data: ThemeUpdateManyMutationInputObjectSchema, where: ThemeWhereInputObjectSchema.optional() }).strict();