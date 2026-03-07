import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoolFieldUpdateOperationsInputObjectSchema } from "./BoolFieldUpdateOperationsInput.schema";
import { ChatroomUncheckedUpdateManyWithoutBoardNestedInputObjectSchema } from "./ChatroomUncheckedUpdateManyWithoutBoardNestedInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
import { InvitationUncheckedUpdateManyWithoutBoardNestedInputObjectSchema } from "./InvitationUncheckedUpdateManyWithoutBoardNestedInput.schema";
import { MemberUncheckedUpdateManyWithoutBoardNestedInputObjectSchema } from "./MemberUncheckedUpdateManyWithoutBoardNestedInput.schema";
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
			members: z
				.lazy(
					() => MemberUncheckedUpdateManyWithoutBoardNestedInputObjectSchema,
				)
				.optional(),
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
export const BoardUncheckedUpdateWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardUncheckedUpdateWithoutThemeInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUncheckedUpdateWithoutThemeInput>;
export const BoardUncheckedUpdateWithoutThemeInputObjectZodSchema =
	makeSchema();
