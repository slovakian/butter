import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { UserCreateNestedOneWithoutThemesInputObjectSchema as UserCreateNestedOneWithoutThemesInputObjectSchema } from './UserCreateNestedOneWithoutThemesInput.schema';
import { UserCreateNestedManyWithoutThemesUsingInputObjectSchema as UserCreateNestedManyWithoutThemesUsingInputObjectSchema } from './UserCreateNestedManyWithoutThemesUsingInput.schema';
import { BoardCreateNestedManyWithoutThemeInputObjectSchema as BoardCreateNestedManyWithoutThemeInputObjectSchema } from './BoardCreateNestedManyWithoutThemeInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  name: z.string(),
  isDark: z.boolean().optional(),
  variables: z.union([JsonNullValueInputSchema, jsonSchema]),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutThemesInputObjectSchema).optional(),
  usersUsing: z.lazy(() => UserCreateNestedManyWithoutThemesUsingInputObjectSchema).optional(),
  boardsUsing: z.lazy(() => BoardCreateNestedManyWithoutThemeInputObjectSchema).optional()
}).strict();
export const ThemeCreateInputObjectSchema: z.ZodType<Prisma.ThemeCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateInput>;
export const ThemeCreateInputObjectZodSchema = makeSchema();
