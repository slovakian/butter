import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUncheckedUpdateManyWithoutThemesUsingNestedInputObjectSchema as UserUncheckedUpdateManyWithoutThemesUsingNestedInputObjectSchema } from './UserUncheckedUpdateManyWithoutThemesUsingNestedInput.schema';
import { BoardUncheckedUpdateManyWithoutThemeNestedInputObjectSchema as BoardUncheckedUpdateManyWithoutThemeNestedInputObjectSchema } from './BoardUncheckedUpdateManyWithoutThemeNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  isDark: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  variables: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  usersUsing: z.lazy(() => UserUncheckedUpdateManyWithoutThemesUsingNestedInputObjectSchema).optional(),
  boardsUsing: z.lazy(() => BoardUncheckedUpdateManyWithoutThemeNestedInputObjectSchema).optional()
}).strict();
export const ThemeUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.ThemeUncheckedUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUncheckedUpdateWithoutUserInput>;
export const ThemeUncheckedUpdateWithoutUserInputObjectZodSchema = makeSchema();
