import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { UserCreateNestedOneWithoutThemesInputObjectSchema as UserCreateNestedOneWithoutThemesInputObjectSchema } from './UserCreateNestedOneWithoutThemesInput.schema';
import { UserCreateNestedManyWithoutThemesUsingInputObjectSchema as UserCreateNestedManyWithoutThemesUsingInputObjectSchema } from './UserCreateNestedManyWithoutThemesUsingInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  name: z.string(),
  isDark: z.boolean().optional(),
  variables: z.union([JsonNullValueInputSchema, jsonSchema]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutThemesInputObjectSchema).optional(),
  usersUsing: z.lazy(() => UserCreateNestedManyWithoutThemesUsingInputObjectSchema).optional()
}).strict();
export const ThemeCreateWithoutBoardsUsingInputObjectSchema: z.ZodType<Prisma.ThemeCreateWithoutBoardsUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeCreateWithoutBoardsUsingInput>;
export const ThemeCreateWithoutBoardsUsingInputObjectZodSchema = makeSchema();
