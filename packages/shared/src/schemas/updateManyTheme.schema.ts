import type { Prisma } from '../../../db/prisma/generated/client';
import * as z from 'zod';
import { ThemeUpdateManyMutationInputObjectSchema as ThemeUpdateManyMutationInputObjectSchema } from './objects/ThemeUpdateManyMutationInput.schema';
import { ThemeWhereInputObjectSchema as ThemeWhereInputObjectSchema } from './objects/ThemeWhereInput.schema';

export const ThemeUpdateManySchema: z.ZodType<Prisma.ThemeUpdateManyArgs> = z.object({ data: ThemeUpdateManyMutationInputObjectSchema, where: ThemeWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ThemeUpdateManyArgs>;

export const ThemeUpdateManyZodSchema = z.object({ data: ThemeUpdateManyMutationInputObjectSchema, where: ThemeWhereInputObjectSchema.optional() }).strict();