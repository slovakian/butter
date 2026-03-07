import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardUpdateOneRequiredWithoutMembersNestedInputObjectSchema } from "./BoardUpdateOneRequiredWithoutMembersNestedInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { UserUpdateOneRequiredWithoutMembersNestedInputObjectSchema } from "./UserUpdateOneRequiredWithoutMembersNestedInput.schema";

const makeSchema = () =>
	z
		.object({
			role: z
				.union([
					z.string(),
					z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			createdAt: z
				.union([
					z.coerce.date(),
					z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
				])
				.optional(),
			board: z
				.lazy(() => BoardUpdateOneRequiredWithoutMembersNestedInputObjectSchema)
				.optional(),
			user: z
				.lazy(() => UserUpdateOneRequiredWithoutMembersNestedInputObjectSchema)
				.optional(),
		})
		.strict();
export const MemberUpdateInputObjectSchema: z.ZodType<Prisma.MemberUpdateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateInput>;
export const MemberUpdateInputObjectZodSchema = makeSchema();
