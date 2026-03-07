import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { UserUncheckedCreateNestedManyWithoutThemesUsingInputObjectSchema as UserUncheckedCreateNestedManyWithoutThemesUsingInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutThemesUsingInput.schema';
import { BoardUncheckedCreateNestedManyWithoutThemeInputObjectSchema as BoardUncheckedCreateNestedManyWithoutThemeInputObjectSchema } from './BoardUncheckedCreateNestedManyWithoutThemeInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  isDark: z.boolean().optional(),
  variables: z.union([JsonNullValueInputSchema, jsonSchema]),
  createdAt: z.coerce.date().optional(),
  userId: z.number().int().optional().nullable(),
  usersUsing: z.lazy(() => UserUncheckedCreateNestedManyWithoutThemesUsingInputObjectSchema).optional(),
  boardsUsing: z.lazy(() => BoardUncheckedCreateNestedManyWithoutThemeInputObjectSchema).optional()
}).strict();
export const ThemeUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ThemeUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUncheckedCreateInput>;
export const ThemeUncheckedCreateInputObjectZodSchema = makeSchema();
