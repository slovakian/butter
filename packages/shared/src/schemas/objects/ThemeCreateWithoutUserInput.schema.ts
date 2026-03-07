import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { UserCreateNestedManyWithoutThemesUsingInputObjectSchema as UserCreateNestedManyWithoutThemesUsingInputObjectSchema } from './UserCreateNestedManyWithoutThemesUsingInput.schema';
import { BoardCreateNestedManyWithoutThemeInputObjectSchema as BoardCreateNestedManyWithoutThemeInputObjectSchema } from './BoardCreateNestedManyWithoutThemeInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  name: z.string(),
  isDark: z.boolean().optional(),
  variables: z.union([JsonNullValueInputSchema, jsonSchema]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  usersUsing: z.lazy(() => UserCreateNestedManyWithoutThemesUsingInputObjectSchema).optional(),
  boardsUsing: z.lazy(() => BoardCreateNestedManyWithoutThemeInputObjectSchema).optional()
}).strict();
export const ThemeCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ThemeCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateWithoutUserInput>;
export const ThemeCreateWithoutUserInputObjectZodSchema = makeSchema();
