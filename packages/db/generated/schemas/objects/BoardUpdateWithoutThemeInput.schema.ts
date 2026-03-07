import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoolFieldUpdateOperationsInputObjectSchema } from "./BoolFieldUpdateOperationsInput.schema";
import { ChatroomUpdateManyWithoutBoardNestedInputObjectSchema } from "./ChatroomUpdateManyWithoutBoardNestedInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { InvitationUpdateManyWithoutBoardNestedInputObjectSchema } from "./InvitationUpdateManyWithoutBoardNestedInput.schema";
import { MemberUpdateManyWithoutBoardNestedInputObjectSchema } from "./MemberUpdateManyWithoutBoardNestedInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";

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
			members: z
				.lazy(() => MemberUpdateManyWithoutBoardNestedInputObjectSchema)
				.optional(),
			invitations: z
				.lazy(() => InvitationUpdateManyWithoutBoardNestedInputObjectSchema)
				.optional(),
			chatrooms: z
				.lazy(() => ChatroomUpdateManyWithoutBoardNestedInputObjectSchema)
				.optional(),
		})
		.strict();
export const BoardUpdateWithoutThemeInputObjectSchema: z.ZodType<Prisma.BoardUpdateWithoutThemeInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BoardUpdateWithoutThemeInput>;
export const BoardUpdateWithoutThemeInputObjectZodSchema = makeSchema();
