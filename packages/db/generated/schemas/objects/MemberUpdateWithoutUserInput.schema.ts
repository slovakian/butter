import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { BoardUpdateOneRequiredWithoutMembersNestedInputObjectSchema } from "./BoardUpdateOneRequiredWithoutMembersNestedInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";

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
		})
		.strict();
export const MemberUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.MemberUpdateWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MemberUpdateWithoutUserInput>;
export const MemberUpdateWithoutUserInputObjectZodSchema = makeSchema();
