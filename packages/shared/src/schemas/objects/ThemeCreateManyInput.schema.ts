import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  isDark: z.boolean().optional(),
  variables: z.union([JsonNullValueInputSchema, jsonSchema]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.number().int().optional().nullable()
}).strict();
export const ThemeCreateManyInputObjectSchema: z.ZodType<Prisma.ThemeCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateManyInput>;
export const ThemeCreateManyInputObjectZodSchema = makeSchema();
