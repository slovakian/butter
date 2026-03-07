import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { UserUncheckedCreateNestedManyWithoutThemesUsingInputObjectSchema as UserUncheckedCreateNestedManyWithoutThemesUsingInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutThemesUsingInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  isDark: z.boolean().optional(),
  variables: z.union([JsonNullValueInputSchema, jsonSchema]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.number().int().optional().nullable(),
  usersUsing: z.lazy(() => UserUncheckedCreateNestedManyWithoutThemesUsingInputObjectSchema).optional()
}).strict();
export const ThemeUncheckedCreateWithoutBoardsUsingInputObjectSchema: z.ZodType<Prisma.ThemeUncheckedCreateWithoutBoardsUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUncheckedCreateWithoutBoardsUsingInput>;
export const ThemeUncheckedCreateWithoutBoardsUsingInputObjectZodSchema = makeSchema();
