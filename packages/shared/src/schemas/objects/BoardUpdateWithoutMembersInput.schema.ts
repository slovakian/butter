import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { InvitationUpdateManyWithoutBoardNestedInputObjectSchema as InvitationUpdateManyWithoutBoardNestedInputObjectSchema } from './InvitationUpdateManyWithoutBoardNestedInput.schema';
import { ThemeUpdateOneWithoutBoardsUsingNestedInputObjectSchema as ThemeUpdateOneWithoutBoardsUsingNestedInputObjectSchema } from './ThemeUpdateOneWithoutBoardsUsingNestedInput.schema';
import { ChatroomUpdateManyWithoutBoardNestedInputObjectSchema as ChatroomUpdateManyWithoutBoardNestedInputObjectSchema } from './ChatroomUpdateManyWithoutBoardNestedInput.schema'

const makeSchema = () => z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  logo: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  isOfficial: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  metadata: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutBoardNestedInputObjectSchema).optional(),
  theme: z.lazy(() => ThemeUpdateOneWithoutBoardsUsingNestedInputObjectSchema).optional(),
  chatrooms: z.lazy(() => ChatroomUpdateManyWithoutBoardNestedInputObjectSchema).optional()
}).strict();
export const BoardUpdateWithoutMembersInputObjectSchema: z.ZodType<Prisma.BoardUpdateWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateWithoutMembersInput>;
export const BoardUpdateWithoutMembersInputObjectZodSchema = makeSchema();
