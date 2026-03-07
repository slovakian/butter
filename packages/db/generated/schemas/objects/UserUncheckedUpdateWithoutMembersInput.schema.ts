import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from "./AccountUncheckedUpdateManyWithoutUserNestedInput.schema";
import { BoolFieldUpdateOperationsInputObjectSchema } from "./BoolFieldUpdateOperationsInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
import { InvitationUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from "./InvitationUncheckedUpdateManyWithoutUserNestedInput.schema";
import { MessageUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from "./MessageUncheckedUpdateManyWithoutUserNestedInput.schema";
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from "./NullableBoolFieldUpdateOperationsInput.schema";
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from "./NullableDateTimeFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from "./SessionUncheckedUpdateManyWithoutUserNestedInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { ThemeUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from "./ThemeUncheckedUpdateManyWithoutUserNestedInput.schema";
import { ThemeUncheckedUpdateManyWithoutUsersUsingNestedInputObjectSchema } from "./ThemeUncheckedUpdateManyWithoutUsersUsingNestedInput.schema";

const makeSchema = () =>
	z
		.object({
			id: z
				.union([
					z.number().int(),
					z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			name: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			email: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			emailVerified: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			image: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
				])
				.optional()
				.nullable(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			updatedAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			role: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
				])
				.optional()
				.nullable(),
			banned: z
				.union([
					z.boolean(),
					z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema),
				])
				.optional()
				.nullable(),
			banReason: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
				])
				.optional()
				.nullable(),
			banExpires: z
				.union([
					z.coerce.date(),
					z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema),
				])
				.optional()
				.nullable(),
			isAnonymous: z
				.union([
					z.boolean(),
					z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema),
				])
				.optional()
				.nullable(),
			sessions: z
				.lazy(
					() => SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema,
				)
				.optional(),
			accounts: z
				.lazy(
					() => AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema,
				)
				.optional(),
			invitations: z
				.lazy(
					() => InvitationUncheckedUpdateManyWithoutUserNestedInputObjectSchema,
				)
				.optional(),
			themes: z
				.lazy(() => ThemeUncheckedUpdateManyWithoutUserNestedInputObjectSchema)
				.optional(),
			themesUsing: z
				.lazy(
					() =>
						ThemeUncheckedUpdateManyWithoutUsersUsingNestedInputObjectSchema,
				)
				.optional(),
			messages: z
				.lazy(
					() => MessageUncheckedUpdateManyWithoutUserNestedInputObjectSchema,
				)
				.optional(),
		})
		.strict();
export const UserUncheckedUpdateWithoutMembersInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMembersInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutMembersInput>;
export const UserUncheckedUpdateWithoutMembersInputObjectZodSchema =
	makeSchema();
