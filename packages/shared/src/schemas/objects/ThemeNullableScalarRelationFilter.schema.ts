import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { ThemeWhereInputObjectSchema as ThemeWhereInputObjectSchema } from './ThemeWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ThemeWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => ThemeWhereInputObjectSchema).optional().nullable()
}).strict();
export const ThemeNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.ThemeNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ThemeNullableScalarRelationFilter>;
export const ThemeNullableScalarRelationFilterObjectZodSchema = makeSchema();
