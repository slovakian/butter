import * as z from "zod";
import type { Prisma } from "../../../prisma/generated/client";
import { MessageUncheckedUpdateWithoutUserInputObjectSchema } from "./MessageUncheckedUpdateWithoutUserInput.schema";
import { MessageUpdateWithoutUserInputObjectSchema } from "./MessageUpdateWithoutUserInput.schema";
import { MessageWhereUniqueInputObjectSchema } from "./MessageWhereUniqueInput.schema";

const makeSchema = () =>
	z
		.object({
			where: z.lazy(() => MessageWhereUniqueInputObjectSchema),
			data: z.union([
				z.lazy(() => MessageUpdateWithoutUserInputObjectSchema),
				z.lazy(() => MessageUncheckedUpdateWithoutUserInputObjectSchema),
			]),
		})
		.strict();
export const MessageUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutUserInput> =
	makeSchema() as unknown as z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutUserInput>;
export const MessageUpdateWithWhereUniqueWithoutUserInputObjectZodSchema =
	makeSchema();
