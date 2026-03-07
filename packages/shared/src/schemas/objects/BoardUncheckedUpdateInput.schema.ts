import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { MemberUncheckedUpdateManyWithoutBoardNestedInputObjectSchema as MemberUncheckedUpdateManyWithoutBoardNestedInputObjectSchema } from './MemberUncheckedUpdateManyWithoutBoardNestedInput.schema';
import { InvitationUncheckedUpdateManyWithoutBoardNestedInputObjectSchema as InvitationUncheckedUpdateManyWithoutBoardNestedInputObjectSchema } from './InvitationUncheckedUpdateManyWithoutBoardNestedInput.schema';
import { ChatroomUncheckedUpdateManyWithoutBoardNestedInputObjectSchema as ChatroomUncheckedUpdateManyWithoutBoardNestedInputObjectSchema } from './ChatroomUncheckedUpdateManyWithoutBoardNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  slug: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  logo: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  isOfficial: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  metadata: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  themeId: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutBoardNestedInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutBoardNestedInputObjectSchema).optional(),
  chatrooms: z.lazy(() => ChatroomUncheckedUpdateManyWithoutBoardNestedInputObjectSchema).optional()
}).strict();
export const BoardUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.BoardUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.BoardUncheckedUpdateInput>;
export const BoardUncheckedUpdateInputObjectZodSchema = makeSchema();
