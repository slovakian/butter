import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { AccountUpdateManyWithoutUserNestedInputObjectSchema } from "./AccountUpdateManyWithoutUserNestedInput.schema";
import { BoolFieldUpdateOperationsInputObjectSchema } from "./BoolFieldUpdateOperationsInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { InvitationUpdateManyWithoutUserNestedInputObjectSchema } from "./InvitationUpdateManyWithoutUserNestedInput.schema";
import { MemberUpdateManyWithoutUserNestedInputObjectSchema } from "./MemberUpdateManyWithoutUserNestedInput.schema";
import { MessageUpdateManyWithoutUserNestedInputObjectSchema } from "./MessageUpdateManyWithoutUserNestedInput.schema";
import { NullableBoolFieldUpdateOperationsInputObjectSchema } from "./NullableBoolFieldUpdateOperationsInput.schema";
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from "./NullableDateTimeFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { ThemeUpdateManyWithoutUserNestedInputObjectSchema } from "./ThemeUpdateManyWithoutUserNestedInput.schema";
import { ThemeUpdateManyWithoutUsersUsingNestedInputObjectSchema } from "./ThemeUpdateManyWithoutUsersUsingNestedInput.schema";

const makeSchema = () =>
	z
		.object({
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
			accounts: z
				.lazy(() => AccountUpdateManyWithoutUserNestedInputObjectSchema)
				.optional(),
			members: z
				.lazy(() => MemberUpdateManyWithoutUserNestedInputObjectSchema)
				.optional(),
			invitations: z
				.lazy(() => InvitationUpdateManyWithoutUserNestedInputObjectSchema)
				.optional(),
			themes: z
				.lazy(() => ThemeUpdateManyWithoutUserNestedInputObjectSchema)
				.optional(),
			themesUsing: z
				.lazy(() => ThemeUpdateManyWithoutUsersUsingNestedInputObjectSchema)
				.optional(),
			messages: z
				.lazy(() => MessageUpdateManyWithoutUserNestedInputObjectSchema)
				.optional(),
		})
		.strict();
export const UserUpdateWithoutSessionsInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.UserUpdateWithoutSessionsInput>;
export const UserUpdateWithoutSessionsInputObjectZodSchema = makeSchema();
