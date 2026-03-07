import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
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
		})
		.strict();
export const ChatroomUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.ChatroomUpdateManyMutationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ChatroomUpdateManyMutationInput>;
export const ChatroomUpdateManyMutationInputObjectZodSchema = makeSchema();
