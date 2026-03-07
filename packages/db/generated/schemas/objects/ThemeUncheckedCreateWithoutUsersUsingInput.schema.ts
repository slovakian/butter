import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { BoardUncheckedCreateNestedManyWithoutThemeInputObjectSchema as BoardUncheckedCreateNestedManyWithoutThemeInputObjectSchema } from './BoardUncheckedCreateNestedManyWithoutThemeInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  isDark: z.boolean().optional(),
  variables: z.union([JsonNullValueInputSchema, jsonSchema]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.number().int().optional().nullable(),
  boardsUsing: z.lazy(() => BoardUncheckedCreateNestedManyWithoutThemeInputObjectSchema).optional()
}).strict();
export const ThemeUncheckedCreateWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeUncheckedCreateWithoutUsersUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUncheckedCreateWithoutUsersUsingInput>;
export const ThemeUncheckedCreateWithoutUsersUsingInputObjectZodSchema = makeSchema();
