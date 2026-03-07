import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema as NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema as SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './SessionUncheckedUpdateManyWithoutUserNestedInput.schema';
import { AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AccountUncheckedUpdateManyWithoutUserNestedInput.schema';
import { MemberUncheckedUpdateManyWithoutUserNestedInputObjectSchema as MemberUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './MemberUncheckedUpdateManyWithoutUserNestedInput.schema';
import { InvitationUncheckedUpdateManyWithoutUserNestedInputObjectSchema as InvitationUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './InvitationUncheckedUpdateManyWithoutUserNestedInput.schema';
import { ThemeUncheckedUpdateManyWithoutUserNestedInputObjectSchema as ThemeUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './ThemeUncheckedUpdateManyWithoutUserNestedInput.schema';
import { ThemeUncheckedUpdateManyWithoutUsersUsingNestedInputObjectSchema as ThemeUncheckedUpdateManyWithoutUsersUsingNestedInputObjectSchema } from './ThemeUncheckedUpdateManyWithoutUsersUsingNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  emailVerified: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  banned: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  banReason: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  banExpires: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  isAnonymous: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  themes: z.lazy(() => ThemeUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  themesUsing: z.lazy(() => ThemeUncheckedUpdateManyWithoutUsersUsingNestedInputObjectSchema).optional()
}).strict();
export const UserUncheckedUpdateWithoutMessagesInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutMessagesInput>;
export const UserUncheckedUpdateWithoutMessagesInputObjectZodSchema = makeSchema();
