import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoolFieldUpdateOperationsInputObjectSchema } from "./BoolFieldUpdateOperationsInput.schema";
import { ChatroomUncheckedUpdateManyWithoutBoardNestedInputObjectSchema } from "./ChatroomUncheckedUpdateManyWithoutBoardNestedInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
import { InvitationUncheckedUpdateManyWithoutBoardNestedInputObjectSchema } from "./InvitationUncheckedUpdateManyWithoutBoardNestedInput.schema";
import { NullableIntFieldUpdateOperationsInputObjectSchema } from "./NullableIntFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";

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
			slug: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			logo: z
				.union([
					z.string(),
					z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema),
				])
				.optional()
				.nullable(),
			isOfficial: z
				.union([
					z.boolean(),
					z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			metadata: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			themeId: z
				.union([
					z.number().int(),
					z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema),
				])
				.optional()
				.nullable(),
			invitations: z
				.lazy(
					() =>
						InvitationUncheckedUpdateManyWithoutBoardNestedInputObjectSchema,
				)
				.optional(),
			chatrooms: z
				.lazy(
					() => ChatroomUncheckedUpdateManyWithoutBoardNestedInputObjectSchema,
				)
				.optional(),
		})
		.strict();
export const BoardUncheckedUpdateWithoutMembersInputObjectSchema: z.ZodType<Prisma.BoardUncheckedUpdateWithoutMembersInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUncheckedUpdateWithoutMembersInput>;
export const BoardUncheckedUpdateWithoutMembersInputObjectZodSchema =
	makeSchema();
