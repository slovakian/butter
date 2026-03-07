import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema'

const boardscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => BoardScalarWhereInputObjectSchema), z.lazy(() => BoardScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BoardScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BoardScalarWhereInputObjectSchema), z.lazy(() => BoardScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  logo: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  isOfficial: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  metadata: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  themeId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable()
}).strict();
export const BoardScalarWhereInputObjectSchema: z.ZodType<Prisma.BoardScalarWhereInput> = boardscalarwhereinputSchema as unknown as z.ZodType<Prisma.BoardScalarWhereInput>;
export const BoardScalarWhereInputObjectZodSchema = boardscalarwhereinputSchema;
