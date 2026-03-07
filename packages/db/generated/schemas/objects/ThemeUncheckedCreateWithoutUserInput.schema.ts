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
  updatedAt: z.coerce.date().optional(),
  usersUsing: z.lazy(() => UserUncheckedCreateNestedManyWithoutThemesUsingInputObjectSchema).optional(),
  boardsUsing: z.lazy(() => BoardUncheckedCreateNestedManyWithoutThemeInputObjectSchema).optional()
}).strict();
export const ThemeUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ThemeUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUncheckedCreateWithoutUserInput>;
export const ThemeUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
