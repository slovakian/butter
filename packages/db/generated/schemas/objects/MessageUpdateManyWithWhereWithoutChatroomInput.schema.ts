import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageScalarWhereInputObjectSchema } from "./MessageScalarWhereInput.schema";
import { MessageUncheckedUpdateManyWithoutChatroomInputObjectSchema } from "./MessageUncheckedUpdateManyWithoutChatroomInput.schema";
import { MessageUpdateManyMutationInputObjectSchema } from "./MessageUpdateManyMutationInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MessageScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => MessageUpdateManyMutationInputObjectSchema),
				z.lazy(
					() => MessageUncheckedUpdateManyWithoutChatroomInputObjectSchema,
				),
			]),
		})
		.strict();
export const MessageUpdateManyWithWhereWithoutChatroomInputObjectSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutChatroomInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutChatroomInput>;
export const MessageUpdateManyWithWhereWithoutChatroomInputObjectZodSchema =
	makeSchema();
