import * as z from 'zod';
import type { Prisma } from '../../../prisma/generated/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { MemberUpdateManyWithoutBoardNestedInputObjectSchema as MemberUpdateManyWithoutBoardNestedInputObjectSchema } from './MemberUpdateManyWithoutBoardNestedInput.schema';
import { InvitationUpdateManyWithoutBoardNestedInputObjectSchema as InvitationUpdateManyWithoutBoardNestedInputObjectSchema } from './InvitationUpdateManyWithoutBoardNestedInput.schema';
import { ThemeUpdateOneWithoutBoardsUsingNestedInputObjectSchema as ThemeUpdateOneWithoutBoardsUsingNestedInputObjectSchema } from './ThemeUpdateOneWithoutBoardsUsingNestedInput.schema'

const makeSchema = () => z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  logo: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  isOfficial: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  metadata: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutBoardNestedInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutBoardNestedInputObjectSchema).optional(),
  theme: z.lazy(() => ThemeUpdateOneWithoutBoardsUsingNestedInputObjectSchema).optional()
}).strict();
export const BoardUpdateWithoutChatroomsInputObjectSchema: z.ZodType<Prisma.BoardUpdateWithoutChatroomsInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateWithoutChatroomsInput>;
export const BoardUpdateWithoutChatroomsInputObjectZodSchema = makeSchema();
