import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { UserCreateNestedOneWithoutThemesInputObjectSchema as UserCreateNestedOneWithoutThemesInputObjectSchema } from './UserCreateNestedOneWithoutThemesInput.schema';
import { BoardCreateNestedManyWithoutThemeInputObjectSchema as BoardCreateNestedManyWithoutThemeInputObjectSchema } from './BoardCreateNestedManyWithoutThemeInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  name: z.string(),
  isDark: z.boolean().optional(),
  variables: z.union([JsonNullValueInputSchema, jsonSchema]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutThemesInputObjectSchema).optional(),
  boardsUsing: z.lazy(() => BoardCreateNestedManyWithoutThemeInputObjectSchema).optional()
}).strict();
export const ThemeCreateWithoutUsersUsingInputObjectSchema: z.ZodType<Prisma.ThemeCreateWithoutUsersUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateWithoutUsersUsingInput>;
export const ThemeCreateWithoutUsersUsingInputObjectZodSchema = makeSchema();
