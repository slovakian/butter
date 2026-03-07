import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoolFieldUpdateOperationsInputObjectSchema } from "./BoolFieldUpdateOperationsInput.schema";
import { ChatroomUpdateManyWithoutBoardNestedInputObjectSchema } from "./ChatroomUpdateManyWithoutBoardNestedInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { InvitationUpdateManyWithoutBoardNestedInputObjectSchema } from "./InvitationUpdateManyWithoutBoardNestedInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { ThemeUpdateOneWithoutBoardsUsingNestedInputObjectSchema } from "./ThemeUpdateOneWithoutBoardsUsingNestedInput.schema";

const makeSchema = () =>
	z
		.object({
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
			invitations: z
				.lazy(() => InvitationUpdateManyWithoutBoardNestedInputObjectSchema)
				.optional(),
			theme: z
				.lazy(() => ThemeUpdateOneWithoutBoardsUsingNestedInputObjectSchema)
				.optional(),
			chatrooms: z
				.lazy(() => ChatroomUpdateManyWithoutBoardNestedInputObjectSchema)
				.optional(),
		})
		.strict();
export const BoardUpdateWithoutMembersInputObjectSchema: z.ZodType<Prisma.BoardUpdateWithoutMembersInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateWithoutMembersInput>;
export const BoardUpdateWithoutMembersInputObjectZodSchema = makeSchema();
