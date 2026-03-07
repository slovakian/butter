import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateManyWithoutThemesUsingNestedInputObjectSchema as UserUpdateManyWithoutThemesUsingNestedInputObjectSchema } from './UserUpdateManyWithoutThemesUsingNestedInput.schema';
import { BoardUpdateManyWithoutThemeNestedInputObjectSchema as BoardUpdateManyWithoutThemeNestedInputObjectSchema } from './BoardUpdateManyWithoutThemeNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  isDark: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  variables: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  usersUsing: z.lazy(() => UserUpdateManyWithoutThemesUsingNestedInputObjectSchema).optional(),
  boardsUsing: z.lazy(() => BoardUpdateManyWithoutThemeNestedInputObjectSchema).optional()
}).strict();
export const ThemeUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.ThemeUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateWithoutUserInput>;
export const ThemeUpdateWithoutUserInputObjectZodSchema = makeSchema();
