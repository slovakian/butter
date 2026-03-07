import * as z from 'zod';
import type { Prisma } from '../../../../db/prisma/generated/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema as NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { SessionUpdateManyWithoutUserNestedInputObjectSchema as SessionUpdateManyWithoutUserNestedInputObjectSchema } from './SessionUpdateManyWithoutUserNestedInput.schema';
import { AccountUpdateManyWithoutUserNestedInputObjectSchema as AccountUpdateManyWithoutUserNestedInputObjectSchema } from './AccountUpdateManyWithoutUserNestedInput.schema';
import { MemberUpdateManyWithoutUserNestedInputObjectSchema as MemberUpdateManyWithoutUserNestedInputObjectSchema } from './MemberUpdateManyWithoutUserNestedInput.schema';
import { InvitationUpdateManyWithoutUserNestedInputObjectSchema as InvitationUpdateManyWithoutUserNestedInputObjectSchema } from './InvitationUpdateManyWithoutUserNestedInput.schema';
import { ThemeUpdateManyWithoutUserNestedInputObjectSchema as ThemeUpdateManyWithoutUserNestedInputObjectSchema } from './ThemeUpdateManyWithoutUserNestedInput.schema';
import { ThemeUpdateManyWithoutUsersUsingNestedInputObjectSchema as ThemeUpdateManyWithoutUsersUsingNestedInputObjectSchema } from './ThemeUpdateManyWithoutUsersUsingNestedInput.schema'

const makeSchema = () => z.object({
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
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  themes: z.lazy(() => ThemeUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  themesUsing: z.lazy(() => ThemeUpdateManyWithoutUsersUsingNestedInputObjectSchema).optional()
}).strict();
export const UserUpdateWithoutMessagesInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutMessagesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateWithoutMessagesInput>;
export const UserUpdateWithoutMessagesInputObjectZodSchema = makeSchema();
