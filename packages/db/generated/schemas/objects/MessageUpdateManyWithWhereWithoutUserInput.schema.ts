import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageScalarWhereInputObjectSchema } from "./MessageScalarWhereInput.schema";
import { MessageUncheckedUpdateManyWithoutUserInputObjectSchema } from "./MessageUncheckedUpdateManyWithoutUserInput.schema";
import { MessageUpdateManyMutationInputObjectSchema } from "./MessageUpdateManyMutationInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MessageScalarWhereInputObjectSchema),
			data: z.union([
				z.lazy(() => MessageUpdateManyMutationInputObjectSchema),
				z.lazy(() => MessageUncheckedUpdateManyWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const MessageUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutUserInput>;
export const MessageUpdateManyWithWhereWithoutUserInputObjectZodSchema =
	makeSchema();
