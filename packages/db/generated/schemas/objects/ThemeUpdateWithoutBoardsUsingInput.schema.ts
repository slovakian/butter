import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneWithoutThemesNestedInputObjectSchema as UserUpdateOneWithoutThemesNestedInputObjectSchema } from './UserUpdateOneWithoutThemesNestedInput.schema';
import { UserUpdateManyWithoutThemesUsingNestedInputObjectSchema as UserUpdateManyWithoutThemesUsingNestedInputObjectSchema } from './UserUpdateManyWithoutThemesUsingNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  isDark: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  variables: z.union([JsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutThemesNestedInputObjectSchema).optional(),
  usersUsing: z.lazy(() => UserUpdateManyWithoutThemesUsingNestedInputObjectSchema).optional()
}).strict();
export const ThemeUpdateWithoutBoardsUsingInputObjectSchema: z.ZodType<Prisma.ThemeUpdateWithoutBoardsUsingInput> = makeSchema() as unknown as z.ZodType<Prisma.ThemeUpdateWithoutBoardsUsingInput>;
export const ThemeUpdateWithoutBoardsUsingInputObjectZodSchema = makeSchema();
