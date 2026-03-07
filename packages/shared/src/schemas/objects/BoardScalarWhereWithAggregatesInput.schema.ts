import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema as IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema'

const boardscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => BoardScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BoardScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BoardScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BoardScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BoardScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  logo: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  isOfficial: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  metadata: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  themeId: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable()
}).strict();
export const BoardScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.BoardScalarWhereWithAggregatesInput> = boardscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.BoardScalarWhereWithAggregatesInput>;
export const BoardScalarWhereWithAggregatesInputObjectZodSchema = boardscalarwherewithaggregatesinputSchema;
